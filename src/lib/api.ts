import type {
  AccommodationType,
  AvailabilityResponse,
  Booking,
  BookingStatus,
  ResourceUnit,
} from '../types/booking.ts';

const CHANNEL_NAME = 'crf-reservations-sync';

export function broadcastSync(): void {
  try {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    ch.postMessage({ type: 'SYNC', timestamp: Date.now() });
    ch.close();
  } catch {
    // BroadcastChannel not supported in some environments
  }
}

export function subscribeSync(onSync: () => void): () => void {
  let ch: BroadcastChannel | null = null;
  try {
    ch = new BroadcastChannel(CHANNEL_NAME);
    ch.onmessage = () => onSync();
  } catch {
    // ignore
  }
  return () => {
    try {
      ch?.close();
    } catch {
      // ignore
    }
  };
}

export async function checkAvailability(params: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets?: number;
  electricity?: boolean;
}): Promise<AvailabilityResponse> {
  const qs = new URLSearchParams({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    adults: String(params.adults),
    children: String(params.children),
    pets: String(params.pets ?? 0),
    electricity: String(params.electricity ?? true),
  });
  const res = await fetch(`/api/availability?${qs.toString()}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro ao verificar disponibilidade.');
  }
  return data as AvailabilityResponse;
}

export async function createBooking(
  payload: {
    guestName: string;
    email: string;
    phone: string;
    nif?: string;
    notes?: string;
    type: AccommodationType;
    subtypeKey: string;
    preferredResourceId?: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    pets?: number;
    electricity?: boolean;
    source?: 'website' | 'backoffice';
    status?: BookingStatus;
  },
  adminToken?: string
): Promise<{ booking: Booking; resource: ResourceUnit }> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (adminToken) headers['x-admin-token'] = adminToken;

  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Não foi possível concluir a reserva.');
  }
  broadcastSync();
  return data as { booking: Booking; resource: ResourceUnit };
}

export async function adminLogin(username: string, password: string): Promise<{ token: string; user: string }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Credenciais inválidas.');
  }
  return data as { token: string; user: string };
}

export async function fetchAdminState(token: string): Promise<{ bookings: Booking[]; resources: ResourceUnit[] }> {
  const res = await fetch('/api/admin/state', {
    headers: { 'x-admin-token': token },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro ao carregar dados do backoffice.');
  }
  return data as { bookings: Booking[]; resources: ResourceUnit[] };
}

export async function updateAdminBooking(
  token: string,
  id: string,
  updates: { status?: BookingStatus; resourceId?: string; notes?: string }
): Promise<Booking> {
  const res = await fetch(`/api/admin/bookings/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': token,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro ao atualizar reserva.');
  }
  broadcastSync();
  return data.booking as Booking;
}

export async function updateAdminResource(
  token: string,
  id: string,
  updates: { blocked: boolean; blockedReason?: string }
): Promise<ResourceUnit> {
  const res = await fetch(`/api/admin/resources/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': token,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro ao atualizar unidade.');
  }
  broadcastSync();
  return data.resource as ResourceUnit;
}
