import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Calendar,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  Search,
  Filter,
  TrendingUp,
  Users,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Lock,
  Unlock,
  X,
  AlertCircle,
  Globe,
  Building2,
} from 'lucide-react';
import type { AccommodationType, Booking, BookingStatus, ResourceUnit } from '../types/booking.ts';
import {
  adminLogin,
  checkAvailability,
  createBooking,
  fetchAdminState,
  subscribeSync,
  updateAdminBooking,
  updateAdminResource,
} from '../lib/api.ts';
import { isDateWithinStay } from '../lib/pricing.ts';

const STATUS_LABELS: Record<BookingStatus, { label: string; badge: string }> = {
  pending: { label: 'Pendente', badge: 'bg-amber-100 text-amber-800' },
  confirmed: { label: 'Confirmada', badge: 'bg-blue-100 text-blue-800' },
  'checked-in': { label: 'Em Estadia', badge: 'bg-green-100 text-green-800' },
  'checked-out': { label: 'Concluída', badge: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Cancelada', badge: 'bg-red-100 text-red-700' },
};

export default function AdminPage() {
  const [token, setToken] = useState<string>(() => localStorage.getItem('crf_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'map' | 'bungalows'>(
    'dashboard'
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<ResourceUnit[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mapFilter, setMapFilter] = useState<'all' | 'free' | 'occupied' | 'blocked'>('all');

  // Selected resource modal/drawer
  const [selectedResource, setSelectedResource] = useState<ResourceUnit | null>(null);

  // Manual Booking Modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newType, setNewType] = useState<AccommodationType>('alveolos');
  const [newSubtypeKey, setNewSubtypeKey] = useState('grande');
  const [newCheckIn, setNewCheckIn] = useState(() => new Date().toISOString().slice(0, 10));
  const [newCheckOut, setNewCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });
  const [newAdults, setNewAdults] = useState(2);
  const [newChildren, setNewChildren] = useState(0);
  const [newPreferredUnit, setNewPreferredUnit] = useState('');
  const [newAvailIds, setNewAvailIds] = useState<string[]>([]);
  const [newBookingError, setNewBookingError] = useState('');
  const [creatingBooking, setCreatingBooking] = useState(false);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setErrorBanner('');
    try {
      const data = await fetchAdminState(token);
      setBookings(data.bookings);
      setResources(data.resources);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar dados.';
      setErrorBanner(msg);
      if (msg.includes('inválida') || msg.includes('expirada')) {
        localStorage.removeItem('crf_admin_token');
        setToken('');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time sync with public site & polling every 8 seconds
  useEffect(() => {
    if (!token) return;
    const unsub = subscribeSync(() => {
      loadData();
    });
    const onFocus = () => loadData();
    window.addEventListener('focus', onFocus);
    const interval = setInterval(loadData, 8000);
    return () => {
      unsub();
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, [token, loadData]);

  // Live availability inside Manual Booking Modal
  useEffect(() => {
    if (!showNewModal || !newCheckIn || !newCheckOut || newCheckOut <= newCheckIn) {
      setNewAvailIds([]);
      return;
    }
    checkAvailability({
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      adults: newAdults,
      children: newChildren,
    })
      .then((res) => {
        if (newType === 'alveolos') {
          if (newSubtypeKey === 'pequeno') setNewAvailIds(res.alveolos.pequeno.availableIds);
          else if (newSubtypeKey === 'xl') setNewAvailIds(res.alveolos.xl.availableIds);
          else setNewAvailIds(res.alveolos.grande.availableIds);
        } else {
          setNewAvailIds(
            newSubtypeKey === 'A' ? res.bungalows.classeA.availableIds : res.bungalows.classeB.availableIds
          );
        }
      })
      .catch(() => setNewAvailIds([]));
  }, [showNewModal, newCheckIn, newCheckOut, newAdults, newChildren, newType, newSubtypeKey]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await adminLogin(username.trim(), password);
      localStorage.setItem('crf_admin_token', res.token);
      setToken(res.token);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Erro ao autenticar.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crf_admin_token');
    setToken('');
  };

  const handleBookingStatus = async (id: string, status: BookingStatus) => {
    setErrorBanner('');
    try {
      await updateAdminBooking(token, id, { status });
      await loadData();
    } catch (err) {
      setErrorBanner(err instanceof Error ? err.message : 'Erro ao atualizar reserva.');
    }
  };

  const handleToggleBlock = async (unit: ResourceUnit) => {
    setErrorBanner('');
    try {
      const updated = await updateAdminResource(token, unit.id, {
        blocked: !unit.blocked,
        blockedReason: !unit.blocked ? 'Bloqueado no Backoffice' : undefined,
      });
      setSelectedResource(updated);
      await loadData();
    } catch (err) {
      setErrorBanner(err instanceof Error ? err.message : 'Erro ao atualizar unidade.');
    }
  };

  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingBooking(true);
    setNewBookingError('');
    try {
      await createBooking(
        {
          guestName: newGuestName,
          email: newEmail,
          phone: newPhone,
          type: newType,
          subtypeKey: newSubtypeKey,
          preferredResourceId: newPreferredUnit || undefined,
          checkIn: newCheckIn,
          checkOut: newCheckOut,
          adults: newAdults,
          children: newChildren,
          source: 'backoffice',
          status: 'confirmed',
        },
        token
      );
      setShowNewModal(false);
      setNewGuestName('');
      setNewEmail('');
      setNewPhone('');
      setNewPreferredUnit('');
      await loadData();
    } catch (err) {
      setNewBookingError(err instanceof Error ? err.message : 'Erro ao criar reserva.');
    } finally {
      setCreatingBooking(false);
    }
  };

  const getBookingForResourceOnDate = useCallback(
    (resourceId: string, date: string): Booking | undefined => {
      return bookings.find(
        (b) =>
          b.resourceId === resourceId &&
          b.status !== 'cancelled' &&
          b.status !== 'checked-out' &&
          isDateWithinStay(date, b.checkIn, b.checkOut)
      );
    },
    [bookings]
  );

  // Live stats for today
  const todayStr = new Date().toISOString().slice(0, 10);
  const stats = useMemo(() => {
    const alveolos = resources.filter((r) => r.type === 'alveolos');
    const bungalows = resources.filter((r) => r.type === 'bungalows');

    const occupiedAlveolosToday = alveolos.filter(
      (r) => r.blocked || !!getBookingForResourceOnDate(r.id, todayStr)
    ).length;
    const occupiedBungalowsToday = bungalows.filter(
      (r) => r.blocked || !!getBookingForResourceOnDate(r.id, todayStr)
    ).length;

    const freeAlveolos = alveolos.length - occupiedAlveolosToday;
    const freeBungalows = bungalows.length - occupiedBungalowsToday;
    const activeReservations = bookings.filter(
      (b) => b.status === 'confirmed' || b.status === 'checked-in' || b.status === 'pending'
    ).length;
    const revenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.totalPrice, 0);

    return {
      freeAlveolos,
      totalAlveolos: alveolos.length || 350,
      freeBungalows,
      totalBungalows: bungalows.length || 5,
      activeReservations,
      pendingCount: bookings.filter((b) => b.status === 'pending').length,
      revenue: revenue.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
    };
  }, [resources, bookings, getBookingForResourceOnDate, todayStr]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        b.guestName.toLowerCase().includes(term) ||
        b.id.toLowerCase().includes(term) ||
        b.resourceId.toLowerCase().includes(term) ||
        b.email.toLowerCase().includes(term);
      const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, filterStatus]);

  // Auth Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-branco-quente flex items-center justify-center px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-md w-full"
        >
          <div className="text-center mb-10">
            <img src="/assets/logo-camping.png" alt="Logo" className="h-16 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-principal font-bold uppercase tracking-widest">
              Área Reservada
            </h2>
            <p className="text-texto-main/40 text-[10px] uppercase font-bold tracking-widest mt-2">
              Backoffice • Camping Ria Formosa
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2">
                Utilizador
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-branco-quente/60 border-0 border-b-2 border-gray-100 p-4 rounded-t-xl focus:outline-none focus:border-secundaria transition-all"
                placeholder="camping1"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-principal/40 ml-2">
                Palavra-passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-branco-quente/60 border-0 border-b-2 border-gray-100 p-4 rounded-t-xl focus:outline-none focus:border-secundaria transition-all"
                placeholder="•••••"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-xs font-bold text-center bg-red-50 py-2.5 rounded-xl">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-principal text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secundaria hover:text-principal transition-all shadow-xl"
            >
              {loggingIn ? 'A entrar...' : 'Entrar no Backoffice'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const alveoloResources = resources.filter((r) => r.type === 'alveolos');
  const bungalowResources = resources.filter((r) => r.type === 'bungalows');

  return (
    <div className="min-h-screen bg-branco-quente flex flex-col lg:flex-row pt-16 md:pt-20 lg:pt-28">
      {/* Mobile & Tablet Top Tab Bar */}
      <div className="lg:hidden bg-principal text-white px-4 py-3 space-y-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-secundaria">
              Backoffice Conectado
            </p>
            <p className="text-sm font-serif font-bold">Gestão de Reservas</p>
          </div>
          <button
            onClick={handleLogout}
            className="min-h-[40px] px-3 rounded-xl bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>

        <nav className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'dashboard', label: 'Resumo', icon: LayoutDashboard },
            { id: 'bookings', label: `Reservas (${bookings.length})`, icon: Calendar },
            { id: 'map', label: 'Planta (350)', icon: MapIcon },
            { id: 'bungalows', label: 'Bungalows (5)', icon: Home },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`min-h-[44px] px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                activeTab === item.id
                  ? 'bg-secundaria text-principal'
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-principal text-white flex-col py-8 sticky top-28 h-[calc(100vh-7rem)] shadow-2xl shrink-0">
        <div className="px-8 mb-10">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secundaria">
            Backoffice Conectado
          </p>
          <p className="text-lg font-serif font-bold mt-1">Gestão de Reservas</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Resumo', icon: LayoutDashboard },
            { id: 'bookings', label: 'Reservas', icon: Calendar },
            { id: 'map', label: 'Planta (350 Alvéolos)', icon: MapIcon },
            { id: 'bungalows', label: 'Bungalows (5)', icon: Home },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all ${
                activeTab === item.id
                  ? 'bg-secundaria text-principal font-bold shadow-lg'
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeTab === item.id ? 'text-principal' : 'text-secundaria'}`}
              />
              <span className="text-[11px] uppercase tracking-wider font-black text-left">
                {item.label}
              </span>
              {item.id === 'bookings' && bookings.length > 0 && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === item.id ? 'bg-principal text-white' : 'bg-white/10 text-white'
                  }`}
                >
                  {bookings.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-6 pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest">
            Sincronizado com o Site
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/50 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-secundaria">
              Camping Ria Formosa • Receção
            </p>
            <h1 className="text-3xl font-serif text-principal font-bold">
              {activeTab === 'dashboard' && 'Visão Geral'}
              {activeTab === 'bookings' && 'Todas as Reservas'}
              {activeTab === 'map' && 'Planta dos 350 Alvéolos'}
              {activeTab === 'bungalows' && 'Bungalows (Classe A e B)'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 text-principal/60 hover:text-principal flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-principal text-white px-5 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-secundaria hover:text-principal transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" /> Nova Reserva
            </button>
          </div>
        </header>

        {errorBanner && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorBanner}
            </div>
            <button onClick={() => setErrorBanner('')} className="text-red-500 hover:text-red-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-green-50 text-green-600">
                      <MapIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-green-600">Hoje</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-principal">
                    {stats.freeAlveolos} / {stats.totalAlveolos}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mt-1">
                    Alvéolos Livres Hoje
                  </p>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                      <Home className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-blue-600">Hoje</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-principal">
                    {stats.freeBungalows} / {stats.totalBungalows}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mt-1">
                    Bungalows Livres Hoje
                  </p>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-amber-600">Ativas</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-principal">
                    {stats.activeReservations}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mt-1">
                    Reservas Confirmadas / Em Curso
                  </p>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-purple-600">Total</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-principal">{stats.revenue}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-principal/40 mt-1">
                    Volume de Reservas
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-principal">
                    Últimas Reservas Recebidas
                  </h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-[10px] font-black uppercase tracking-widest text-secundaria hover:underline"
                  >
                    Gerir todas →
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {bookings.slice(0, 6).map((b) => (
                    <div
                      key={b.id}
                      className="py-4 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-principal/40 w-20">{b.id}</span>
                        <div>
                          <p className="text-sm font-bold text-principal flex items-center gap-2">
                            {b.guestName}
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                b.source === 'website'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {b.source === 'website' ? (
                                <>
                                  <Globe className="w-2.5 h-2.5" /> Site (Auto)
                                </>
                              ) : (
                                <>
                                  <Building2 className="w-2.5 h-2.5" /> Receção
                                </>
                              )}
                            </span>
                          </p>
                          <p className="text-xs text-texto-main/60">
                            {b.type === 'bungalows' ? 'Bungalow' : 'Alvéolo'} {b.resourceId} (
                            {b.subtype}) • {b.checkIn} → {b.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-sm text-principal">
                          {b.totalPrice.toFixed(2)}€
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            STATUS_LABELS[b.status].badge
                          }`}
                        >
                          {STATUS_LABELS[b.status].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: RESERVAS */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex items-center gap-3 bg-branco-quente/60 px-4 py-2.5 rounded-2xl flex-grow">
                  <Search className="w-4 h-4 text-principal/40" />
                  <input
                    type="text"
                    placeholder="Pesquisar por cliente, código (CRF-...) ou unidade (A12, B1)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-0 w-full text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 bg-branco-quente/60 px-4 py-2.5 rounded-2xl">
                  <Filter className="w-4 h-4 text-principal/40" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-transparent text-xs font-bold text-principal focus:outline-none cursor-pointer"
                  >
                    <option value="all">Todos os Estados</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="checked-in">Em Estadia</option>
                    <option value="pending">Pendentes</option>
                    <option value="checked-out">Concluídas</option>
                    <option value="cancelled">Canceladas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="bg-white p-16 rounded-3xl text-center text-principal/30 font-serif text-xl">
                    Nenhuma reserva encontrada com os filtros atuais.
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-secundaria/40 transition-all"
                    >
                      <div className="space-y-3 flex-grow">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-black text-principal/30">{b.id}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              STATUS_LABELS[b.status].badge
                            }`}
                          >
                            {STATUS_LABELS[b.status].label}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              b.source === 'website'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {b.source === 'website' ? 'Reserva Automática (Site)' : 'Receção'}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-principal">
                            {b.guestName}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-texto-main/70">
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-secundaria shrink-0" />
                            <span className="font-bold text-principal">
                              {b.type === 'bungalows' ? 'Bungalow' : 'Alvéolo'} {b.resourceId}
                            </span>
                            <span className="text-texto-main/50">({b.subtype})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-secundaria shrink-0" />
                            <span>
                              {b.checkIn} → {b.checkOut}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-secundaria shrink-0" />
                            <span className="truncate">{b.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-secundaria shrink-0" />
                            <span>
                              {b.phone} •{' '}
                              <strong className="text-principal">{b.totalPrice.toFixed(2)}€</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleBookingStatus(b.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmar
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleBookingStatus(b.id, 'checked-in')}
                            className="bg-principal hover:bg-secundaria hover:text-principal text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" /> Check-in
                          </button>
                        )}
                        {b.status === 'checked-in' && (
                          <button
                            onClick={() => handleBookingStatus(b.id, 'checked-out')}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                          >
                            Check-out
                          </button>
                        )}
                        {b.status !== 'cancelled' && b.status !== 'checked-out' && (
                          <button
                            onClick={() => handleBookingStatus(b.id, 'cancelled')}
                            className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancelar
                          </button>
                        )}
                        {b.status === 'cancelled' && (
                          <button
                            onClick={() => handleBookingStatus(b.id, 'confirmed')}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                          >
                            Reativar Reserva
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: PLANTA DOS 350 ALVÉOLOS */}
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Date & Filter Bar */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 block mb-1">
                      Disponibilidade na Data:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-branco-quente border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-principal focus:outline-none focus:border-secundaria"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-4 sm:pt-0">
                    {[
                      { id: 'all', label: 'Todos (350)' },
                      { id: 'free', label: 'Livres' },
                      { id: 'occupied', label: 'Ocupados' },
                      { id: 'blocked', label: 'Bloqueados' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setMapFilter(f.id as typeof mapFilter)}
                        className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                          mapFilter === f.id
                            ? 'bg-principal text-white'
                            : 'bg-branco-quente text-principal/60 hover:text-principal'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-[10px] font-black uppercase tracking-wider text-principal/60">
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300 inline-block" />
                    Livre
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-secundaria inline-block" />
                    Ocupado
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-red-200 border border-red-400 inline-block" />
                    Bloqueado
                  </span>
                </div>
              </div>

              {/* Sectors Grid */}
              <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10">
                {[
                  {
                    sector: 'Norte',
                    title: 'Setor Norte • Alvéolos Pequenos (A1 – A120)',
                    units: alveoloResources.filter((r) => r.sector === 'Norte'),
                  },
                  {
                    sector: 'Sul',
                    title: 'Setor Sul • Pequenos & Grandes (A121 – A240)',
                    units: alveoloResources.filter((r) => r.sector === 'Sul'),
                  },
                  {
                    sector: 'Nascente',
                    title: 'Setor Nascente • Grandes & XL (A241 – A350)',
                    units: alveoloResources.filter((r) => r.sector === 'Nascente'),
                  },
                ].map((group) => (
                  <div key={group.sector} className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-principal/50 flex items-center gap-4 after:flex-grow after:h-px after:bg-gray-100">
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-7 sm:grid-cols-12 md:grid-cols-[repeat(18,minmax(0,1fr))] lg:grid-cols-[repeat(25,minmax(0,1fr))] gap-1.5">
                      {group.units.map((unit) => {
                        const booking = getBookingForResourceOnDate(unit.id, selectedDate);
                        const isOccupied = !!booking;
                        const isBlocked = unit.blocked;

                        const matchesFilter =
                          mapFilter === 'all' ||
                          (mapFilter === 'free' && !isOccupied && !isBlocked) ||
                          (mapFilter === 'occupied' && isOccupied) ||
                          (mapFilter === 'blocked' && isBlocked);

                        return (
                          <button
                            key={unit.id}
                            type="button"
                            onClick={() => setSelectedResource(unit)}
                            title={`${unit.id} (${unit.size}) — ${
                              isBlocked
                                ? 'Bloqueado'
                                : isOccupied
                                  ? `Ocupado: ${booking.guestName}`
                                  : 'Livre'
                            }`}
                            className={`aspect-square rounded-md text-[8px] font-bold flex items-center justify-center transition-all hover:scale-125 hover:z-20 ${
                              !matchesFilter ? 'opacity-15' : ''
                            } ${
                              isBlocked
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : isOccupied
                                  ? 'bg-secundaria text-principal shadow-sm ring-1 ring-principal/20'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            }`}
                          >
                            {unit.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: BUNGALOWS */}
          {activeTab === 'bungalows' && (
            <motion.div
              key="bungalows"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-principal">
                    Disponibilidade dos 5 Bungalows
                  </h2>
                  <p className="text-xs text-texto-main/60">
                    B1 e B2 (Classe A até 5 pax) • B3, B4 e B5 (Classe B até 4 pax)
                  </p>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-principal/40 block mb-1">
                    Ver Data:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-branco-quente border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-principal focus:outline-none focus:border-secundaria"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bungalowResources.map((bUnit) => {
                  const activeOnDate = getBookingForResourceOnDate(bUnit.id, selectedDate);
                  const upcomingForUnit = bookings.filter(
                    (b) => b.resourceId === bUnit.id && b.status !== 'cancelled' && b.status !== 'checked-out'
                  );

                  return (
                    <div
                      key={bUnit.id}
                      className={`bg-white p-8 rounded-3xl shadow-sm border transition-all flex flex-col justify-between gap-6 ${
                        bUnit.blocked
                          ? 'border-red-200 bg-red-50/20'
                          : activeOnDate
                            ? 'border-secundaria/50'
                            : 'border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-3xl font-serif font-bold text-principal">
                              {bUnit.id}
                            </h3>
                            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-branco-quente text-principal">
                              Classe {bUnit.bungalowClass} • Até {bUnit.capacity} pax
                            </span>
                          </div>
                          <p className="text-xs text-texto-main/50 mt-1">
                            Estado em {selectedDate}:{' '}
                            <strong
                              className={
                                bUnit.blocked
                                  ? 'text-red-600'
                                  : activeOnDate
                                    ? 'text-amber-700'
                                    : 'text-green-700'
                              }
                            >
                              {bUnit.blocked
                                ? 'Bloqueado (Manutenção)'
                                : activeOnDate
                                  ? `Ocupado (${activeOnDate.guestName})`
                                  : 'Disponível para Reserva Online'}
                            </strong>
                          </p>
                        </div>

                        <button
                          onClick={() => handleToggleBlock(bUnit)}
                          className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            bUnit.blocked
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-50 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          {bUnit.blocked ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" /> Desbloquear
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" /> Bloquear
                            </>
                          )}
                        </button>
                      </div>

                      <div className="border-t border-gray-100 pt-5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-principal/40">
                          Reservas Associadas ({upcomingForUnit.length})
                        </p>
                        {upcomingForUnit.length === 0 ? (
                          <p className="text-xs text-texto-main/40 italic py-2">
                            Sem reservas futuras atribuídas.
                          </p>
                        ) : (
                          upcomingForUnit.map((ub) => (
                            <div
                              key={ub.id}
                              className="bg-branco-quente/70 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <p className="font-bold text-principal">
                                  {ub.guestName}{' '}
                                  <span className="text-principal/40 font-normal">({ub.id})</span>
                                </p>
                                <p className="text-texto-main/60">
                                  {ub.checkIn} → {ub.checkOut} • {ub.totalPrice.toFixed(2)}€
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                                    STATUS_LABELS[ub.status].badge
                                  }`}
                                >
                                  {STATUS_LABELS[ub.status].label}
                                </span>
                                {ub.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleBookingStatus(ub.id, 'checked-in')}
                                    className="bg-principal text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase"
                                  >
                                    Check-in
                                  </button>
                                )}
                                {ub.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleBookingStatus(ub.id, 'cancelled')}
                                    className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase"
                                  >
                                    Cancelar
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RESOURCE DETAIL MODAL (when clicking any of the 350 alvéolos) */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secundaria">
                    Setor {selectedResource.sector} • Rua {selectedResource.street}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-principal">
                    {selectedResource.name} ({selectedResource.id})
                  </h3>
                  <p className="text-xs text-texto-main/60 mt-1 capitalize">
                    Tamanho: {selectedResource.size} • Lotação máx: {selectedResource.capacity} pax
                  </p>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-2 text-principal/40 hover:text-principal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {(() => {
                const booking = getBookingForResourceOnDate(selectedResource.id, selectedDate);
                return (
                  <div className="space-y-4">
                    <div className="bg-branco-quente p-5 rounded-2xl space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-principal/40">
                        Estado em {selectedDate}
                      </p>
                      {selectedResource.blocked ? (
                        <p className="text-sm font-bold text-red-700 flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Bloqueado (Indisponível no site público)
                        </p>
                      ) : booking ? (
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-principal">
                            Ocupado por {booking.guestName}
                          </p>
                          <p className="text-xs text-texto-main/60">
                            Reserva {booking.id} • {booking.checkIn} → {booking.checkOut}
                          </p>
                          <p className="text-xs text-texto-main/60">
                            {booking.email} • {booking.phone}
                          </p>
                          <div className="pt-3 flex gap-2">
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleBookingStatus(booking.id, 'checked-in')}
                                className="bg-principal text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase"
                              >
                                Fazer Check-in
                              </button>
                            )}
                            <button
                              onClick={() => handleBookingStatus(booking.id, 'cancelled')}
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-[10px] font-bold uppercase"
                            >
                              Cancelar Reserva
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-green-700 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Livre e disponível no site público
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggleBlock(selectedResource)}
                        className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                          selectedResource.blocked
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {selectedResource.blocked ? (
                          <>
                            <Unlock className="w-4 h-4" /> Desbloquear Alvéolo
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" /> Bloquear p/ Manutenção
                          </>
                        )}
                      </button>
                      {!selectedResource.blocked && !booking && (
                        <button
                          onClick={() => {
                            setNewType('alveolos');
                            setNewSubtypeKey(selectedResource.size || 'grande');
                            setNewPreferredUnit(selectedResource.id);
                            setNewCheckIn(selectedDate);
                            const next = new Date(`${selectedDate}T12:00:00`);
                            next.setDate(next.getDate() + 2);
                            setNewCheckOut(next.toISOString().slice(0, 10));
                            setSelectedResource(null);
                            setShowNewModal(true);
                          }}
                          className="flex-1 bg-principal text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secundaria hover:text-principal transition-colors"
                        >
                          Reservar Este
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW MANUAL BOOKING MODAL */}
      <AnimatePresence>
        {showNewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowNewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-principal">
                  Nova Reserva (Receção)
                </h3>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-2 text-principal/40 hover:text-principal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateManualBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Tipo
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => {
                        const t = e.target.value as AccommodationType;
                        setNewType(t);
                        setNewSubtypeKey(t === 'alveolos' ? 'grande' : 'A');
                        setNewPreferredUnit('');
                      }}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs font-bold"
                    >
                      <option value="alveolos">Alvéolo</option>
                      <option value="bungalows">Bungalow</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Categoria / Classe
                    </label>
                    <select
                      value={newSubtypeKey}
                      onChange={(e) => {
                        setNewSubtypeKey(e.target.value);
                        setNewPreferredUnit('');
                      }}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs font-bold"
                    >
                      {newType === 'alveolos' ? (
                        <>
                          <option value="pequeno">Pequeno (até 35m²)</option>
                          <option value="grande">Grande (até 90m²)</option>
                          <option value="xl">XL (+90m²)</option>
                        </>
                      ) : (
                        <>
                          <option value="A">Classe A (até 5 pax)</option>
                          <option value="B">Classe B (até 4 pax)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      required
                      value={newCheckIn}
                      onChange={(e) => setNewCheckIn(e.target.value)}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      required
                      value={newCheckOut}
                      onChange={(e) => setNewCheckOut(e.target.value)}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                    Unidade Disponível ({newAvailIds.length} livres)
                  </label>
                  <select
                    value={newPreferredUnit}
                    onChange={(e) => setNewPreferredUnit(e.target.value)}
                    className="w-full bg-branco-quente border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  >
                    <option value="">
                      {newAvailIds.length > 0
                        ? `Automático (${newAvailIds[0]})`
                        : 'Sem unidades livres nestas datas'}
                    </option>
                    {newAvailIds.slice(0, 60).map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Adultos
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={newAdults}
                      onChange={(e) => setNewAdults(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-branco-quente border border-gray-200 rounded-xl p-3 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Crianças
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={6}
                      value={newChildren}
                      onChange={(e) => setNewChildren(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-branco-quente border border-gray-200 rounded-xl p-3 text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="w-full bg-branco-quente border border-gray-200 rounded-xl p-3 text-xs"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs"
                      placeholder="cliente@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-principal/40 block mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full min-h-[44px] bg-branco-quente border border-gray-200 rounded-xl p-3 text-sm md:text-xs"
                      placeholder="+351 9..."
                    />
                  </div>
                </div>

                {newBookingError && (
                  <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl font-medium">
                    {newBookingError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={creatingBooking || newAvailIds.length === 0}
                  className="w-full bg-principal text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secundaria hover:text-principal transition-all disabled:opacity-40"
                >
                  {creatingBooking ? 'A registar...' : 'Criar Reserva Confirmada'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
