import type { AlveoloSize, BungalowClass } from '../types/booking.ts';

export type Season = 'baixa' | 'media' | 'alta';

export function getSeasonForDate(dateStr: string): Season {
  const date = new Date(`${dateStr}T12:00:00`);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Época Alta: 01/08 a 31/08
  if (month === 8) return 'alta';

  // Época Média: 15/06 a 31/07 & 01/09 a 15/09
  if (
    (month === 6 && day >= 15) ||
    month === 7 ||
    (month === 9 && day <= 15)
  ) {
    return 'media';
  }

  // Época Baixa: 16/09 a 14/06
  return 'baixa';
}

export function getNightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function iterateStayNights(checkIn: string, checkOut: string): string[] {
  const nights = getNightsBetween(checkIn, checkOut);
  const dates: string[] = [];
  const cursor = new Date(`${checkIn}T12:00:00`);
  for (let i = 0; i < nights; i++) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

const ALVEOLO_RATES: Record<Season, {
  adult: number;
  child: number;
  pequeno: number;
  grande: number;
  xl: number;
  electricity: number;
  pet: number;
}> = {
  baixa: { adult: 6.6, child: 4.4, pequeno: 8.8, grande: 17.0, xl: 26.4, electricity: 5.5, pet: 4.0 },
  media: { adult: 8.8, child: 5.5, pequeno: 11.0, grande: 20.4, xl: 33.0, electricity: 5.5, pet: 4.0 },
  alta: { adult: 9.7, child: 6.0, pequeno: 12.1, grande: 22.5, xl: 36.3, electricity: 5.5, pet: 4.0 },
};

const BUNGALOW_RATES: Record<Season, Record<BungalowClass, number>> = {
  baixa: { A: 95, B: 80 },
  media: { A: 125, B: 105 },
  alta: { A: 150, B: 130 },
};

export function calculateAlveoloPrice(params: {
  size: AlveoloSize;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets?: number;
  electricity?: boolean;
}): { nights: number; total: number; averagePerNight: number } {
  const nightDates = iterateStayNights(params.checkIn, params.checkOut);
  const nights = nightDates.length;
  if (nights === 0) return { nights: 0, total: 0, averagePerNight: 0 };

  let total = 0;
  for (const d of nightDates) {
    const season = getSeasonForDate(d);
    const rates = ALVEOLO_RATES[season];
    const spaceRate = rates[params.size];
    const guestsRate = params.adults * rates.adult + params.children * rates.child;
    const extrasRate = (params.electricity ? rates.electricity : 0) + ((params.pets || 0) * rates.pet);
    total += spaceRate + guestsRate + extrasRate;
  }

  const rounded = Math.round(total * 100) / 100;
  return {
    nights,
    total: rounded,
    averagePerNight: Math.round((rounded / nights) * 100) / 100,
  };
}

export function calculateBungalowPrice(params: {
  bungalowClass: BungalowClass;
  checkIn: string;
  checkOut: string;
  pets?: number;
}): { nights: number; total: number; averagePerNight: number } {
  const nightDates = iterateStayNights(params.checkIn, params.checkOut);
  const nights = nightDates.length;
  if (nights === 0) return { nights: 0, total: 0, averagePerNight: 0 };

  let total = 0;
  for (const d of nightDates) {
    const season = getSeasonForDate(d);
    const base = BUNGALOW_RATES[season][params.bungalowClass];
    const petFee = (params.pets || 0) * 4.0;
    total += base + petFee;
  }

  const rounded = Math.round(total * 100) / 100;
  return {
    nights,
    total: rounded,
    averagePerNight: Math.round((rounded / nights) * 100) / 100,
  };
}

export function datesOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  return startA < endB && endA > startB;
}

export function isDateWithinStay(date: string, checkIn: string, checkOut: string): boolean {
  // Occupied on nights [checkIn, checkOut)
  return date >= checkIn && date < checkOut;
}
