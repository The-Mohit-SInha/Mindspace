-- ========================================
-- MindSpace Complete Database Initialization
-- Run this ENTIRE file in Supabase SQL Editor
-- ========================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. KV STORE TABLE (REQUIRED)
-- ========================================
CREATE TABLE IF NOT EXISTS kv_store_1e942b60 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

GRANT ALL ON kv_store_1e942b60 TO authenticated;
GRANT ALL ON kv_store_1e942b60 TO service_role;

-- ========================================
-- 2. MAIN APPLICATION TABLES
-- ========================================

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_color TEXT DEFAULT 'from-purple-500 to-pink-500',
  is_anonymous BOOLEAN DEFAULT false,
  bio TEXT,
  university TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  read_time INTEGER DEFAULT 5,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment Results Table
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  severity TEXT NOT NULL,
  answers JSONB NOT NULL,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood Entries Table
CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_value INTEGER NOT NULL CHECK (mood_value >= 1 AND mood_value <= 5),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support Groups Table
CREATE TABLE IF NOT EXISTS support_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  moderator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group Members Table
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES support_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Forum Topics Table
CREATE TABLE IF NOT EXISTS forum_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Replies Table
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  attendee_count INTEGER DEFAULT 0,
  max_attendees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Attendees Table
CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Crisis Resources Table
CREATE TABLE IF NOT EXISTS crisis_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  phone TEXT,
  description TEXT NOT NULL,
  availability TEXT NOT NULL,
  is_emergency BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Calendar Events Table
CREATE TABLE IF NOT EXISTS user_calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE,
  end_time TIME,
  location TEXT,
  event_type TEXT NOT NULL,
  color TEXT DEFAULT 'purple',
  reminder_enabled BOOLEAN DEFAULT true,
  reminder_minutes INTEGER DEFAULT 30,
  is_all_day BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- ========================================
-- 3. INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_category ON forum_topics(category);
CREATE INDEX IF NOT EXISTS idx_forum_replies_topic_id ON forum_replies(topic_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON event_attendees(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_user_id ON user_calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_date ON user_calendar_events(start_date);
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_event_id ON user_calendar_events(event_id);

-- ========================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_calendar_events ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 5. RLS POLICIES
-- ========================================

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Assessment Results Policies
DROP POLICY IF EXISTS "Users can view their own results" ON assessment_results;
DROP POLICY IF EXISTS "Users can insert their own results" ON assessment_results;

CREATE POLICY "Users can view their own results" ON assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own results" ON assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mood Entries Policies
DROP POLICY IF EXISTS "Users can view their own mood entries" ON mood_entries;
DROP POLICY IF EXISTS "Users can insert their own mood entries" ON mood_entries;

CREATE POLICY "Users can view their own mood entries" ON mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own mood entries" ON mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Group Members Policies
DROP POLICY IF EXISTS "Users can view all group members" ON group_members;
DROP POLICY IF EXISTS "Users can insert themselves as group members" ON group_members;
DROP POLICY IF EXISTS "Users can remove themselves from groups" ON group_members;

CREATE POLICY "Users can view all group members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Users can insert themselves as group members" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove themselves from groups" ON group_members FOR DELETE USING (auth.uid() = user_id);

-- Forum Topics Policies
DROP POLICY IF EXISTS "Anyone can view forum topics" ON forum_topics;
DROP POLICY IF EXISTS "Authenticated users can create topics" ON forum_topics;
DROP POLICY IF EXISTS "Users can update their own topics" ON forum_topics;
DROP POLICY IF EXISTS "Users can delete their own topics" ON forum_topics;

CREATE POLICY "Anyone can view forum topics" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own topics" ON forum_topics FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own topics" ON forum_topics FOR DELETE USING (auth.uid() = author_id);

-- Forum Replies Policies
DROP POLICY IF EXISTS "Anyone can view forum replies" ON forum_replies;
DROP POLICY IF EXISTS "Authenticated users can create replies" ON forum_replies;
DROP POLICY IF EXISTS "Users can update their own replies" ON forum_replies;
DROP POLICY IF EXISTS "Users can delete their own replies" ON forum_replies;

CREATE POLICY "Anyone can view forum replies" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own replies" ON forum_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own replies" ON forum_replies FOR DELETE USING (auth.uid() = author_id);

-- Events Policies
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;
DROP POLICY IF EXISTS "Organizers can update their events" ON events;

CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their events" ON events FOR UPDATE USING (auth.uid() = organizer_id);

-- Event Attendees Policies
DROP POLICY IF EXISTS "Anyone can view event attendees" ON event_attendees;
DROP POLICY IF EXISTS "Users can register for events" ON event_attendees;
DROP POLICY IF EXISTS "Users can unregister from events" ON event_attendees;

CREATE POLICY "Anyone can view event attendees" ON event_attendees FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unregister from events" ON event_attendees FOR DELETE USING (auth.uid() = user_id);

-- Chat Messages Policies
DROP POLICY IF EXISTS "Users can view all chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Authenticated users can send messages" ON chat_messages;

CREATE POLICY "Users can view all chat messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can send messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- User Calendar Events Policies
DROP POLICY IF EXISTS "Users can view their own calendar events" ON user_calendar_events;
DROP POLICY IF EXISTS "Users can insert their own calendar events" ON user_calendar_events;
DROP POLICY IF EXISTS "Users can update their own calendar events" ON user_calendar_events;
DROP POLICY IF EXISTS "Users can delete their own calendar events" ON user_calendar_events;

CREATE POLICY "Users can view their own calendar events" ON user_calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own calendar events" ON user_calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own calendar events" ON user_calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own calendar events" ON user_calendar_events FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- 6. FUNCTIONS AND TRIGGERS
-- ========================================

-- Function for updating updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_resources_updated_at ON resources;
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessments_updated_at ON assessments;
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_support_groups_updated_at ON support_groups;
CREATE TRIGGER update_support_groups_updated_at BEFORE UPDATE ON support_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_forum_topics_updated_at ON forum_topics;
CREATE TRIGGER update_forum_topics_updated_at BEFORE UPDATE ON forum_topics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_calendar_events_updated_at ON user_calendar_events;
CREATE TRIGGER update_user_calendar_events_updated_at BEFORE UPDATE ON user_calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment member count
CREATE OR REPLACE FUNCTION increment_member_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE support_groups SET member_count = member_count + 1 WHERE id = NEW.group_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS increment_group_members ON group_members;
CREATE TRIGGER increment_group_members AFTER INSERT ON group_members
  FOR EACH ROW EXECUTE FUNCTION increment_member_count();

-- Function to decrement member count
CREATE OR REPLACE FUNCTION decrement_member_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE support_groups SET member_count = member_count - 1 WHERE id = OLD.group_id;
  RETURN OLD;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS decrement_group_members ON group_members;
CREATE TRIGGER decrement_group_members AFTER DELETE ON group_members
  FOR EACH ROW EXECUTE FUNCTION decrement_member_count();

-- Function to increment replies count
CREATE OR REPLACE FUNCTION increment_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE forum_topics SET replies_count = replies_count + 1 WHERE id = NEW.topic_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS increment_topic_replies ON forum_replies;
CREATE TRIGGER increment_topic_replies AFTER INSERT ON forum_replies
  FOR EACH ROW EXECUTE FUNCTION increment_replies_count();

-- Function to increment attendee count
CREATE OR REPLACE FUNCTION increment_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events SET attendee_count = attendee_count + 1 WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS increment_event_attendees ON event_attendees;
CREATE TRIGGER increment_event_attendees AFTER INSERT ON event_attendees
  FOR EACH ROW EXECUTE FUNCTION increment_attendee_count();

-- Function to decrement attendee count
CREATE OR REPLACE FUNCTION decrement_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events SET attendee_count = attendee_count - 1 WHERE id = OLD.event_id;
  RETURN OLD;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS decrement_event_attendees ON event_attendees;
CREATE TRIGGER decrement_event_attendees AFTER DELETE ON event_attendees
  FOR EACH ROW EXECUTE FUNCTION decrement_attendee_count();

-- Calendar helper functions
CREATE OR REPLACE FUNCTION get_upcoming_calendar_events(
  user_uuid UUID,
  days_ahead INTEGER DEFAULT 30
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  start_date DATE,
  start_time TIME,
  end_date DATE,
  end_time TIME,
  location TEXT,
  event_type TEXT,
  color TEXT,
  is_all_day BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ce.id,
    ce.title,
    ce.description,
    ce.start_date,
    ce.start_time,
    ce.end_date,
    ce.end_time,
    ce.location,
    ce.event_type,
    ce.color,
    ce.is_all_day
  FROM user_calendar_events ce
  WHERE ce.user_id = user_uuid
    AND ce.start_date >= CURRENT_DATE
    AND ce.start_date <= CURRENT_DATE + (days_ahead || ' days')::INTERVAL
  ORDER BY ce.start_date ASC, ce.start_time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_calendar_events_by_month(
  user_uuid UUID,
  target_year INTEGER,
  target_month INTEGER
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  start_date DATE,
  start_time TIME,
  end_date DATE,
  end_time TIME,
  location TEXT,
  event_type TEXT,
  color TEXT,
  is_all_day BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ce.id,
    ce.title,
    ce.description,
    ce.start_date,
    ce.start_time,
    ce.end_date,
    ce.end_time,
    ce.location,
    ce.event_type,
    ce.color,
    ce.is_all_day
  FROM user_calendar_events ce
  WHERE ce.user_id = user_uuid
    AND EXTRACT(YEAR FROM ce.start_date) = target_year
    AND EXTRACT(MONTH FROM ce.start_date) = target_month
  ORDER BY ce.start_date ASC, ce.start_time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_upcoming_calendar_events TO authenticated;
GRANT EXECUTE ON FUNCTION get_calendar_events_by_month TO authenticated;

-- ========================================
-- ✅ SETUP COMPLETE!
-- ========================================
-- Next: Run the seed.sql file to populate with sample data
