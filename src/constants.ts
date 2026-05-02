export const HINDU_MONTHS: Record<number, { en: string; hi: string }> = {
  0: { en: "Pausha / Magha", hi: "पौष / माघ" },
  1: { en: "Magha / Phalguna", hi: "माघ / फाल्गुन" },
  2: { en: "Phalguna / Chaitra", hi: "फाल्गुन / चैत्र" },
  3: { en: "Chaitra / Vaishakha", hi: "चैत्र / वैशाख" },
  4: { en: "Vaishakha / Jyeshtha", hi: "वैशाख / ज्येष्ठ" },
  5: { en: "Jyeshtha / Ashadha", hi: "ज्येष्ठ / आषाढ़" },
  6: { en: "Ashadha / Shravana", hi: "आषाढ़ / श्रावण" },
  7: { en: "Shravana / Bhadrapada", hi: "श्रावण / भाद्रपद" },
  8: { en: "Bhadrapada / Ashwin", hi: "भाद्रपद / अश्विन" },
  9: { en: "Ashwin / Kartika", hi: "अश्विन / कार्तिक" },
  10: { en: "Kartika / Margashirsha", hi: "कार्तिक / मार्गशीर्ष" },
  11: { en: "Margashirsha / Pausha", hi: "मार्गशीर्ष / पौष" },
};

export const TITHI_NAMES: Record<string, string[]> = {
  en: [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
  ],
  hi: [
    "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा",
    "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"
  ]
};

export const GREGORIAN_MONTHS: Record<string, Record<number, string>> = {
  en: {
    0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
    6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
  },
  hi: {
    0: "जनवरी", 1: "फरवरी", 2: "मार्च", 3: "अप्रैल", 4: "मई", 5: "जून",
    6: "जुलाई", 7: "अगस्त", 8: "सितंबर", 9: "अक्टूबर", 10: "नवंबर", 11: "दिसंबर"
  }
};

export const WEEKDAYS: Record<string, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
};

export const UI_LABELS: Record<string, any> = {
  en: {
    prev: "Previous",
    next: "Next",
    today: "Today",
    noFestivals: "No major festivals this month",
    festivals: "Festivals",
    thisMonthFestivals: "This Month's Festivals",
    loading: "Loading festivals...",
    error: "Failed to fetch holidays. Please try again.",
    details: "Details",
    close: "Close",
    tithi: "Tithi",
    month: "Month",
    date: "Date"
  },
  hi: {
    prev: "पिछला",
    next: "अगला",
    today: "आज",
    noFestivals: "इस महीने कोई प्रमुख त्यौहार नहीं है",
    festivals: "त्यौहार",
    thisMonthFestivals: "इस महीने के त्यौहार",
    loading: "त्यौहार लोड हो रहे हैं...",
    error: "छुट्टियां लाने में विफल। कृपया पुन: प्रयास करें।",
    details: "विवरण",
    close: "बंद करें",
    tithi: "तिथि",
    month: "माह",
    date: "तारीख"
  }
};

