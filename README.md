# MindSpace - Mental Health Support Platform

A comprehensive mental health support platform for students with local data storage.

## Features

### 🎯 Core Features
- **Mental Health Resources** - Organized by category (Anxiety, Depression, Stress, General Wellness)
- **Self-Assessment Tools** - Validated questionnaires with instant results
- **Community Support** - Support groups, forums, peer support, and events
- **Crisis Support** - 24/7 helplines and emergency resources
- **Mood Tracker** - Daily mood logging with visual charts
- **Personal Calendar** - Track appointments, reminders, and wellness events
- **Anonymous Mode** - Optional privacy protection for community interactions

### 💾 Local Storage System
All user data is automatically stored in the browser's localStorage:
- User profiles and preferences
- Mood tracker entries
- Journal entries
- Assessment results
- Calendar events
- Saved resources
- Community activity

### 📦 Backup & Restore
- **Export**: Download all your data as a JSON file
- **Import**: Restore data from a previous backup
- **Storage Monitoring**: Real-time usage tracking in the header
- **Data Portability**: Transfer data between browsers/devices

## Getting Started

1. **Sign Up/Sign In** - Create an account or sign in
2. **Complete Profile** - Set up your profile (optional)
3. **Explore Resources** - Browse mental health resources
4. **Track Your Mood** - Log daily moods and see patterns
5. **Join Community** - Connect with others (anonymous mode available)

## Data Storage

### Local Storage
- All data is stored locally in your browser
- No external database required
- Data persists across sessions
- Maximum storage: ~5-10MB (browser-dependent)

### Important Notes
⚠️ **Data Safety**:
- Export backups regularly to avoid data loss
- Clearing browser data will delete your information
- Data is device/browser-specific unless exported

### Access Backup Settings
1. Go to **Profile** page
2. Click **Settings** tab
3. Scroll to **Local Backup System** section
4. Use Export/Import buttons as needed

## Privacy & Security

- ✅ All data stored locally on your device
- ✅ No data transmitted to external servers
- ✅ Anonymous mode available for community features
- ✅ Full control over your data with export/import

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Charts**: Chart.js + Recharts
- **Icons**: Lucide React
- **Storage**: Browser localStorage API

## Project Structure

```
/src
  /app
    /components      # Reusable UI components
    /contexts        # React contexts (Auth)
    /pages          # Page components
    /utils          # Utility functions (localStorage service)
  /styles           # Global styles and themes
```

## Key Components

- **LocalStorage Service** (`/src/app/utils/localStorage.ts`) - Centralized data management
- **BackupSettings** - Export/import/clear data interface
- **LocalBackupIndicator** - Real-time storage usage display
- **MoodTracker** - Daily mood logging with charts
- **UserCalendar** - Personal calendar for events
- **AuthContext** - User authentication and session management

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

*Requires localStorage API support*

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Support

For crisis support, visit the **Crisis Support** page for 24/7 helplines.

For general mental health resources, explore the **Resources** page.

---

**MindSpace** - Supporting student mental health, one step at a a time. 💜
