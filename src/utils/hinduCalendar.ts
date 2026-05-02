import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';
import { TITHI_NAMES, HINDU_MONTHS } from '../constants';

export interface HinduDetails {
  tithiIndex: number;
  tithiName: { en: string; hi: string };
  isPurnima: boolean;
  isAmavasya: boolean;
  masaIndex: number;
  masaName: { en: string; hi: string };
  paksha: 'Shukla' | 'Krishna';
  year: number; // Vikram Samvat
  isAdhika: boolean;
}

// Default observer (New Delhi)
const DEFAULT_LAT = 28.6139;
const DEFAULT_LON = 77.2090;

export const getHinduDetails = (date: Date, latitude?: number, longitude?: number): HinduDetails => {
  const obs = new Observer(latitude || DEFAULT_LAT, longitude || DEFAULT_LON, 0);
  // IST timezone offset is 330 minutes
  const panchang = getPanchangam(date, obs, { timezoneOffset: 330 });

  const tithiIndex = panchang.tithi - 1;
  const isPurnima = panchang.tithi === 15;
  const isAmavasya = panchang.tithi === 30;

  return {
    tithiIndex,
    tithiName: {
      en: TITHI_NAMES.en[tithiIndex],
      hi: TITHI_NAMES.hi[tithiIndex]
    },
    isPurnima,
    isAmavasya,
    masaIndex: panchang.masa.index,
    masaName: {
      en: HINDU_MONTHS[panchang.masa.index].en + (panchang.masa.isAdhika ? ' (Adhik)' : ''),
      hi: HINDU_MONTHS[panchang.masa.index].hi + (panchang.masa.isAdhika ? ' (अधिक)' : '')
    },
    paksha: panchang.paksha as 'Shukla' | 'Krishna',
    year: panchang.samvat.vikram,
    isAdhika: panchang.masa.isAdhika
  };
};
