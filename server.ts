import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  AccommodationType,
  AlveoloSize,
  AvailabilityResponse,
  Booking,
  BookingStatus,
  BungalowClass,
  ResourceUnit,
} from './src/types/booking.ts';
import {
  calculateAlveoloPrice,
  calculateBungalowPrice,
  datesOverlap,
  getNightsBetween,
} from './src/lib/pricing.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'camping-db.json');
const ADMIN_USER = 'camping1';
const ADMIN_PASS = '12345';
const ADMIN_TOKEN = 'crf-admin-token-2026';

interface DatabaseState {
  resources: ResourceUnit[];
  bookings: Booking[];
  nextBookingNumber: number;
}

function addDays(baseDateStr: string, days: number): string {
  const d = new Date(`${baseDateStr}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function createInitialResources(): ResourceUnit[] {
  const resources: ResourceUnit[] = [];

  // 350 Alvéolos:
  // A1 - A120: Setor Norte (Ruas 1-4)
  // A121 - A240: Setor Sul (Ruas 5-8)
  // A241 - A350: Setor Nascente (Ruas 9-12)
  for (let i = 1; i <= 350; i++) {
    const sector: 'Norte' | 'Sul' | 'Nascente' =
      i <= 120 ? 'Norte' : i <= 240 ? 'Sul' : 'Nascente';
    const street = Math.ceil(i / 30);

    // Sizes: 1-150 Pequeno, 151-290 Grande, 291-350 XL
    const size: AlveoloSize = i <= 150 ? 'pequeno' : i <= 290 ? 'grande' : 'xl';
    const capacity = size === 'pequeno' ? 4 : size === 'grande' ? 6 : 8;

    resources.push({
      id: `A${i}`,
      number: i,
      type: 'alveolos',
      name: `Alvéolo ${i}`,
      sector,
      street,
      size,
      capacity,
      blocked: i === 46 || i === 188,
      blockedReason: i === 46 || i === 188 ? 'Manutenção elétrica programada' : undefined,
    });
  }

  // 5 Bungalows:
  // B1, B2: Classe A (até 5 pessoas)
  // B3, B4, B5: Classe B (até 4 pessoas)
  resources.push(
    {
      id: 'B1',
      number: 1,
      type: 'bungalows',
      name: 'Bungalow B1',
      bungalowClass: 'A',
      capacity: 5,
      blocked: false,
    },
    {
      id: 'B2',
      number: 2,
      type: 'bungalows',
      name: 'Bungalow B2',
      bungalowClass: 'A',
      capacity: 5,
      blocked: false,
    },
    {
      id: 'B3',
      number: 3,
      type: 'bungalows',
      name: 'Bungalow B3',
      bungalowClass: 'B',
      capacity: 4,
      blocked: false,
    },
    {
      id: 'B4',
      number: 4,
      type: 'bungalows',
      name: 'Bungalow B4',
      bungalowClass: 'B',
      capacity: 4,
      blocked: false,
    },
    {
      id: 'B5',
      number: 5,
      type: 'bungalows',
      name: 'Bungalow B5',
      bungalowClass: 'B',
      capacity: 4,
      blocked: false,
    }
  );

  return resources;
}

function createInitialBookings(): Booking[] {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      id: 'CRF-1001',
      guestName: 'João Silva',
      email: 'joao.silva@email.pt',
      phone: '+351 912 345 678',
      type: 'bungalows',
      subtype: 'Classe A',
      resourceId: 'B1',
      checkIn: addDays(today, -1),
      checkOut: addDays(today, 3),
      adults: 2,
      children: 2,
      pets: 0,
      electricity: true,
      status: 'checked-in',
      source: 'website',
      totalPrice: calculateBungalowPrice({
        bungalowClass: 'A',
        checkIn: addDays(today, -1),
        checkOut: addDays(today, 3),
      }).total,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'CRF-1002',
      guestName: 'Robert Smith',
      email: 'robert.smith@travel.uk',
      phone: '+44 7700 900123',
      type: 'bungalows',
      subtype: 'Classe B',
      resourceId: 'B3',
      checkIn: today,
      checkOut: addDays(today, 5),
      adults: 2,
      children: 1,
      pets: 0,
      electricity: true,
      status: 'confirmed',
      source: 'website',
      totalPrice: calculateBungalowPrice({
        bungalowClass: 'B',
        checkIn: today,
        checkOut: addDays(today, 5),
      }).total,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'CRF-1003',
      guestName: 'Maria Santos',
      email: 'maria.santos@email.pt',
      phone: '+351 965 432 109',
      type: 'alveolos',
      subtype: 'Grande',
      resourceId: 'A152',
      checkIn: addDays(today, -2),
      checkOut: addDays(today, 4),
      adults: 2,
      children: 0,
      pets: 1,
      electricity: true,
      status: 'checked-in',
      source: 'website',
      totalPrice: calculateAlveoloPrice({
        size: 'grande',
        checkIn: addDays(today, -2),
        checkOut: addDays(today, 4),
        adults: 2,
        children: 0,
        pets: 1,
        electricity: true,
      }).total,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'CRF-1004',
      guestName: 'Hans Müller',
      email: 'h.mueller@campers.de',
      phone: '+49 170 5551234',
      type: 'alveolos',
      subtype: 'XL',
      resourceId: 'A295',
      checkIn: today,
      checkOut: addDays(today, 7),
      adults: 2,
      children: 0,
      pets: 0,
      electricity: true,
      status: 'confirmed',
      source: 'backoffice',
      totalPrice: calculateAlveoloPrice({
        size: 'xl',
        checkIn: today,
        checkOut: addDays(today, 7),
        adults: 2,
        children: 0,
        pets: 0,
        electricity: true,
      }).total,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'CRF-1005',
      guestName: 'Claire Dubois',
      email: 'claire.dubois@voyage.fr',
      phone: '+33 6 12 34 56 78',
      type: 'alveolos',
      subtype: 'Pequeno',
      resourceId: 'A12',
      checkIn: addDays(today, 1),
      checkOut: addDays(today, 4),
      adults: 2,
      children: 1,
      pets: 0,
      electricity: false,
      status: 'confirmed',
      source: 'website',
      totalPrice: calculateAlveoloPrice({
        size: 'pequeno',
        checkIn: addDays(today, 1),
        checkOut: addDays(today, 4),
        adults: 2,
        children: 1,
        pets: 0,
        electricity: false,
      }).total,
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: 'CRF-1006',
      guestName: 'Tiago Ferreira',
      email: 'tiago.f@gmail.com',
      phone: '+351 933 221 100',
      type: 'alveolos',
      subtype: 'Pequeno',
      resourceId: 'A18',
      checkIn: addDays(today, -5),
      checkOut: addDays(today, -1),
      adults: 1,
      children: 0,
      pets: 0,
      electricity: true,
      status: 'checked-out',
      source: 'website',
      totalPrice: calculateAlveoloPrice({
        size: 'pequeno',
        checkIn: addDays(today, -5),
        checkOut: addDays(today, -1),
        adults: 1,
        children: 0,
        pets: 0,
        electricity: true,
      }).total,
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
  ];
}

function loadState(): DatabaseState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as DatabaseState;
      if (Array.isArray(parsed.resources) && Array.isArray(parsed.bookings)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read camping-db.json, initializing fresh state:', err);
  }
  const initial: DatabaseState = {
    resources: createInitialResources(),
    bookings: createInitialBookings(),
    nextBookingNumber: 1007,
  };
  saveState(initial);
  return initial;
}

function saveState(state: DatabaseState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist camping-db.json:', err);
  }
}

const dbState: DatabaseState = loadState();

function isResourceAvailableForRange(
  resource: ResourceUnit,
  checkIn: string,
  checkOut: string,
  ignoreBookingId?: string
): boolean {
  if (resource.blocked) return false;

  const hasConflict = dbState.bookings.some((b) => {
    if (b.id === ignoreBookingId) return false;
    if (b.resourceId !== resource.id) return false;
    if (b.status === 'cancelled' || b.status === 'checked-out') return false;
    return datesOverlap(checkIn, checkOut, b.checkIn, b.checkOut);
  });

  return !hasConflict;
}

function computeAvailability(params: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets: number;
  electricity: boolean;
}): AvailabilityResponse {
  const { checkIn, checkOut, adults, children, pets, electricity } = params;
  const totalGuests = adults + children;
  const nights = getNightsBetween(checkIn, checkOut);

  const getAvailableIds = (filterFn: (r: ResourceUnit) => boolean): string[] =>
    dbState.resources
      .filter((r) => filterFn(r) && isResourceAvailableForRange(r, checkIn, checkOut))
      .map((r) => r.id);

  const peqIds = getAvailableIds((r) => r.type === 'alveolos' && r.size === 'pequeno');
  const graIds = getAvailableIds((r) => r.type === 'alveolos' && r.size === 'grande');
  const xlIds = getAvailableIds((r) => r.type === 'alveolos' && r.size === 'xl');
  const bungAIds = getAvailableIds((r) => r.type === 'bungalows' && r.bungalowClass === 'A');
  const bungBIds = getAvailableIds((r) => r.type === 'bungalows' && r.bungalowClass === 'B');

  const peqPrice = calculateAlveoloPrice({
    size: 'pequeno',
    checkIn,
    checkOut,
    adults,
    children,
    pets,
    electricity,
  });
  const graPrice = calculateAlveoloPrice({
    size: 'grande',
    checkIn,
    checkOut,
    adults,
    children,
    pets,
    electricity,
  });
  const xlPrice = calculateAlveoloPrice({
    size: 'xl',
    checkIn,
    checkOut,
    adults,
    children,
    pets,
    electricity,
  });
  const bungAPrice = calculateBungalowPrice({
    bungalowClass: 'A',
    checkIn,
    checkOut,
    pets,
  });
  const bungBPrice = calculateBungalowPrice({
    bungalowClass: 'B',
    checkIn,
    checkOut,
    pets,
  });

  return {
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    alveolos: {
      pequeno: {
        key: 'pequeno',
        label: 'Alvéolo Pequeno (até 35 m²)',
        description: 'Ideal para tendas pequenas/médias ou carro + tenda.',
        totalUnits: 150,
        availableUnits: peqIds.length,
        availableIds: peqIds,
        maxGuests: 4,
        pricePerNight: peqPrice.averagePerNight,
        estimatedTotal: peqPrice.total,
        nights,
        eligible: totalGuests <= 4 && peqIds.length > 0,
        ineligibleReason:
          totalGuests > 4
            ? 'Lotação máxima: 4 pessoas'
            : peqIds.length === 0
              ? 'Esgotado nestas datas'
              : undefined,
      },
      grande: {
        key: 'grande',
        label: 'Alvéolo Grande (até 90 m²)',
        description: 'Recomendado para autocaravanas, caravanas ou tendas familiares.',
        totalUnits: 140,
        availableUnits: graIds.length,
        availableIds: graIds,
        maxGuests: 6,
        pricePerNight: graPrice.averagePerNight,
        estimatedTotal: graPrice.total,
        nights,
        eligible: totalGuests <= 6 && graIds.length > 0,
        ineligibleReason:
          totalGuests > 6
            ? 'Lotação máxima: 6 pessoas'
            : graIds.length === 0
              ? 'Esgotado nestas datas'
              : undefined,
      },
      xl: {
        key: 'xl',
        label: 'Alvéolo XL (+ de 90 m²)',
        description: 'Espaço amplo para grandes autocaravanas ou grupos.',
        totalUnits: 60,
        availableUnits: xlIds.length,
        availableIds: xlIds,
        maxGuests: 8,
        pricePerNight: xlPrice.averagePerNight,
        estimatedTotal: xlPrice.total,
        nights,
        eligible: totalGuests <= 8 && xlIds.length > 0,
        ineligibleReason:
          totalGuests > 8
            ? 'Lotação máxima: 8 pessoas'
            : xlIds.length === 0
              ? 'Esgotado nestas datas'
              : undefined,
      },
      totalAvailable: peqIds.length + graIds.length + xlIds.length,
    },
    bungalows: {
      classeA: {
        key: 'A',
        label: 'Bungalow T2 — Classe A',
        description: '2 quartos (cama de casal + 3 camas com beliche), cozinha, AC e terraço.',
        totalUnits: 2,
        availableUnits: bungAIds.length,
        availableIds: bungAIds,
        maxGuests: 5,
        pricePerNight: bungAPrice.averagePerNight,
        estimatedTotal: bungAPrice.total,
        nights,
        eligible: totalGuests <= 5 && bungAIds.length > 0,
        ineligibleReason:
          totalGuests > 5
            ? 'Capacidade máxima: 5 pessoas'
            : bungAIds.length === 0
              ? 'Sem bungalows Classe A livres nestas datas'
              : undefined,
      },
      classeB: {
        key: 'B',
        label: 'Bungalow T2 — Classe B',
        description: '2 quartos (cama de casal + beliche 2 camas), cozinha, AC e terraço.',
        totalUnits: 3,
        availableUnits: bungBIds.length,
        availableIds: bungBIds,
        maxGuests: 4,
        pricePerNight: bungBPrice.averagePerNight,
        estimatedTotal: bungBPrice.total,
        nights,
        eligible: totalGuests <= 4 && bungBIds.length > 0,
        ineligibleReason:
          totalGuests > 4
            ? 'Capacidade máxima: 4 pessoas'
            : bungBIds.length === 0
              ? 'Sem bungalows Classe B livres nestas datas'
              : undefined,
      },
      totalAvailable: bungAIds.length + bungBIds.length,
    },
  };
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) {
    res.status(401).json({ error: 'Sessão administrativa inválida ou expirada.' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Public: Check real-time availability
  app.get('/api/availability', (req, res) => {
    const checkIn = String(req.query.checkIn || '');
    const checkOut = String(req.query.checkOut || '');
    const adults = Math.max(1, parseInt(String(req.query.adults || '2'), 10) || 2);
    const children = Math.max(0, parseInt(String(req.query.children || '0'), 10) || 0);
    const pets = Math.max(0, parseInt(String(req.query.pets || '0'), 10) || 0);
    const electricity = String(req.query.electricity || 'true') !== 'false';

    if (!checkIn || !checkOut || getNightsBetween(checkIn, checkOut) <= 0) {
      res.status(400).json({ error: 'Datas inválidas. A data de saída deve ser posterior à entrada.' });
      return;
    }

    const result = computeAvailability({ checkIn, checkOut, adults, children, pets, electricity });
    res.json(result);
  });

  // Public & Backoffice: Create automatic confirmed booking
  app.post('/api/bookings', (req, res) => {
    const body = req.body as {
      guestName?: string;
      email?: string;
      phone?: string;
      nif?: string;
      notes?: string;
      type?: AccommodationType;
      subtypeKey?: string; // 'pequeno' | 'grande' | 'xl' | 'A' | 'B'
      preferredResourceId?: string;
      checkIn?: string;
      checkOut?: string;
      adults?: number;
      children?: number;
      pets?: number;
      electricity?: boolean;
      source?: 'website' | 'backoffice';
      status?: BookingStatus;
    };

    const guestName = (body.guestName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const checkIn = (body.checkIn || '').trim();
    const checkOut = (body.checkOut || '').trim();
    const type = body.type;
    const subtypeKey = body.subtypeKey || '';
    const adults = Math.max(1, Number(body.adults) || 1);
    const children = Math.max(0, Number(body.children) || 0);
    const pets = Math.max(0, Number(body.pets) || 0);
    const electricity = body.electricity !== false;
    const source = body.source === 'backoffice' ? 'backoffice' : 'website';

    if (source === 'backoffice') {
      const token = req.headers['x-admin-token'];
      if (token !== ADMIN_TOKEN) {
        res.status(401).json({ error: 'Autorização administrativa necessária.' });
        return;
      }
    }

    if (!guestName || !email || !phone) {
      res.status(400).json({ error: 'Por favor preencha o nome, email e telefone.' });
      return;
    }

    if (type !== 'alveolos' && type !== 'bungalows') {
      res.status(400).json({ error: 'Este tipo de alojamento não permite reserva automática no site.' });
      return;
    }

    const nights = getNightsBetween(checkIn, checkOut);
    if (nights <= 0) {
      res.status(400).json({ error: 'O período de estadia deve ter pelo menos 1 noite.' });
      return;
    }

    const totalGuests = adults + children;

    // Match candidates from live resources
    let candidates: ResourceUnit[] = [];
    let subtypeLabel = '';
    let totalPrice = 0;

    if (type === 'alveolos') {
      const validSize: AlveoloSize =
        subtypeKey === 'pequeno' || subtypeKey === 'grande' || subtypeKey === 'xl'
          ? subtypeKey
          : 'grande';
      const maxCap = validSize === 'pequeno' ? 4 : validSize === 'grande' ? 6 : 8;
      if (totalGuests > maxCap) {
        res.status(400).json({
          error: `A lotação selecionada (${totalGuests} hóspedes) excede o máximo de ${maxCap} para este alvéolo.`,
        });
        return;
      }
      candidates = dbState.resources.filter(
        (r) =>
          r.type === 'alveolos' &&
          r.size === validSize &&
          isResourceAvailableForRange(r, checkIn, checkOut)
      );
      subtypeLabel =
        validSize === 'pequeno' ? 'Pequeno' : validSize === 'grande' ? 'Grande' : 'XL';
      totalPrice = calculateAlveoloPrice({
        size: validSize,
        checkIn,
        checkOut,
        adults,
        children,
        pets,
        electricity,
      }).total;
    } else {
      const bClass: BungalowClass = subtypeKey === 'A' ? 'A' : 'B';
      const maxCap = bClass === 'A' ? 5 : 4;
      if (totalGuests > maxCap) {
        res.status(400).json({
          error: `O Bungalow Classe ${bClass} tem capacidade máxima para ${maxCap} hóspedes.`,
        });
        return;
      }
      candidates = dbState.resources.filter(
        (r) =>
          r.type === 'bungalows' &&
          r.bungalowClass === bClass &&
          isResourceAvailableForRange(r, checkIn, checkOut)
      );
      subtypeLabel = `Classe ${bClass}`;
      totalPrice = calculateBungalowPrice({
        bungalowClass: bClass,
        checkIn,
        checkOut,
        pets,
      }).total;
    }

    let chosenResource: ResourceUnit | undefined;
    if (body.preferredResourceId) {
      chosenResource = candidates.find((c) => c.id === body.preferredResourceId);
      if (!chosenResource) {
        res.status(409).json({
          error: `A unidade ${body.preferredResourceId} já não se encontra disponível para estas datas.`,
        });
        return;
      }
    } else {
      chosenResource = candidates[0];
    }

    if (!chosenResource) {
      res.status(409).json({
        error: 'Lamentamos, mas esgotaram as unidades disponíveis para estas datas. Por favor escolha outras datas ou outro alojamento.',
      });
      return;
    }

    const newId = `CRF-${dbState.nextBookingNumber++}`;
    const booking: Booking = {
      id: newId,
      guestName,
      email,
      phone,
      nif: body.nif?.trim() || undefined,
      notes: body.notes?.trim() || undefined,
      type,
      subtype: subtypeLabel,
      resourceId: chosenResource.id,
      checkIn,
      checkOut,
      adults,
      children,
      pets,
      electricity: type === 'bungalows' ? true : electricity,
      status: source === 'backoffice' && body.status ? body.status : 'confirmed',
      source,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    dbState.bookings.unshift(booking);
    saveState(dbState);

    res.status(201).json({ booking, resource: chosenResource });
  });

  // Admin: Login
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = (req.body || {}) as { username?: string; password?: string };
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      res.json({ token: ADMIN_TOKEN, user: ADMIN_USER });
      return;
    }
    res.status(401).json({ error: 'Utilizador ou palavra-passe incorretos' });
  });

  // Admin: Get full state (bookings + resources)
  app.get('/api/admin/state', requireAdmin, (_req, res) => {
    res.json({
      bookings: dbState.bookings,
      resources: dbState.resources,
    });
  });

  // Admin: Update booking (status, resourceId, notes)
  app.patch('/api/admin/bookings/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const booking = dbState.bookings.find((b) => b.id === id);
    if (!booking) {
      res.status(404).json({ error: 'Reserva não encontrada.' });
      return;
    }

    const { status, resourceId, notes } = req.body as {
      status?: BookingStatus;
      resourceId?: string;
      notes?: string;
    };

    if (resourceId && resourceId !== booking.resourceId) {
      const target = dbState.resources.find((r) => r.id === resourceId);
      if (!target) {
        res.status(404).json({ error: 'Unidade selecionada não existe.' });
        return;
      }
      if (target.type !== booking.type) {
        res.status(400).json({ error: 'A unidade deve ser do mesmo tipo da reserva.' });
        return;
      }
      if (!isResourceAvailableForRange(target, booking.checkIn, booking.checkOut, booking.id)) {
        res.status(409).json({
          error: `A unidade ${resourceId} já está ocupada ou bloqueada nas datas ${booking.checkIn} a ${booking.checkOut}.`,
        });
        return;
      }
      booking.resourceId = resourceId;
      if (target.type === 'alveolos' && target.size) {
        booking.subtype =
          target.size === 'pequeno' ? 'Pequeno' : target.size === 'grande' ? 'Grande' : 'XL';
      } else if (target.type === 'bungalows' && target.bungalowClass) {
        booking.subtype = `Classe ${target.bungalowClass}`;
      }
    }

    if (status) {
      // If re-activating a cancelled booking, ensure resource is still available
      if (
        (booking.status === 'cancelled' || booking.status === 'checked-out') &&
        (status === 'confirmed' || status === 'checked-in' || status === 'pending')
      ) {
        const resUnit = dbState.resources.find((r) => r.id === booking.resourceId);
        if (resUnit && !isResourceAvailableForRange(resUnit, booking.checkIn, booking.checkOut, booking.id)) {
          res.status(409).json({
            error: `Não é possível reativar: ${booking.resourceId} já foi reservado por outro cliente nestas datas.`,
          });
          return;
        }
      }
      booking.status = status;
    }

    if (typeof notes === 'string') {
      booking.notes = notes;
    }

    saveState(dbState);
    res.json({ booking });
  });

  // Admin: Toggle resource block/maintenance
  app.patch('/api/admin/resources/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const unit = dbState.resources.find((r) => r.id === id);
    if (!unit) {
      res.status(404).json({ error: 'Unidade não encontrada.' });
      return;
    }
    const { blocked, blockedReason } = req.body as { blocked?: boolean; blockedReason?: string };
    if (typeof blocked === 'boolean') {
      unit.blocked = blocked;
      unit.blockedReason = blocked ? (blockedReason || 'Bloqueado pela receção') : undefined;
    }
    saveState(dbState);
    res.json({ resource: unit });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Camping Ria Formosa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
