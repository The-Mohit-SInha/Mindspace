import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log configuration status for debugging
console.log('🔍 Supabase Configuration Check:');
console.log('  URL exists:', !!supabaseUrl);
console.log('  Key exists:', !!supabaseAnonKey);
console.log('  URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NOT SET');

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

console.log('  ✅ Backend Status:', isSupabaseConfigured ? 'CONNECTED' : 'DEMO MODE');

// Create a dummy client if not configured (for development)
const createSupabaseClient = () => {
  if (!isSupabaseConfigured) {
    // Running in demo mode - backend features will use mock data
    // No warning needed as the app works perfectly in demo mode
    
    // Return a dummy client to prevent errors
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
};

export const supabase = createSupabaseClient();
export const isBackendConfigured = isSupabaseConfigured;

// Helper function to check if backend is available
export const checkBackendAvailability = () => {
  if (!isSupabaseConfigured) {
    console.error(
      '❌ Backend not configured. Please set up Supabase.\n' +
      'See BACKEND_SETUP.md for instructions.'
    );
    return false;
  }
  return true;
};

// Database Types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          avatar_color: string;
          is_anonymous: boolean;
          bio: string | null;
          university: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          avatar_color?: string;
          is_anonymous?: boolean;
          bio?: string | null;
          university?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          avatar_color?: string;
          is_anonymous?: boolean;
          bio?: string | null;
          university?: string | null;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          category: string;
          title: string;
          description: string;
          content: string;
          image_url: string | null;
          author: string | null;
          read_time: number;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          questions: any;
          created_at: string;
          updated_at: string;
        };
      };
      assessment_results: {
        Row: {
          id: string;
          user_id: string;
          assessment_id: string;
          score: number;
          severity: string;
          answers: any;
          recommendations: any;
          created_at: string;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_value: number;
          note: string | null;
          created_at: string;
        };
      };
      support_groups: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          member_count: number;
          is_active: boolean;
          moderator_id: string;
          created_at: string;
          updated_at: string;
        };
      };
      group_members: {
        Row: {
          id: string;
          group_id: string;
          user_id: string;
          joined_at: string;
        };
      };
      forum_topics: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          author_name: string;
          category: string;
          views: number;
          replies_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      forum_replies: {
        Row: {
          id: string;
          topic_id: string;
          content: string;
          author_id: string;
          author_name: string;
          created_at: string;
          updated_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          type: string;
          organizer_id: string;
          attendee_count: number;
          max_attendees: number | null;
          created_at: string;
          updated_at: string;
        };
      };
      event_attendees: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          registered_at: string;
        };
      };
      crisis_resources: {
        Row: {
          id: string;
          title: string;
          type: string;
          phone: string | null;
          description: string;
          availability: string;
          is_emergency: boolean;
          created_at: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          sender_id: string;
          sender_name: string;
          message: string;
          is_anonymous: boolean;
          created_at: string;
        };
      };
      user_calendar_events: {
        Row: {
          id: string;
          user_id: string;
          event_id: string | null;
          title: string;
          description: string | null;
          start_date: string;
          start_time: string;
          end_date: string | null;
          end_time: string | null;
          location: string | null;
          event_type: string;
          color: string | null;
          reminder_enabled: boolean;
          reminder_minutes: number;
          is_all_day: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};