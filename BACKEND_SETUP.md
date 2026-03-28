# MindSpace Backend Setup Guide

## Overview
MindSpace supports two modes:
- **Demo Mode**: Uses localStorage (no backend required) - Works out of the box
- **Backend Mode**: Uses Supabase for full functionality with database persistence

## Quick Start (Demo Mode)
The app works immediately in demo mode. Just run:
```bash
npm run dev
```

All data is stored locally in your browser. Perfect for testing and development!

## Backend Setup (Production Mode)

### Prerequisites
- A Supabase account (free tier available at https://supabase.com)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Create a new project
   - Choose a name (e.g., "mindspace-prod")
   - Set a strong database password
   - Select your region
   - Wait for the project to be created (~2 minutes)

### Step 2: Create Database Tables

Copy and run this SQL in your Supabase SQL Editor (Database > SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_color TEXT DEFAULT 'from-purple-500 to-pink-500',
  is_anonymous BOOLEAN DEFAULT false,
  bio TEXT,
  university TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources table
CREATE TABLE resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  read_time INTEGER DEFAULT 5,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessment results table
CREATE TABLE assessment_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  severity TEXT NOT NULL,
  answers JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mood entries table
CREATE TABLE mood_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_value INTEGER NOT NULL CHECK (mood_value >= 1 AND mood_value <= 10),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Support groups table
CREATE TABLE support_groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  moderator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group members table
CREATE TABLE group_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES support_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Forum topics table
CREATE TABLE forum_topics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum replies table
CREATE TABLE forum_replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  attendee_count INTEGER DEFAULT 0,
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event attendees table
CREATE TABLE event_attendees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Crisis resources table
CREATE TABLE crisis_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  phone TEXT,
  description TEXT NOT NULL,
  availability TEXT NOT NULL,
  is_emergency BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages table  
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User calendar events table
CREATE TABLE user_calendar_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE,
  end_time TIME,
  location TEXT,
  event_type TEXT NOT NULL,
  color TEXT DEFAULT '#8b5cf6',
  reminder_enabled BOOLEAN DEFAULT true,
  reminder_minutes INTEGER DEFAULT 30,
  is_all_day BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON mood_entries(created_at);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_forum_topics_category ON forum_topics(category);
CREATE INDEX idx_forum_replies_topic_id ON forum_replies(topic_id);
CREATE INDEX idx_event_attendees_user_id ON event_attendees(user_id);
CREATE INDEX idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX idx_user_calendar_events_user_id ON user_calendar_events(user_id);
CREATE INDEX idx_user_calendar_events_start_date ON user_calendar_events(start_date);

-- Helper functions
CREATE OR REPLACE FUNCTION increment_helpful_count(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources
  SET helpful_count = helpful_count + 1
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_topic_views(topic_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_topics
  SET views = views + 1
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_groups_updated_at BEFORE UPDATE ON support_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_topics_updated_at BEFORE UPDATE ON forum_topics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_calendar_events_updated_at BEFORE UPDATE ON user_calendar_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Set Up Row Level Security (RLS)

Run this SQL to enable RLS policies:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_calendar_events ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, but only update their own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Resources: Public read access
CREATE POLICY "Resources are viewable by everyone" ON resources FOR SELECT USING (true);

-- Assessments: Public read access
CREATE POLICY "Assessments are viewable by everyone" ON assessments FOR SELECT USING (true);

-- Assessment results: Users can only see and create their own
CREATE POLICY "Users can view own results" ON assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mood entries: Users can only see and create their own
CREATE POLICY "Users can view own mood entries" ON mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own mood entries" ON mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own mood entries" ON mood_entries FOR DELETE USING (auth.uid() = user_id);

-- Support groups: Public read, authenticated write
CREATE POLICY "Support groups are viewable by everyone" ON support_groups FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create groups" ON support_groups FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Group members: Users can see all, manage their own
CREATE POLICY "Group members are viewable by everyone" ON group_members FOR SELECT USING (true);
CREATE POLICY "Users can join groups" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON group_members FOR DELETE USING (auth.uid() = user_id);

-- Forum topics: Public read, authenticated write
CREATE POLICY "Forum topics are viewable by everyone" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics" ON forum_topics FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own topics" ON forum_topics FOR UPDATE USING (auth.uid() = author_id);

-- Forum replies: Public read, authenticated write
CREATE POLICY "Forum replies are viewable by everyone" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own replies" ON forum_replies FOR UPDATE USING (auth.uid() = author_id);

-- Events: Public read, authenticated write
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Event attendees: Public read, users manage their own
CREATE POLICY "Event attendees are viewable by everyone" ON event_attendees FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unregister from events" ON event_attendees FOR DELETE USING (auth.uid() = user_id);

-- Crisis resources: Public read only
CREATE POLICY "Crisis resources are viewable by everyone" ON crisis_resources FOR SELECT USING (true);

-- Chat messages: Authenticated users can read and write
CREATE POLICY "Chat messages are viewable by authenticated users" ON chat_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can send messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- User calendar events: Users can only see and manage their own
CREATE POLICY "Users can view own calendar events" ON user_calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own calendar events" ON user_calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own calendar events" ON user_calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own calendar events" ON user_calendar_events FOR DELETE USING (auth.uid() = user_id);
```

### Step 4: Add Sample Data (Optional)

```sql
-- Insert sample resources
INSERT INTO resources (category, title, description, content, read_time, helpful_count) VALUES
('stress', 'Managing Academic Stress', 'Practical strategies for handling coursework pressure', 'Full content here...', 8, 42),
('anxiety', 'Understanding Anxiety', 'Learn about anxiety symptoms and coping techniques', 'Full content here...', 10, 38),
('depression', 'Recognizing Depression', 'Signs, symptoms, and when to seek help', 'Full content here...', 12, 35);

-- Insert sample support groups
INSERT INTO support_groups (name, description, category, member_count) VALUES
('Study Stress Support', 'A safe space for students dealing with academic pressure', 'Stress Management', 24),
('Anxiety Warriors', 'Supporting each other through anxiety challenges', 'Anxiety', 31),
('Mindful Moments', 'Practice mindfulness and meditation together', 'Mindfulness', 18);

-- Insert sample crisis resources
INSERT INTO crisis_resources (title, type, phone, description, availability, is_emergency) VALUES
('988 Suicide & Crisis Lifeline', 'Call or Text', '988', 'Free and confidential support for people in distress', '24/7', true),
('Crisis Text Line', 'Text', '741741', 'Text HOME to 741741 for free crisis support', '24/7', true);
```

### Step 5: Configure Environment Variables

1. In your Supabase project, go to **Settings > API**
2. Copy your **Project URL** and **anon public** key
3. Create a `.env` file in your project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Restart your development server:
```bash
npm run dev
```

### Step 6: Enable Authentication

1. Go to **Authentication > Providers** in Supabase
2. Enable **Email** provider
3. Configure email templates (optional but recommended):
   - Go to **Authentication > Email Templates**
   - Customize confirmation and password reset emails

## Verification

Once configured, your app will automatically:
- Use Supabase for authentication
- Store all data in the database
- Enable real-time features
- Sync across devices

To verify it's working:
1. Sign up for a new account
2. Check your Supabase **Authentication > Users** - you should see the new user
3. Check **Database > profiles** table - profile should be created
4. Try creating content (forum posts, mood entries) and verify in database

## Switching Modes

The app automatically detects if Supabase is configured:
- **With .env file**: Uses Supabase backend
- **Without .env file**: Uses demo mode with localStorage

You can switch anytime by adding/removing the .env file and restarting.

## Troubleshooting

### "Failed to connect to Supabase"
- Verify your URL and anon key are correct
- Check if your Supabase project is active
- Ensure .env file is in the project root

### "Permission denied" errors
- Review RLS policies in Step 3
- Check that authentication is enabled
- Verify user is signed in

### Tables not found
- Ensure all SQL from Step 2 was executed
- Check for any SQL errors in Supabase logs
- Verify tables exist in **Database > Tables**

## Production Deployment

For production:
1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Never commit `.env` file to git
3. Use Supabase's production instance
4. Enable additional security features in Supabase settings

## Support

- Supabase Docs: https://supabase.com/docs
- MindSpace is designed to work perfectly in both demo and backend mode
- For issues, check browser console for detailed error messages
