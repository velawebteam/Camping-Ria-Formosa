import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  User,
  Baby,
  Home,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  Zap,
  Waves,
  Clock,
  Mail,
  Phone,
  Sparkles,
  Dog,
  RefreshCw,
  MapPin,
} from 'lucide-react';
import type {
  AccommodationType,
  AvailabilityCategorySummary,
  AvailabilityResponse,
  Booking,
} from '../types/booking.ts';
import { checkAvailability, createBooking, subscribeSync } from '../lib/api.ts';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

type Step = 'select' | 'details' | 'summary' | 'success';

function getDefaultDates() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkout = new Date(tomorrow);
  checkout.setDate(checkout.getDate() + 3);
  return {
    checkIn: tomorrow.toISOString().slice(0, 10),
    checkOut: checkout.toISOString().slice(0, 10),
  };
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const defaults = getDefaultDates();

  const initialTypeParam = searchParams.get('tipo');
  const initialClassParam = searchParams.get('classe');

  const [step, setStep] = useState<Step>('select');

  // Search / Date Criteria
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || defaults.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || defaults.checkOut);
  const [adults, setAdults] = useState(
    Math.max(1, parseInt(searchParams.get('adults') || '2', 10) || 2)
  );
  const [children, setChildren] = useState(
    Math.max(0, parseInt(searchParams.get('children') || '0', 10) || 0)
  );
  const [pets, setPets] = useState(0);
  const [electricity, setElectricity] = useState(true);

  // Selected accommodation & subtype
  const [selectedTab, setSelectedTab] = useState<'alveolos' | 'bungalows' | 'outros'>(
    initialTypeParam === 'bungalows'
      ? 'bungalows'
      : initialTypeParam === 'mobile-homes' || initialTypeParam === 'kampaoh'
        ? 'outros'
        : 'alveolos'
  );
  const [selectedType, setSelectedType] = useState<AccommodationType>(
    initialTypeParam === 'bungalows' ? 'bungalows' : 'alveolos'
  );
  const [selectedSubtypeKey, setSelectedSubtypeKey] = useState<string>(
    initialTypeParam === 'bungalows'
      ? initialClassParam === 'B'
        ? 'B'
        : 'A'
      : 'grande'
  );
  const [preferredResourceId, setPreferredResourceId] = useState<string>('');

  // Live availability state from server
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [availError, setAvailError] = useState('');

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nif, setNif] = useState('');
  const [notes, setNotes] = useState('');

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const tipo = searchParams.get('tipo');
    const classe = searchParams.get('classe');
    const qIn = searchParams.get('checkIn');
    const qOut = searchParams.get('checkOut');
    const qAdults = searchParams.get('adults');
    const qChildren = searchParams.get('children');

    if (qIn) setCheckIn(qIn);
    if (qOut) setCheckOut(qOut);
    if (qAdults) setAdults(Math.max(1, parseInt(qAdults, 10) || 2));
    if (qChildren) setChildren(Math.max(0, parseInt(qChildren, 10) || 0));

    if (tipo === 'bungalows') {
      setSelectedTab('bungalows');
      setSelectedType('bungalows');
      setSelectedSubtypeKey(classe === 'B' ? 'B' : 'A');
      setPreferredResourceId('');
    } else if (tipo === 'alveolos') {
      setSelectedTab('alveolos');
      setSelectedType('alveolos');
      setSelectedSubtypeKey('grande');
      setPreferredResourceId('');
    } else if (tipo === 'mobile-homes' || tipo === 'kampaoh') {
      setSelectedTab('outros');
    }
  }, [searchParams]);

  const loadAvailability = useCallback(async () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setAvailability(null);
      setAvailError('A data de saída deve ser posterior à data de entrada.');
      return;
    }

    setLoadingAvail(true);
    setAvailError('');
    try {
      const data = await checkAvailability({
        checkIn,
        checkOut,
        adults,
        children,
        pets,
        electricity,
      });
      setAvailability(data);
    } catch (err) {
      setAvailError(err instanceof Error ? err.message : 'Erro ao verificar disponibilidade.');
    } finally {
      setLoadingAvail(false);
    }
  }, [checkIn, checkOut, adults, children, pets, electricity]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  // Real-time sync when backoffice or another tab updates bookings/resources
  useEffect(() => {
    return subscribeSync(() => {
      loadAvailability();
    });
  }, [loadAvailability]);

  // Currently selected category summary
  const selectedCategory: AvailabilityCategorySummary | null = (() => {
    if (!availability) return null;
    if (selectedType === 'alveolos') {
      if (selectedSubtypeKey === 'pequeno') return availability.alveolos.pequeno;
      if (selectedSubtypeKey === 'xl') return availability.alveolos.xl;
      return availability.alveolos.grande;
    }
    return selectedSubtypeKey === 'B'
      ? availability.bungalows.classeB
      : availability.bungalows.classeA;
  })();

  // Clear preferred resource if no longer in availableIds
  useEffect(() => {
    if (
      preferredResourceId &&
      selectedCategory &&
      !selectedCategory.availableIds.includes(preferredResourceId)
    ) {
      setPreferredResourceId('');
    }
  }, [preferredResourceId, selectedCategory]);

  const handleSelectOption = (type: AccommodationType, subtypeKey: string) => {
    setSelectedType(type);
    setSelectedSubtypeKey(subtypeKey);
    setPreferredResourceId('');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { booking } = await createBooking({
        guestName,
        email,
        phone,
        nif: nif || undefined,
        notes: notes || undefined,
        type: selectedType,
        subtypeKey: selectedSubtypeKey,
        preferredResourceId: preferredResourceId || undefined,
        checkIn,
        checkOut,
        adults,
        children,
        pets,
        electricity: selectedType === 'bungalows' ? true : electricity,
        source: 'website',
      });
      setConfirmedBooking(booking);
      setStep('success');
      loadAvailability();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao confirmar reserva.');
      loadAvailability();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success' && confirmedBooking) {
    return (
      <div className="min-h-screen bg-branco-quente flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[3rem] shadow-2xl text-center max-w-2xl w-full border border-gray-50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-inner">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-green-600 mb-3">
            Confirmação Imediata • Reserva Automática
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-principal mb-4">
            Reserva Confirmada!
          </h2>
          <p className="text-texto-main/60 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base font-light">
            Obrigado, <span className="font-bold text-principal">{confirmedBooking.guestName}</span>.
            A sua estadia está automaticamente confirmada e a sua unidade já está reservada no
            sistema do parque.
          </p>

          <div className="bg-branco-quente rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8 sm:mb-10 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-principal/10 pb-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-principal/40">
                  Código da Reserva
                </p>
                <p className="text-xl sm:text-2xl font-serif font-bold text-principal">
                  {confirmedBooking.id}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-principal/40">
                  Unidade Atribuída
                </p>
                <p className="text-lg sm:text-xl font-bold text-secundaria">
                  {confirmedBooking.type === 'bungalows' ? 'Bungalow' : 'Alvéolo'}{' '}
                  {confirmedBooking.resourceId} ({confirmedBooking.subtype})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-principal/40">
                  Check-in
                </p>
                <p className="text-sm font-bold text-principal">{confirmedBooking.checkIn}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-principal/40">
                  Check-out
                </p>
                <p className="text-sm font-bold text-principal">{confirmedBooking.checkOut}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-principal/40">
                  Total Estadia
                </p>
                <p className="text-lg font-serif font-bold text-principal">
                  {confirmedBooking.totalPrice.toFixed(2)}€
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/"
              className="flex-1 bg-principal text-white min-h-[48px] px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secundaria hover:text-principal transition-all duration-500 shadow-xl flex items-center justify-center"
            >
              Voltar ao Início
            </Link>
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setStep('select');
              }}
              className="flex-1 border-2 border-principal/10 text-principal min-h-[48px] px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-principal transition-all flex items-center justify-center"
            >
              Nova Reserva
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 bg-branco-quente min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Stepper & Live Summary */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-secundaria">
                Disponibilidade em Tempo Real
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-principal font-bold leading-tight">
                Reserve a sua <br className="hidden sm:inline" />
                estadia agora.
              </h1>
              <p className="text-xs sm:text-sm lg:text-xs text-texto-main/60 font-light leading-relaxed pt-1">
                Ligação direta ao sistema do parque: verifique lugares livres para as suas datas e
                confirme automaticamente sem esperar por resposta.
              </p>
            </div>

            {/* Stepper — Horizontal 3-col strip on mobile/tablet, vertical rail on desktop */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 lg:gap-0 lg:space-y-5 relative">
              <div className="hidden lg:block absolute left-[15px] top-4 bottom-4 w-0.5 bg-principal/10" />
              {[
                { id: 'select', label: 'Datas e Disponibilidade', shortLabel: 'Datas' },
                { id: 'details', label: 'Dados do Titular', shortLabel: 'Titular' },
                { id: 'summary', label: 'Confirmar e Reservar', shortLabel: 'Confirmar' },
              ].map((s, i) => {
                const stepsOrder = ['select', 'details', 'summary'];
                const isActive = step === s.id;
                const isPast = stepsOrder.indexOf(step) > i;
                return (
                  <div
                    key={s.id}
                    className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-1.5 sm:gap-2 lg:gap-5 relative z-10 bg-white lg:bg-transparent p-2.5 sm:p-3 lg:p-0 rounded-2xl lg:rounded-none border border-principal/5 lg:border-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'bg-secundaria border-secundaria text-principal lg:scale-110 shadow-lg shadow-secundaria/20'
                          : isPast
                            ? 'bg-principal border-principal text-white'
                            : 'bg-white border-gray-200 text-principal/30'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest font-black transition-colors leading-tight ${
                        isActive ? 'text-principal' : 'text-principal/35'
                      }`}
                    >
                      <span className="lg:hidden">{s.shortLabel}</span>
                      <span className="hidden lg:inline">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Live Selected Card */}
            {selectedCategory && availability && selectedTab !== 'outros' && (
              <div className="bg-principal text-white p-5 sm:p-7 lg:p-8 rounded-3xl lg:rounded-[2rem] shadow-2xl space-y-4 lg:space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-secundaria">
                    Resumo Selecionado
                  </span>
                  <span className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full">
                    {availability.nights} {availability.nights === 1 ? 'noite' : 'noites'}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold">{selectedCategory.label}</p>
                  <p className="text-xs text-white/65 mt-1">
                    {checkIn} → {checkOut} • {adults} {adults === 1 ? 'adulto' : 'adultos'}
                    {children > 0 ? `, ${children} ${children === 1 ? 'criança' : 'crianças'}` : ''}
                  </p>
                  {preferredResourceId && (
                    <p className="text-xs text-secundaria font-bold mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Unidade escolhida: {preferredResourceId}
                    </p>
                  )}
                </div>
                <div className="border-t border-white/10 pt-3 sm:pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                      Total Estimado
                    </p>
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-secundaria">
                      {selectedCategory.estimatedTotal.toFixed(2)}€
                    </p>
                  </div>
                  <p className="text-[10px] text-white/50">IVA incl.</p>
                </div>
              </div>
            )}

            <div className="hidden lg:block bg-white p-7 rounded-[2rem] shadow-lg border border-gray-100 space-y-4">
              <h4 className="text-sm font-serif text-principal font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secundaria" />
                Reserva Direta Camping Ria Formosa
              </h4>
              <ul className="space-y-3">
                {[
                  { icon: <Sparkles className="w-4 h-4" />, text: 'Confirmação automática instantânea' },
                  { icon: <Clock className="w-4 h-4" />, text: 'Disponibilidade sincronizada com a receção' },
                  { icon: <Waves className="w-4 h-4" />, text: 'Acesso incluído a piscinas e Wi-Fi' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-texto-main/60">
                    <span className="text-secundaria">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Booking Wizard */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
              <form onSubmit={handleConfirmBooking} className="p-5 sm:p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {step === 'select' && (
                    <motion.div key="select" {...fadeInUp} className="space-y-8 sm:space-y-10">
                      {/* Date & Guest Bar */}
                      <div className="bg-branco-quente/70 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 space-y-5 sm:space-y-6">
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="text-base sm:text-lg font-serif font-bold text-principal">
                            1. Escolha as Datas e Hóspedes
                          </h2>
                          <button
                            type="button"
                            onClick={loadAvailability}
                            className="text-[10px] font-black uppercase tracking-widest text-principal/60 hover:text-principal flex items-center gap-1.5 min-h-[44px] px-2 cursor-pointer"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${loadingAvail ? 'animate-spin' : ''}`} />
                            Atualizar
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                          <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 ml-1 block mb-1.5">
                              Check-in
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria pointer-events-none" />
                              <input
                                type="date"
                                value={checkIn}
                                min={new Date().toISOString().slice(0, 10)}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full min-h-[46px] bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-base md:text-xs font-bold text-principal focus:outline-none focus:border-secundaria"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 ml-1 block mb-1.5">
                              Check-out
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria pointer-events-none" />
                              <input
                                type="date"
                                value={checkOut}
                                min={checkIn}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full min-h-[46px] bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-base md:text-xs font-bold text-principal focus:outline-none focus:border-secundaria"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 ml-1 block mb-1.5">
                              Adultos
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria pointer-events-none" />
                              <select
                                value={adults}
                                onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                                className="w-full min-h-[46px] bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-base md:text-xs font-bold text-principal focus:outline-none focus:border-secundaria cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                  <option key={n} value={n}>
                                    {n} {n === 1 ? 'Adulto' : 'Adultos'}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 ml-1 block mb-1.5">
                              Crianças
                            </label>
                            <div className="relative">
                              <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria pointer-events-none" />
                              <select
                                value={children}
                                onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                                className="w-full min-h-[46px] bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-base md:text-xs font-bold text-principal focus:outline-none focus:border-secundaria cursor-pointer"
                              >
                                {[0, 1, 2, 3, 4, 5].map((n) => (
                                  <option key={n} value={n}>
                                    {n} {n === 1 ? 'Criança' : 'Crianças'}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Extras */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 pt-2 border-t border-gray-200/60">
                          <label className="flex items-center gap-2.5 text-xs font-medium text-principal cursor-pointer min-h-[44px]">
                            <input
                              type="checkbox"
                              checked={electricity}
                              onChange={(e) => setElectricity(e.target.checked)}
                              className="w-4 h-4 accent-principal rounded shrink-0"
                            />
                            <Zap className="w-3.5 h-3.5 text-secundaria shrink-0" />
                            <span>Eletricidade 16A (Alvéolos +5,50€/noite)</span>
                          </label>

                          <div className="flex items-center gap-2 text-xs font-medium text-principal min-h-[44px]">
                            <Dog className="w-3.5 h-3.5 text-secundaria shrink-0" />
                            <span>Animais:</span>
                            <select
                              value={pets}
                              onChange={(e) => setPets(parseInt(e.target.value, 10))}
                              className="min-h-[40px] bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-base md:text-xs font-bold"
                            >
                              <option value={0}>0</option>
                              <option value={1}>1 (+4€/noite)</option>
                              <option value={2}>2 (+8€/noite)</option>
                            </select>
                          </div>
                        </div>

                        {availError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {availError}
                          </div>
                        )}
                      </div>

                      {/* Category Tabs */}
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4">
                          <h2 className="text-base sm:text-lg font-serif font-bold text-principal">
                            2. Disponibilidade em Tempo Real
                          </h2>
                          <div className="flex flex-wrap sm:inline-flex w-full sm:w-auto gap-1.5 bg-branco-quente p-1.5 rounded-2xl border border-gray-100">
                            {[
                              {
                                id: 'alveolos',
                                label: 'Alvéolos',
                                count: availability?.alveolos.totalAvailable,
                              },
                              {
                                id: 'bungalows',
                                label: 'Bungalows',
                                count: availability?.bungalows.totalAvailable,
                              },
                              { id: 'outros', label: 'Mobile Homes & Kampaoh', count: null },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                  setSelectedTab(tab.id as 'alveolos' | 'bungalows' | 'outros');
                                  if (tab.id === 'alveolos') {
                                    handleSelectOption('alveolos', 'grande');
                                  } else if (tab.id === 'bungalows') {
                                    handleSelectOption('bungalows', 'A');
                                  }
                                }}
                                className={`flex-1 sm:flex-initial justify-center min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                                  selectedTab === tab.id
                                    ? 'bg-principal text-white shadow'
                                    : 'text-principal/60 hover:text-principal'
                                }`}
                              >
                                <span className="truncate">{tab.label}</span>
                                {tab.count !== null && tab.count !== undefined && (
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[9px] shrink-0 ${
                                      selectedTab === tab.id
                                        ? 'bg-secundaria text-principal'
                                        : 'bg-gray-200 text-principal/60'
                                    }`}
                                  >
                                    {tab.count}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {loadingAvail && !availability ? (
                          <div className="py-16 text-center text-principal/40 text-sm">
                            A verificar disponibilidade em tempo real...
                          </div>
                        ) : selectedTab === 'outros' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-3xl border border-amber-200 bg-amber-50/50 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-serif text-xl font-bold text-principal">
                                  Mobile Homes
                                </h3>
                                <span className="text-[9px] font-black uppercase tracking-widest bg-amber-200/60 text-amber-900 px-3 py-1 rounded-full">
                                  Não Reservável
                                </span>
                              </div>
                              <p className="text-xs text-texto-main/70 leading-relaxed">
                                As Mobile Homes não estão disponíveis para aluguer turístico. O parque
                                disponibiliza apenas lotes anuais de 100m² a 250m² para instalação de
                                unidade própria (atualmente sem lotes disponíveis).
                              </p>
                              <Link
                                to="/alojamentos/mobile-homes"
                                className="inline-flex items-center gap-2 text-xs font-bold text-principal underline"
                              >
                                Ver mais informações
                              </Link>
                            </div>

                            <div className="p-8 rounded-3xl border border-blue-200 bg-blue-50/50 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-serif text-xl font-bold text-principal">
                                  Kampaoh
                                </h3>
                                <span className="text-[9px] font-black uppercase tracking-widest bg-blue-200/60 text-blue-900 px-3 py-1 rounded-full">
                                  Empresa Externa
                                </span>
                              </div>
                              <p className="text-xs text-texto-main/70 leading-relaxed">
                                As tendas Kampaoh são operadas por uma entidade parceira externa. Todas
                                as reservas e verificação de disponibilidade são efetuadas diretamente no
                                portal oficial da Kampaoh.
                              </p>
                              <a
                                href="https://booking.kampaoh.com/property/141?lang=pt&checkin=2026-11-17&checkout=2026-11-19&adults=2&children=0&babies=0&fpa=none"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
                              >
                                Reservar na Kampaoh <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        ) : availability ? (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                              {(selectedTab === 'alveolos'
                                ? [
                                    availability.alveolos.pequeno,
                                    availability.alveolos.grande,
                                    availability.alveolos.xl,
                                  ]
                                : [availability.bungalows.classeA, availability.bungalows.classeB]
                              ).map((cat) => {
                                const isSelected =
                                  selectedType === selectedTab && selectedSubtypeKey === cat.key;
                                return (
                                  <button
                                    key={cat.key}
                                    type="button"
                                    disabled={!cat.eligible}
                                    onClick={() => handleSelectOption(selectedTab, cat.key)}
                                    className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                                      isSelected
                                        ? 'border-secundaria bg-secundaria/5 shadow-lg'
                                        : cat.eligible
                                          ? 'border-gray-100 hover:border-gray-300 bg-white'
                                          : 'border-gray-100 bg-gray-50/70 opacity-60 cursor-not-allowed'
                                    }`}
                                  >
                                    <div className="space-y-2 flex-grow">
                                      <div className="flex flex-wrap items-center gap-3">
                                        <span className="font-serif text-xl font-bold text-principal">
                                          {cat.label}
                                        </span>
                                        {cat.eligible ? (
                                          <span className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700">
                                            {cat.availableUnits}{' '}
                                            {cat.availableUnits === 1 ? 'livre' : 'livres'}
                                          </span>
                                        ) : (
                                          <span className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-100 text-red-700">
                                            {cat.ineligibleReason || 'Indisponível'}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-texto-main/60 font-light">
                                        {cat.description} • Máx. {cat.maxGuests} hóspedes
                                      </p>
                                    </div>

                                    <div className="sm:text-right shrink-0">
                                      <p className="text-[10px] font-bold uppercase tracking-widest text-principal/40">
                                        {cat.pricePerNight.toFixed(2)}€ / noite
                                      </p>
                                      <p className="text-2xl font-serif font-bold text-principal">
                                        {cat.estimatedTotal.toFixed(2)}€
                                      </p>
                                      <p className="text-[10px] text-texto-main/40">
                                        Total ({cat.nights} {cat.nights === 1 ? 'noite' : 'noites'})
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Optional specific unit selector */}
                            {selectedCategory && selectedCategory.eligible && (
                              <div className="bg-branco-quente/60 p-4 sm:p-5 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <MapPin className="w-4 h-4 text-secundaria shrink-0" />
                                  <div>
                                    <p className="text-xs font-bold text-principal">
                                      Escolha da Unidade (Opcional)
                                    </p>
                                    <p className="text-[11px] text-texto-main/50">
                                      Pode deixar automático ou escolher o número disponível.
                                    </p>
                                  </div>
                                </div>
                                <select
                                  value={preferredResourceId}
                                  onChange={(e) => setPreferredResourceId(e.target.value)}
                                  className="w-full sm:w-auto min-h-[46px] bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-base md:text-xs font-bold text-principal focus:outline-none focus:border-secundaria"
                                >
                                  <option value="">
                                    Atribuição automática ({selectedCategory.availableIds[0]})
                                  </option>
                                  {selectedCategory.availableIds.slice(0, 40).map((unitId) => (
                                    <option key={unitId} value={unitId}>
                                      Unidade {unitId}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            <button
                              type="button"
                              disabled={!selectedCategory || !selectedCategory.eligible || !!availError}
                              onClick={() => setStep('details')}
                              className="w-full min-h-[50px] bg-principal text-white py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-secundaria hover:text-principal transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl cursor-pointer"
                            >
                              Avançar para Dados do Titular <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  )}

                  {step === 'details' && (
                    <motion.div key="details" {...fadeInUp} className="space-y-7 sm:space-y-8">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-principal mb-1">
                          Dados do Titular da Reserva
                        </h2>
                        <p className="text-xs text-texto-main/50">
                          A confirmação e o número da sua unidade serão emitidos imediatamente após
                          o passo seguinte.
                        </p>
                      </div>

                      <div className="space-y-5 sm:space-y-6">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2 block mb-2">
                            Nome Completo *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria" />
                            <input
                              required
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full min-h-[48px] bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3.5 pl-12 rounded-t-2xl focus:outline-none focus:border-secundaria transition-all text-base md:text-sm"
                              placeholder="Ex: Maria João Ferreira"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2 block mb-2">
                              Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria" />
                              <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full min-h-[48px] bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3.5 pl-12 rounded-t-2xl focus:outline-none focus:border-secundaria transition-all text-base md:text-sm"
                                placeholder="exemplo@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2 block mb-2">
                              Telefone *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secundaria" />
                              <input
                                required
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full min-h-[48px] bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3.5 pl-12 rounded-t-2xl focus:outline-none focus:border-secundaria transition-all text-base md:text-sm"
                                placeholder="+351 910 000 000"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2 block mb-2">
                              NIF (Opcional)
                            </label>
                            <input
                              type="text"
                              value={nif}
                              onChange={(e) => setNif(e.target.value)}
                              className="w-full min-h-[48px] bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3.5 rounded-t-2xl focus:outline-none focus:border-secundaria transition-all text-base md:text-sm"
                              placeholder="Contribuinte para fatura"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2 block mb-2">
                              Matrícula / Observações (Opcional)
                            </label>
                            <input
                              type="text"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full min-h-[48px] bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3.5 rounded-t-2xl focus:outline-none focus:border-secundaria transition-all text-base md:text-sm"
                              placeholder="Ex: Autocaravana 7m, chegada às 17h"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep('select')}
                          className="min-h-[48px] px-8 py-4 border-2 border-gray-200 rounded-full font-black uppercase tracking-widest text-[10px] text-principal/60 hover:border-principal hover:text-principal transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" /> Voltar
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep('summary')}
                          disabled={!guestName.trim() || !email.trim() || !phone.trim()}
                          className="flex-grow min-h-[48px] bg-principal text-white py-4 px-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-secundaria hover:text-principal transition-all disabled:opacity-30 cursor-pointer"
                        >
                          Rever e Finalizar Reserva
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 'summary' && selectedCategory && (
                    <motion.div key="summary" {...fadeInUp} className="space-y-7 sm:space-y-8">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-principal mb-1">
                          Confirmação da Reserva
                        </h2>
                        <p className="text-xs text-texto-main/50">
                          Ao confirmar, o seu lugar é reservado automaticamente na planta do parque.
                        </p>
                      </div>

                      <div className="bg-branco-quente p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6">
                        <div className="flex flex-wrap justify-between items-start gap-4 border-b border-principal/10 pb-5 sm:pb-6">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mb-1">
                              Alojamento Selecionado
                            </p>
                            <h3 className="text-xl sm:text-2xl font-serif text-principal font-bold">
                              {selectedCategory.label}
                            </h3>
                            <p className="text-xs text-texto-main/60 mt-1">
                              Unidade:{' '}
                              <span className="font-bold text-principal">
                                {preferredResourceId ||
                                  `${selectedCategory.availableIds[0]} (Atribuição automática)`}
                              </span>
                            </p>
                          </div>
                          <div className="sm:text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mb-1">
                              Duração
                            </p>
                            <p className="text-lg font-bold text-principal">
                              {selectedCategory.nights}{' '}
                              {selectedCategory.nights === 1 ? 'Noite' : 'Noites'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 border-b border-principal/10 pb-5 sm:pb-6 text-xs">
                          <div>
                            <p className="text-[9px] font-black uppercase text-principal/40 mb-1">
                              Titular
                            </p>
                            <p className="font-bold text-principal">{guestName}</p>
                            <p className="text-texto-main/60 break-all">{email}</p>
                            <p className="text-texto-main/60">{phone}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase text-principal/40 mb-1">
                              Datas
                            </p>
                            <p className="font-bold text-principal">Entrada: {checkIn}</p>
                            <p className="font-bold text-principal">Saída: {checkOut}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase text-principal/40 mb-1">
                              Hóspedes & Extras
                            </p>
                            <p className="font-bold text-principal">
                              {adults} Adultos{children > 0 ? `, ${children} Crianças` : ''}
                            </p>
                            <p className="text-texto-main/60">
                              {selectedType === 'alveolos'
                                ? electricity
                                  ? 'Com eletricidade 16A'
                                  : 'Sem eletricidade'
                                : 'AC, TV e Cozinha incl.'}
                              {pets > 0 ? ` • ${pets} animal(is)` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-principal p-5 sm:p-7 rounded-2xl text-white shadow-xl">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secundaria">
                              Valor Total (Pagamento no Check-in)
                            </p>
                            <p className="text-2xl sm:text-3xl font-serif font-bold">
                              {selectedCategory.estimatedTotal.toFixed(2)}€
                            </p>
                          </div>
                          <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-secundaria/60 shrink-0" />
                        </div>
                      </div>

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-medium flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {submitError}
                        </div>
                      )}

                      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => setStep('details')}
                          className="min-h-[48px] px-8 py-4 border-2 border-gray-200 rounded-full font-black uppercase tracking-widest text-[10px] text-principal/60 hover:border-principal hover:text-principal transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" /> Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-grow min-h-[50px] bg-secundaria text-principal py-4 px-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-principal hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl cursor-pointer"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              Confirmar e Reservar Automaticamente
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
