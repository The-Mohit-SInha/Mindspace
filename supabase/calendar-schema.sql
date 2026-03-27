-- Calendar Events Extension for MindSpace
-- Add this to your existing Supabase database

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
  event_type TEXT NOT NULL, -- 'wellness_event', 'personal', 'reminder', 'appointment'
  color TEXT DEFAULT 'purple',
  reminder_enabled BOOLEAN DEFAULT true,
  reminder_minutes INTEGER DEFAULT 30, -- Minutes before event to remind
  is_all_day BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id) -- Prevent duplicate event additions
);

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_user_id ON user_calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_date ON user_calendar_events(start_date);
CREATE INDEX IF NOT EXISTS idx_user_calendar_events_event_id ON user_calendar_events(event_id);

-- Enable RLS
ALTER TABLE user_calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own calendar events" 
  ON user_calendar_events FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar events" 
  ON user_calendar_events FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar events" 
  ON user_calendar_events FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar events" 
  ON user_calendar_events FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_calendar_events_updated_at 
  BEFORE UPDATE ON user_calendar_events
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to get upcoming events for a user
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

-- Function to get events for a specific month
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
