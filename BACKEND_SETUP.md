# MindSpace Backend Setup Guide

This guide will help you set up the complete backend infrastructure for the MindSpace mental health platform using Supabase.

## Prerequisites

- A Supabase account (https://supabase.com)
- Node.js and npm installed
- The MindSpace frontend application

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization (Mohit Sinha's organization)
4. Fill in the project details:
   - **Project Name**: MindSpace
   - **Database Password**: (Create a strong password and save it)
   - **Region**: (Choose the closest region to your users)
5. Click "Create new project"
6. Wait for the project to be provisioned (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: This is your `VITE_SUPABASE_URL`
   - **anon public key**: This is your `VITE_SUPABASE_ANON_KEY`

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace the placeholder values with your actual Supabase credentials

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `/supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the script

This will create:
- All database tables (profiles, resources, assessments, etc.)
- Row Level Security (RLS) policies
- Indexes for better performance
- Triggers for automatic updates
- Helper functions

## Step 5: Seed the Database (Optional but Recommended)

1. In the SQL Editor, create another new query
2. Copy the entire contents of `/supabase/seed.sql`
3. Paste it into the SQL editor
4. Click "Run" to execute the script

This will populate your database with:
- Sample mental health resources
- Pre-built assessment tools (GAD-7, PHQ-9, etc.)
- Support groups
- Crisis resources
- Sample forum topics
- Upcoming events

## Step 6: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation and password reset emails

## Step 7: Configure Storage (Optional)

If you want to allow users to upload profile pictures or other media:

1. Go to **Storage**
2. Create a new bucket called `avatars`
3. Set the bucket to **Public**
4. Add storage policies as needed

## Step 8: Set Up Real-time Subscriptions

Real-time is already enabled by default for:
- Chat messages
- Forum topics and replies
- Support group updates

No additional configuration needed!

## Step 9: Test the Backend

1. Start your development server:
```bash
npm run dev
```

2. Try the following actions:
   - ✅ Sign up with a new account
   - ✅ Sign in with your credentials
   - ✅ Update your profile
   - ✅ Browse resources
   - ✅ Take an assessment
   - ✅ Track your mood
   - ✅ Join a support group
   - ✅ Create a forum topic
   - ✅ Register for an event

## Database Schema Overview

### Core Tables

**profiles**
- Stores user profile information
- Links to auth.users
- Includes anonymous mode toggle

**resources**
- Mental health articles and guides
- Categorized by topic (anxiety, depression, stress, wellbeing, sleep)

**assessments**
- Self-assessment questionnaires
- Questions stored as JSONB

**assessment_results**
- User assessment history
- Includes score, severity, and personalized recommendations

**mood_entries**
- Daily mood tracking
- Mood value (1-5) with optional notes

**support_groups**
- Community support groups
- Tracks member count automatically

**group_members**
- Many-to-many relationship between users and groups

**forum_topics** & **forum_replies**
- Community forum functionality
- View count and reply count tracking

**events**
- Wellness events and workshops
- Attendee registration with capacity limits

**event_attendees**
- Many-to-many relationship for event registration

**crisis_resources**
- Emergency hotlines and resources
- Available 24/7

**chat_messages**
- Anonymous support chat
- Real-time messaging capability

## Security Features

### Row Level Security (RLS)

All sensitive tables have RLS enabled:

- Users can only view/edit their own data
- Public resources are readable by everyone
- Community features are accessible to authenticated users
- Anonymous posting is supported where appropriate

### Authentication

- Secure JWT-based authentication
- Session persistence
- Password reset functionality
- Email confirmation (can be disabled for development)

## API Services

The frontend includes comprehensive service files:

- **authService.ts**: User authentication and profile management
- **resourceService.ts**: Mental health resources
- **assessmentService.ts**: Self-assessment tools
- **moodService.ts**: Mood tracking
- **communityService.ts**: Forums, groups, and events
- **crisisService.ts**: Crisis resources
- **chatService.ts**: Real-time messaging

## Backend Features

✅ **User Authentication**
- Sign up / Sign in
- Profile management
- Anonymous mode
- Password reset

✅ **Resources**
- Browse by category
- Search functionality
- Mark as helpful

✅ **Assessments**
- Take standardized assessments
- View results history
- Get personalized recommendations

✅ **Mood Tracking**
- Daily mood entries
- Historical data visualization
- Trend analysis

✅ **Community**
- Support groups with membership
- Forum topics and replies
- Event creation and registration
- Real-time updates

✅ **Crisis Support**
- 24/7 hotlines
- Emergency resources
- Campus resources

✅ **Real-time Chat**
- Anonymous messaging
- Live updates
- Support conversations

## Troubleshooting

### Can't connect to Supabase?
- Check your environment variables
- Make sure `.env` is in the root directory
- Verify your API keys in the Supabase dashboard

### RLS errors?
- Make sure the schema.sql was executed successfully
- Check that you're authenticated when trying to access protected resources

### Data not showing up?
- Run the seed.sql script to populate sample data
- Check the browser console for errors
- Verify the table names match your queries

### Real-time not working?
- Check that Realtime is enabled in your Supabase project settings
- Make sure you're subscribed to the correct channel

## Production Deployment

Before deploying to production:

1. ✅ Change default passwords
2. ✅ Enable email confirmation
3. ✅ Set up proper CORS policies
4. ✅ Configure rate limiting
5. ✅ Add monitoring and alerts
6. ✅ Set up database backups
7. ✅ Review and tighten RLS policies
8. ✅ Add analytics (optional)

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **Database queries**: Check the Supabase SQL Editor logs
- **Authentication**: Review Supabase Auth documentation

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

---

**Your MindSpace backend is now fully configured and ready to use! 🎉**
