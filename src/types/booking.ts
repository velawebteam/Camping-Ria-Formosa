export type AccommodationType = 'alveolos' | 'bungalows';
export type AlveoloSize = 'pequeno' | 'grande' | 'xl';
export type BungalowClass = 'A' | 'B';
export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
export type BookingSource = 'website' | 'backoffice';

export interface ResourceUnit {
  id: string; // e.g., 'A1'..'A350', 'B1'..'B5'
  number: number;
  type: AccommodationType;
  name: string;
  sector?: 'Norte' | 'Sul' | 'Nascente';
  street?: number;
  size?: AlveoloSize;
  bungalowClass?: BungalowClass;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
}

export interface Booking {
  id: string; // e.g., 'CRF-1001'
  guestName: string;
  email: string;
  phone: string;
  nif?: string;
  notes?: string;
  type: AccommodationType;
  subtype: string; // 'Pequeno' | 'Grande' | 'XL' | 'Classe A' | 'Classe B'
  resourceId: string; // e.g., 'A12', 'B1'
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  pets: number;
  electricity: boolean;
  status: BookingStatus;
  source: BookingSource;
  totalPrice: number;
  createdAt: string;
}

export interface AvailabilityCategorySummary {
  key: string;
  label: string;
  description: string;
  totalUnits: number;
  availableUnits: number;
  availableIds: string[];
  maxGuests: number;
  pricePerNight: number;
  estimatedTotal: number;
  nights: number;
  eligible: boolean;
  ineligibleReason?: string;
}

export interface AvailabilityResponse {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  alveolos: {
    pequeno: AvailabilityCategorySummary;
    grande: AvailabilityCategorySummary;
    xl: AvailabilityCategorySummary;
    totalAvailable: number;
  };
  bungalows: {
    classeA: AvailabilityCategorySummary;
    classeB: AvailabilityCategorySummary;
    totalAvailable: number;
  };
}
