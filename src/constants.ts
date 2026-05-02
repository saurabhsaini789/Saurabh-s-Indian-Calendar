export const HINDU_MONTHS: Record<number, { en: string; hi: string }> = {
  0: { en: "Chaitra", hi: "चैत्र" },
  1: { en: "Vaishakha", hi: "वैशाख" },
  2: { en: "Jyeshtha", hi: "ज्येष्ठ" },
  3: { en: "Ashadha", hi: "आषाढ़" },
  4: { en: "Shravana", hi: "श्रावण" },
  5: { en: "Bhadrapada", hi: "भाद्रपद" },
  6: { en: "Ashwin", hi: "अश्विन" },
  7: { en: "Kartika", hi: "कार्तिक" },
  8: { en: "Margashirsha", hi: "मार्गशीर्ष" },
  9: { en: "Pausha", hi: "पौष" },
  10: { en: "Magha", hi: "माघ" },
  11: { en: "Phalguna", hi: "फाल्गुन" },
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

