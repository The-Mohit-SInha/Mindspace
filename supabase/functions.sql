-- Additional Supabase Functions
-- Run these in your Supabase SQL Editor after running schema.sql

-- Function to increment helpful count on resources
CREATE OR REPLACE FUNCTION increment_helpful_count(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET helpful_count = helpful_count + 1 
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment view count on forum topics
CREATE OR REPLACE FUNCTION increment_topic_views(topic_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_topics 
  SET views = views + 1 
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's mood streak
CREATE OR REPLACE FUNCTION get_mood_streak(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_count INTEGER := 0;
  current_date DATE := CURRENT_DATE;
  has_entry BOOLEAN;
BEGIN
  LOOP
    SELECT EXISTS(
      SELECT 1 FROM mood_entries 
      WHERE user_id = user_uuid 
      AND DATE(created_at) = current_date
    ) INTO has_entry;
    
    IF NOT has_entry THEN
      EXIT;
    END IF;
    
    streak_count := streak_count + 1;
    current_date := current_date - INTERVAL '1 day';
  END LOOP;
  
  RETURN streak_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recommended resources based on assessment results
CREATE OR REPLACE FUNCTION get_recommended_resources(user_uuid UUID)
RETURNS TABLE(
  id UUID,
  category TEXT,
  title TEXT,
  description TEXT,
  read_time INTEGER,
  helpful_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT r.id, r.category, r.title, r.description, r.read_time, r.helpful_count
  FROM resources r
  WHERE r.category IN (
    SELECT DISTINCT a.category
    FROM assessment_results ar
    JOIN assessments a ON ar.assessment_id = a.id
    WHERE ar.user_id = user_uuid
    ORDER BY ar.created_at DESC
    LIMIT 3
  )
  ORDER BY r.helpful_count DESC, r.created_at DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user activity summary
CREATE OR REPLACE FUNCTION get_user_activity_summary(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'assessments_taken', (
      SELECT COUNT(*) FROM assessment_results WHERE user_id = user_uuid
    ),
    'mood_entries', (
      SELECT COUNT(*) FROM mood_entries WHERE user_id = user_uuid
    ),
    'groups_joined', (
      SELECT COUNT(*) FROM group_members WHERE user_id = user_uuid
    ),
    'forum_posts', (
      SELECT COUNT(*) FROM forum_topics WHERE author_id = user_uuid
    ),
    'forum_replies', (
      SELECT COUNT(*) FROM forum_replies WHERE author_id = user_uuid
    ),
    'events_registered', (
      SELECT COUNT(*) FROM event_attendees WHERE user_id = user_uuid
    ),
    'current_mood_streak', (
      SELECT get_mood_streak(user_uuid)
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old chat messages (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_messages()
RETURNS void AS $$
BEGIN
  DELETE FROM chat_messages 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get trending forum topics
CREATE OR REPLACE FUNCTION get_trending_topics(days_back INTEGER DEFAULT 7, result_limit INTEGER DEFAULT 10)
RETURNS TABLE(
  id UUID,
  title TEXT,
  category TEXT,
  views INTEGER,
  replies_count INTEGER,
  engagement_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    t.category,
    t.views,
    t.replies_count,
    (t.views + (t.replies_count * 3)) as engagement_score
  FROM forum_topics t
  WHERE t.created_at > NOW() - (days_back || ' days')::INTERVAL
  ORDER BY engagement_score DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to suggest support groups based on user interests
CREATE OR REPLACE FUNCTION suggest_support_groups(user_uuid UUID, result_limit INTEGER DEFAULT 5)
RETURNS TABLE(
  id UUID,
  name TEXT,
  description TEXT,
  category TEXT,
  member_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT sg.id, sg.name, sg.description, sg.category, sg.member_count
  FROM support_groups sg
  WHERE sg.is_active = true
  AND sg.id NOT IN (
    SELECT group_id FROM group_members WHERE user_id = user_uuid
  )
  AND (
    sg.category IN (
      SELECT DISTINCT a.category
      FROM assessment_results ar
      JOIN assessments a ON ar.assessment_id = a.id
      WHERE ar.user_id = user_uuid
      ORDER BY ar.created_at DESC
      LIMIT 3
    )
    OR sg.category = 'general'
  )
  ORDER BY sg.member_count DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION increment_helpful_count TO authenticated;
GRANT EXECUTE ON FUNCTION increment_topic_views TO authenticated;
GRANT EXECUTE ON FUNCTION get_mood_streak TO authenticated;
GRANT EXECUTE ON FUNCTION get_recommended_resources TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_activity_summary TO authenticated;
GRANT EXECUTE ON FUNCTION get_trending_topics TO authenticated;
GRANT EXECUTE ON FUNCTION suggest_support_groups TO authenticated;
