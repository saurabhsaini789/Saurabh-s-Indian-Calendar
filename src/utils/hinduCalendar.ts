import { TITHI_NAMES } from '../constants';

// Reference: Dec 21, 2025 was Shukla Pratipada (Tithi 1)
const REFERENCE_DATE = new Date(2025, 11, 21); 
const LUNAR_MONTH_DAYS = 29.530588;

export interface HinduDetails {
  tithiIndex: number;
  tithiName: { en: string; hi: string };
  isPurnima: boolean;
  isAmavasya: boolean;
}

export const getHinduDetails = (date: Date): HinduDetails => {
  const diffTime = date.getTime() - REFERENCE_DATE.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  // Approximate Tithi (1 to 30)
  // We use a slightly more complex modulo to account for the lunar cycle
  let tithi = Math.floor(((diffDays % LUNAR_MONTH_DAYS) / LUNAR_MONTH_DAYS) * 30) + 1;
  
  // Normalize tithi to 1-30
  if (tithi > 30) tithi = 30;
  if (tithi < 1) tithi = 1;

  const tithiIndex = tithi - 1;
  
  return {
    tithiIndex,
    tithiName: {
      en: TITHI_NAMES.en[tithiIndex],
      hi: TITHI_NAMES.hi[tithiIndex]
    },
    isPurnima: tithi === 15,
    isAmavasya: tithi === 30
  };
};
