import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Moon, Sun, X, Info, Calendar as CalendarIcon, Languages } from 'lucide-react';
import { HINDU_MONTHS, GREGORIAN_MONTHS, WEEKDAYS, UI_LABELS, TITHI_NAMES } from './constants';
import { getHinduDetails, type HinduDetails } from './utils/hinduCalendar';

// --- API CONFIGURATION ---
const API_KEY = 'Adq7zofbo0gnMb15GLwT0N3h9mMPTNYG'; // User provided or placeholder
const BASE_URL = 'https://calendarific.com/api/v2/holidays';
const COUNTRY = 'IN';

interface Holiday {
  name: string;
  description: string;
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
    };
  };
  type: string[];
}

interface DayData {
  day: number;
  date: Date;
  hindu: HinduDetails;
  holidays: Holiday[];
  isToday: boolean;
  isEmpty: boolean;
}

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [yearHolidays, setYearHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Touch handlers for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Caching & Fetching
  const fetchYearHolidays = async (targetYear: number) => {
    const cacheKey = `holidays_${targetYear}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      setYearHolidays(JSON.parse(cachedData));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY, country: COUNTRY, year: targetYear },
      });

      if (response.data.response && response.data.response.holidays) {
        const data = response.data.response.holidays;
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setYearHolidays(data);
      }
    } catch (err) {
      setError(UI_LABELS[lang].error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYearHolidays(year);
  }, [year]);

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDayOfMonth = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

  const calendarDays = useMemo(() => {
    const days: DayData[] = [];
    const today = new Date();
    
    // Empty cells for padding
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, date: new Date(), hindu: {} as HinduDetails, holidays: [], isToday: false, isEmpty: true });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const hindu = getHinduDetails(date);
      const holidays = yearHolidays.filter(h => 
        h.date.datetime.year === year && 
        h.date.datetime.month === month + 1 && 
        h.date.datetime.day === d
      );
      
      const isTodayVal = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
      
      days.push({
        day: d,
        date,
        hindu,
        holidays,
        isToday: isTodayVal,
        isEmpty: false
      });
    }
    return days;
  }, [year, month, yearHolidays]);

  const festivalsThisMonth = useMemo(() => {
    return calendarDays.filter(d => !d.isEmpty && d.holidays.length > 0);
  }, [calendarDays]);

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const goToToday = () => setCurrentDate(new Date());

  const handleDayClick = (dayData: DayData) => {
    if (dayData.isEmpty) return;
    setSelectedDay(dayData);
    setIsModalOpen(true);
  };

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) changeMonth(1);
    if (isRightSwipe) changeMonth(-1);

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="app-main" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Sticky Header */}
      <header className="sticky-header glass">
        <div className="header-top">
          <button className="nav-btn" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={24} />
          </button>
          <div className="month-year-title">
            <div className="hindu-month-label">{HINDU_MONTHS[month][lang]}</div>
            <h1>{GREGORIAN_MONTHS[lang][month]} {year}</h1>
          </div>
          <button className="nav-btn" onClick={() => changeMonth(1)}>
            <ChevronRight size={24} />
          </button>
        </div>
      </header>

      {/* Controls Row */}
      <div className="controls-row">
        <div className="toggle-pill">
          <button className={`toggle-item ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`toggle-item ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हि</button>
        </div>
        <button className="btn glass" onClick={goToToday} style={{borderRadius: '100px', padding: '6px 16px', color: 'var(--text)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <CalendarIcon size={16} />
          <span>{UI_LABELS[lang].today}</span>
        </button>
        <div className="toggle-pill">
          <button className={`toggle-item ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
            <Sun size={16} />
          </button>
          <button className={`toggle-item ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
            <Moon size={16} />
          </button>
        </div>
      </div>

      {error && <div style={{padding: '1rem', textAlign: 'center', color: '#ff4444'}}>{error}</div>}

      {/* Calendar Grid */}
      <div className="calendar-container">
        <div className="calendar-grid">
          {WEEKDAYS[lang].map(d => <div key={d} className="weekday-label">{d}</div>)}
          {calendarDays.map((d, i) => (
            <div 
              key={i} 
              className={`day-cell ${d.isEmpty ? 'empty' : ''} ${d.isToday ? 'today' : ''} ${d.holidays.length ? 'has-festival' : ''}`}
              onClick={() => handleDayClick(d)}
            >
              {!d.isEmpty && (
                <>
                  <span className="gregorian-day">{d.day}</span>
                  <span className="tithi-label">{d.hindu.tithiName[lang]}</span>
                  {d.hindu.isPurnima && <span className="moon-icon">🌕</span>}
                  {d.hindu.isAmavasya && <span className="moon-icon">🌑</span>}
                  {d.holidays.length > 0 && (
                    <div className="festival-label-truncated">
                      {d.holidays[0].name.substring(0, 8)}...
                    </div>
                  )}
                  {d.holidays.length > 0 && <div className="festival-indicator" />}
                </>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* Festival List Section */}
      <section className="festivals-section">
        <h2 className="section-title">
          <Info size={18} />
          {UI_LABELS[lang].thisMonthFestivals}
        </h2>
        <div className="festival-list">
          {festivalsThisMonth.length > 0 ? (
            festivalsThisMonth.map((d, i) => (
              <div key={i} className="festival-item" onClick={() => handleDayClick(d)}>
                <div className="festival-date-box">
                  <span className="day">{d.day}</span>
                  <span className="month">{GREGORIAN_MONTHS[lang][month].substring(0, 3)}</span>
                </div>
                <div className="festival-info">
                  <div className="festival-name">{d.holidays[0].name}</div>
                  <div className="festival-desc">{d.hindu.tithiName[lang]} • {HINDU_MONTHS[month][lang]}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>
              {UI_LABELS[lang].noFestivals}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Sheet Modal */}
      {isModalOpen && selectedDay && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="handle" />
            <div className="modal-header">
              <div className="modal-date">
                {selectedDay.day} {GREGORIAN_MONTHS[lang][month]} {year}
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-label">{UI_LABELS[lang].tithi}</div>
                <div className="detail-value">
                  {selectedDay.hindu.tithiName[lang]} 
                  {selectedDay.hindu.isPurnima ? ' (🌕 Full Moon)' : ''}
                  {selectedDay.hindu.isAmavasya ? ' (🌑 New Moon)' : ''}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">{UI_LABELS[lang].month}</div>
                <div className="detail-value">{HINDU_MONTHS[month][lang]}</div>
              </div>
              
              {selectedDay.holidays.length > 0 && (
                <div className="detail-row">
                  <div className="detail-label">{UI_LABELS[lang].festivals}</div>
                  {selectedDay.holidays.map((h, i) => (
                    <div key={i} className="festival-badge">{h.name}</div>
                  ))}
                  <p className="festival-desc" style={{marginTop: '0.5rem'}}>
                    {selectedDay.holidays[0].description || "Traditional Indian holiday celebration."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loader-full">
          <div className="spinner" />
          <p style={{marginTop: '1rem', fontWeight: 600}}>{UI_LABELS[lang].loading}</p>
        </div>
      )}

      <footer style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem'}}>
        🕉️ Saurabh's Indian Hindu Calendar • 2026
      </footer>
    </div>
  );
};

export default App;

