# 🕉️ Indian Hindu Calendar (Premium Mobile-First)

A modern, responsive web application displaying the Indian Hindu calendar with live festival data, Tithi names, and lunar phases.

## ✨ Features

- **Mobile-First UX**: Optimized for 360px-430px widths with a centered layout on desktop.
- **Hindu Calendar Details**:
  - Displays Tithi for each day (e.g., Pratipada, Ekadashi).
  - Visual lunar phase indicators (🌕 for Purnima, 🌑 for Amavasya).
  - Hindu month names in the header.
- **Interactive Details**: Tap any date to open a **Bottom Sheet** with full details.
- **Festival Integration**: Live fetching of Indian festivals via Calendarific API.
- **Navigation**: Support for swipe gestures (Left/Right) and traditional buttons.
- **Festival List**: Chronological list of festivals for the current month.
- **Bi-lingual Support**: Full support for **English** and **हिन्दी**.
- **Dark/Light Mode**: Premium glassmorphism design with theme switching.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+) installed.

### 2. Installation
```bash
npm install
```

### 3. API Setup
The app uses the **Calendarific API** for festival data.
1. Sign up at [calendarific.com](https://calendarific.com/).
2. Open `src/App.tsx`.
3. Locate `API_KEY` on line 7 and replace it with your key.

### 4. Run Locally
```bash
npm run dev
```

## 🛠️ Tech Stack
- **React 19**
- **Vite**
- **TypeScript**
- **Vanilla CSS** (Custom Design System)
- **Lucide React** (Icons)
- **Axios** (API Requests)

## 📅 Approximations
- **Tithi Logic**: Uses a reference point (Dec 21, 2025) and lunar cycle calculations to approximate Tithis.
- **Hindu Months**: Mapped based on the current Gregorian month.

---
Built with ❤️ for a seamless Indian Calendar experience.

