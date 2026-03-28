# MindSpace - Mental Health Support Platform for Students

A comprehensive mental health support platform built with React, TypeScript, and Supabase, designed specifically for students.

## ✨ Features

### Core Features
- 🏠 **Home Page** - Welcome experience with feature highlights
- 📚 **Resources** - Mental health articles organized by category
- 📝 **Self-Assessment** - Validated mental health assessment tools
- 👥 **Community** - Support groups, forums, events, and peer connections
- 🚨 **Crisis Support** - 24/7 helplines and emergency resources
- 👤 **User Profiles** - Personal accounts with privacy controls
- 📅 **Calendar System** - Event management and reminders

### Authentication & Privacy
- ✅ Full sign-up/sign-in system
- 🎭 Anonymous mode for privacy
- 🔒 Secure authentication with Supabase Auth
- 📱 Works in demo mode without backend (localStorage)

### Modern UI/UX
- 🎨 Glassmorphism effects
- ✨ Smooth animations with Motion
- 📱 Fully responsive design
- 🌈 Purple, pink, and blue gradient theme
- ♿ Accessible components

### Technical Features
- 🗄️ **Dual Mode Operation**:
  - **Demo Mode**: Works immediately with localStorage
  - **Backend Mode**: Full Supabase integration
- 🔄 Real-time updates (when backend is configured)
- 🎯 Type-safe with TypeScript
- 🚀 Fast performance with Vite
- 📊 Database with 12+ tables

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm

### Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Run in Demo Mode** (no setup required)
```bash
npm run dev
```

That's it! The app works immediately in demo mode, storing all data locally in your browser.

## 🔧 Backend Setup (Optional)

Want to enable cloud sync, real-time features, and multi-device access? See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

**Quick Summary:**
1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL setup script (provided in BACKEND_SETUP.md)
4. Add credentials to `.env` file:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
5. Restart the dev server

## 📁 Project Structure

```
mindspace/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Layout.tsx   # Main layout with navigation
│   │   │   ├── FloatingChatButton.tsx
│   │   │   ├── MoodTracker.tsx
│   │   │   └── UserCalendar.tsx
│   │   ├── contexts/        # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Assessment.tsx
│   │   │   ├── CommunityNew.tsx
│   │   │   ├── Crisis.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── BackendStatus.tsx
│   │   ├── routes.tsx      # React Router configuration
│   │   └── App.tsx         # Main app component
│   ├── lib/
│   │   └── supabase.ts     # Supabase client & types
│   ├── services/           # API service layer
│   │   ├── authService.ts
│   │   ├── resourceService.ts
│   │   ├── assessmentService.ts
│   │   ├── communityService.ts
│   │   ├── crisisService.ts
│   │   ├── moodService.ts
│   │   ├── chatService.ts
│   │   └── calendarService.ts
│   └── styles/            # Global styles
│       ├── theme.css
│       └── fonts.css
├── .env.example          # Environment variable template
├── BACKEND_SETUP.md      # Backend setup guide
├── package.json
└── README.md
```

## 🎯 Key Technologies

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner

## 📊 Database Schema

When backend is configured, the app uses these tables:
- `profiles` - User profiles and settings
- `resources` - Mental health articles
- `assessments` - Assessment definitions
- `assessment_results` - User assessment results
- `mood_entries` - Daily mood tracking
- `support_groups` - Community support groups
- `group_members` - Group membership
- `forum_topics` - Discussion forum topics
- `forum_replies` - Forum replies
- `events` - Community events
- `event_attendees` - Event registrations
- `crisis_resources` - Crisis support contacts
- `chat_messages` - Floating chat messages
- `user_calendar_events` - Personal calendar events

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication with Supabase Auth
- Anonymous mode for privacy-conscious users
- HTTPS-only connections in production
- Environment variables for sensitive data

## 🎨 Design System

**Colors:**
- Primary: Purple (#8b5cf6) to Pink (#ec4899)
- Accents: Blue (#3b82f6)
- Crisis: Red (#dc2626) to Orange (#f97316)

**Typography:**
- System font stack with fallbacks
- Responsive text sizing

**Spacing:**
- Consistent 4px base unit
- Tailwind spacing scale

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Netlify
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Other Platforms
Any static hosting service that supports Vite/React works:
- Cloudflare Pages
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 🧪 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌟 Key Features Explained

### Dual Mode Operation
The app intelligently switches between demo and backend mode:
- Checks for Supabase credentials on startup
- Falls back to localStorage if no backend
- Seamless experience in both modes
- Same UI/UX regardless of mode

### Anonymous Mode
Users can toggle anonymous mode to:
- Hide their name in community interactions
- Appear as "Anonymous User"
- Still access all features
- Privacy-first approach

### Mood Tracking
Daily mood tracking with:
- 10-point scale
- Optional notes
- Visual history chart
- Trend analysis

### Calendar System
Personal calendar for:
- Community events
- Personal reminders
- Counseling appointments
- Self-care activities

## 🤝 Contributing

This is a student mental health support platform. Contributions are welcome!

Areas for contribution:
- Additional mental health resources
- More assessment tools
- UI/UX improvements
- Accessibility enhancements
- Bug fixes

## 📄 License

This project is built for educational and support purposes.

## 🆘 Crisis Resources

If you or someone you know is in crisis:
- **US**: Call 988 (Suicide & Crisis Lifeline)
- **International**: Visit https://findahelpline.com

## 💬 Support

- Check `/backend-status` page for connection info
- Review `BACKEND_SETUP.md` for setup help
- Check browser console for error messages

## 🎓 About

MindSpace is designed to provide accessible, comprehensive mental health support for students. The platform emphasizes:
- Privacy and anonymity
- Peer support and community
- Evidence-based resources
- Crisis intervention
- Self-care tools

Built with ❤️ for student mental health and wellbeing.
