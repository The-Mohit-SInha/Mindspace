# MindSpace Backend Setup - Complete Guide

## ✅ Step 1: Environment Variables (COMPLETED)

The `.env` file has been created with your Supabase credentials:
- VITE_SUPABASE_URL: `https://pvmnhwbtkzlnigiuxvzf.supabase.co`
- VITE_SUPABASE_ANON_KEY: Configured ✅
- SUPABASE_SERVICE_ROLE_KEY: Configured ✅

## 🔥 Step 2: Database Setup (ACTION REQUIRED)

You need to run the SQL schemas in your Supabase dashboard to create all necessary tables.

### How to Access Supabase SQL Editor:

1. Go to: https://supabase.com/dashboard/project/pvmnhwbtkzlnigiuxvzf
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the SQL from the files below (in order)
5. Click "Run" for each query

### Run These SQL Files in Order:

#### 1. First: Create the KV Store Table
```sql
-- KV Store Table (Required for backend integration)
CREATE TABLE IF NOT EXISTS kv_store_1e942b60 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Grant permissions
GRANT ALL ON kv_store_1e942b60 TO authenticated;
GRANT ALL ON kv_store_1e942b60 TO service_role;
```

#### 2. Second: Run the Main Schema
Copy and paste the entire contents of `/supabase/schema.sql` into the SQL Editor and run it.
This creates:
- ✅ All 12 tables (profiles, resources, assessments, mood_entries, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Triggers for auto-updating timestamps

#### 3. Third: Run the Calendar Schema
Copy and paste the entire contents of `/supabase/calendar-schema.sql` into the SQL Editor and run it.
This creates:
- ✅ user_calendar_events table
- ✅ Calendar-specific functions
- ✅ RLS policies for calendar

#### 4. Fourth: Seed Initial Data (Optional but Recommended)
Copy and paste the entire contents of `/supabase/seed.sql` into the SQL Editor and run it.
This adds:
- ✅ Sample resources for all categories
- ✅ Sample crisis resources
- ✅ Sample events
- ✅ Sample assessments with questions

## 🧪 Step 3: Test the Connection

After running all SQL scripts, test your backend:

1. **In Browser Console** - Open your MindSpace app and check the console
   - Look for: `✅ Backend Status: CONNECTED`
   - Should NOT show: `DEMO MODE`

2. **Visit Backend Status Page** - Go to `/backend-status` in your app
   - Should show: "Backend Connected" (green indicator)
   - Should show database statistics

3. **Test API Endpoint** - Open this URL in your browser:
   ```
   https://pvmnhwbtkzlnigiuxvzf.supabase.co/functions/v1/make-server-1e942b60/health
   ```
   - Should return: `{"status":"ok","timestamp":"..."}`

4. **Test Database Connection** - Open this URL:
   ```
   https://pvmnhwbtkzlnigiuxvzf.supabase.co/functions/v1/make-server-1e942b60/test-db
   ```
   - Should return: `{"success":true,"message":"Database connection successful"}`

## 📋 What's Been Configured

### Backend Server (`/supabase/functions/server/index.tsx`)
✅ Complete REST API with 20+ endpoints:
- Profile management (GET, POST)
- Mood tracking (GET, POST)
- Resources (GET with filtering)
- Assessments (GET, POST)
- Support Groups (GET)
- Forum Topics (GET, POST)
- Events (GET)
- Calendar Events (GET, POST)
- Chat Messages (GET, POST)
- Crisis Resources (GET)
- Health check and DB test endpoints

### Frontend Configuration
✅ `.env` file created with all credentials
✅ Supabase client configured in `/src/lib/supabase.ts`
✅ All services support dual-mode (Demo/Backend)
✅ AuthContext integrated with Supabase Auth

### Database Schema
✅ 13 tables defined:
1. kv_store_1e942b60 (key-value store)
2. profiles
3. resources
4. assessments
5. assessment_results
6. mood_entries
7. support_groups
8. group_members
9. forum_topics
10. forum_replies
11. events
12. event_attendees
13. crisis_resources
14. chat_messages
15. user_calendar_events

## 🎯 Expected Behavior After Setup

### Before Database Setup:
- ❌ App shows "Demo Mode"
- ❌ Data stored in localStorage only
- ��� Data lost on page refresh

### After Database Setup:
- ✅ App shows "Backend Connected"
- ✅ Data persisted to Supabase
- ✅ Data survives page refresh
- ✅ Real-time data across devices
- ✅ Full authentication system works
- ✅ Multi-user support enabled

## 🚨 Troubleshooting

### If still showing "Demo Mode":
1. Check browser console for errors
2. Verify all SQL scripts ran without errors
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check that `.env` file exists in project root
5. Restart the development server

### If API errors occur:
1. Check Supabase dashboard logs
2. Verify RLS policies are created
3. Ensure service role key is correct
4. Check network tab for failed requests

### If tables don't exist:
1. Go to Supabase Dashboard → Database → Tables
2. Verify all 15 tables are listed
3. If missing, re-run the SQL scripts
4. Check for error messages in SQL Editor

## 📞 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/pvmnhwbtkzlnigiuxvzf
- **SQL Editor**: https://supabase.com/dashboard/project/pvmnhwbtkzlnigiuxvzf/sql
- **Database Tables**: https://supabase.com/dashboard/project/pvmnhwbtkzlnigiuxvzf/database/tables
- **Logs**: https://supabase.com/dashboard/project/pvmnhwbtkzlnigiuxvzf/logs/edge-functions
- **Backend Status Page**: http://localhost:5173/backend-status (when running locally)

## ✨ Next Steps After Setup

1. ✅ Test user registration and login
2. ✅ Create a profile and verify it saves
3. ✅ Add mood entries and check persistence
4. ✅ Create forum topics and verify they appear
5. ✅ Add events to calendar
6. ✅ Test chat functionality

Your MindSpace platform is now ready for full backend operation! 🎉
