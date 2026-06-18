# UCJM — Unity In Christ Jesus Ministries

Deepen your faith. Strengthen your worship.

A cross-platform mobile (iOS/Android) and web application for daily Bible reading, discipleship tracking, and worship chord memorization.

---

## Features

### 📖 Daily Bible Reading Plans
- Structured daily reading plans with progress tracking
- Life-area tagging — select predefined areas (Trusting the Lord, Patience, Joy, Peace, etc.) or create custom ones
- In-app Bible reader with multiple translations via a free Bible API
- Reading streaks and consistency tracking

### 👥 Discipleship & Cell Groups
- Leaders create **Cell Groups** with unique invite codes
- Leaders can rename their Cell Group at any time
- Leaders view each member's daily reading progress
- Members join groups via invite code to stay accountable

### 🎵 Chord & Lyrics Library
- A searchable library of worship songs with chords alongside lyrics
- Admin-seeded content with popular worship songs
- Designed to help musicians memorize chord progressions quickly

### 🎨 Sky-Inspired Design
- Gradients and colors drawn from sunrise, daytime, sunset, and night skies
- Warm golds, soft blues, deep purples — a calming, worshipful atmosphere

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev) + [Expo](https://expo.dev) |
| Styling | [NativeWind](https://nativewind.dev) (Tailwind CSS for RN) |
| Gradients | `expo-linear-gradient` |
| Backend & Auth | [Supabase](https://supabase.com) (PostgreSQL, Auth, RLS) |
| Auth Providers | Email/Password, Google, Apple, Facebook |
| Bible API | [Free Use Bible API](https://bible.helloao.org) (1250+ translations, no key required) |
| Chords Data | Custom Supabase-backed song library (admin-seeded) |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- A **Supabase** account (free tier)
- (iOS) Xcode for iOS simulator
- (Android) Android Studio for Android emulator

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd "UCJM APP"

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

Edit `.env` with your Supabase project credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Run the App

```bash
# Start the Expo development server
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or `w` for web browser.

---

## Project Structure

```
UCJM APP/
├── src/
│   ├── app/              # App entry, navigation
│   ├── screens/          # Screen-level components
│   │   ├── auth/         # Login, register, onboarding
│   │   ├── bible/        # Bible reader screen
│   │   ├── plans/        # Reading plans screens
│   │   ├── chords/       # Chord & lyrics library
│   │   └── groups/       # Cell group management
│   ├── components/       # Reusable UI components
│   ├── features/
│   │   ├── reading-plans/ # Reading plan logic
│   │   ├── bible/         # Bible API integration
│   │   ├── chords/        # Song library logic
│   │   └── cell-groups/   # Group management logic
│   ├── lib/              # Supabase client, utilities
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   └── styles/           # Theme colors, global styles
├── supabase/
│   └── migrations/       # Database schema migrations
├── app.json              # Expo configuration
├── tailwind.config.js    # NativeWind / Tailwind config
└── .env                  # Environment variables
```

---

## Database Schema (High-Level)

- **users** — Supabase Auth managed, with profile extensions
- **cell_groups** — id, name, leader_id, invite_code, created_at
- **cell_members** — group_id, user_id, role (leader/member)
- **life_areas** — id, name, is_predefined, created_by
- **reading_plans** — id, title, description, duration_days, life_area_id, created_by
- **reading_logs** — id, user_id, date, passage, plan_id, completed
- **songs** — id, title, artist, key, lyrics_with_chords, category, created_by

---

## Contributing

This project is in early development. If you'd like to contribute, please open an issue or pull request.

---

## License

MIT
# UCJM-APP
