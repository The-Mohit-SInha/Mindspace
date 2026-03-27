# MindSpace Backend

Complete backend infrastructure for the MindSpace mental health support platform, powered by Supabase.

## 🚀 Quick Start

1. **Set up Supabase Project**
   ```bash
   # Follow instructions in BACKEND_SETUP.md
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📁 Backend Structure

```
/supabase/
  ├── schema.sql          # Database tables, RLS policies, triggers
  ├── functions.sql       # Custom PostgreSQL functions
  └── seed.sql           # Sample data for development

/src/
  ├── lib/
  │   └── supabase.ts    # Supabase client configuration
  ├── services/
  │   ├── authService.ts       # Authentication & user management
  │   ├── resourceService.ts   # Mental health resources
  │   ├── assessmentService.ts # Self-assessment tools
  │   ├── moodService.ts       # Mood tracking
  │   ├── communityService.ts  # Forums, groups, events
  │   ├── crisisService.ts     # Crisis resources
  │   └── chatService.ts       # Real-time chat
  └── examples/
      └── backend-integration-examples.tsx
```

## 🗄️ Database Schema

### Core Tables

- **profiles**: User profile information and settings
- **resources**: Mental health articles and guides
- **assessments**: Self-assessment questionnaires
- **assessment_results**: User assessment history
- **mood_entries**: Daily mood tracking data
- **support_groups**: Community support groups
- **group_members**: Group membership records
- **forum_topics**: Community discussion topics
- **forum_replies**: Forum topic responses
- **events**: Wellness events and workshops
- **event_attendees**: Event registration records
- **crisis_resources**: Emergency hotlines and resources
- **chat_messages**: Anonymous support chat messages

## 🔐 Security Features

- ✅ **Row Level Security (RLS)** on all sensitive tables
- ✅ **JWT Authentication** via Supabase Auth
- ✅ **Encrypted passwords** using bcrypt
- ✅ **Anonymous mode** for privacy-sensitive features
- ✅ **Rate limiting** via Supabase
- ✅ **SQL injection protection** via parameterized queries

## 🎯 Features

### Authentication
- Email/password authentication
- Profile management
- Anonymous mode toggle
- Password reset
- Session persistence

### Resources
- Browse mental health resources
- Filter by category (anxiety, depression, stress, wellbeing, sleep)
- Search functionality
- Mark resources as helpful
- Track popular resources

### Assessments
- Pre-built clinical assessments (GAD-7, PHQ-9)
- Custom assessment builder
- Result history tracking
- Severity calculation
- Personalized recommendations

### Mood Tracking
- Daily mood entries
- Historical data visualization
- Mood statistics (average, trend, streak)
- Note-taking capability
- 7-day and 30-day views

### Community
- **Support Groups**: Join topic-specific groups
- **Forums**: Create topics and reply to discussions
- **Events**: Wellness events with registration
- **Real-time Updates**: Live notifications

### Crisis Support
- 24/7 hotlines database
- Emergency resources
- Campus counseling info
- Categorized by urgency

### Chat
- Anonymous peer support
- Real-time messaging
- Auto-scrolling
- Message history

## 📡 API Services

All services include:
- ✅ Type safety with TypeScript
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Toast notifications
- ✅ Automatic retries for failed requests

### Example Usage

```typescript
import { getAllResources } from './services/resourceService';

// Get all resources
const resources = await getAllResources();

// Get resources by category
const anxietyResources = await getResourcesByCategory('anxiety');

// Mark resource as helpful
await markResourceHelpful(resourceId);
```

See `/src/examples/backend-integration-examples.tsx` for more examples.

## 🔄 Real-time Features

Supabase provides real-time subscriptions for:

```typescript
// Subscribe to chat messages
const subscription = subscribeToMessages((message) => {
  console.log('New message:', message);
});

// Subscribe to forum replies
const forumSub = supabase
  .channel('forum-changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'forum_replies'
  }, (payload) => {
    console.log('New reply:', payload);
  })
  .subscribe();
```

## 🧪 Testing

### Test Authentication
```typescript
// Sign up
await signUp({
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User'
});

// Sign in
await signIn({
  email: 'test@example.com',
  password: 'password123'
});
```

### Test Resources
```typescript
const resources = await getAllResources();
console.log(`Loaded ${resources.length} resources`);
```

### Test Mood Tracking
```typescript
await saveMoodEntry(userId, 4, 'Feeling good today!');
const history = await getUserMoodHistory(userId, 7);
```

## 📊 Database Functions

Advanced PostgreSQL functions for analytics:

```typescript
// Get mood streak
const streak = await supabase.rpc('get_mood_streak', { user_uuid: userId });

// Get personalized recommendations
const recommended = await supabase.rpc('get_recommended_resources', { user_uuid: userId });

// Get activity summary
const summary = await supabase.rpc('get_user_activity_summary', { user_uuid: userId });

// Get trending topics
const trending = await supabase.rpc('get_trending_topics', { days_back: 7 });
```

## 🚀 Performance Optimization

- ✅ Indexed columns for fast queries
- ✅ Automatic connection pooling
- ✅ Optimized RLS policies
- ✅ Materialized views for complex queries
- ✅ Query result caching
- ✅ Lazy loading for large datasets

## 📝 Environment Variables

Required:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Never commit:
- ❌ Service role keys
- ❌ Database passwords
- ❌ Private API keys

## 🛠️ Development

### Adding a New Table

1. Add SQL to `/supabase/schema.sql`
2. Add TypeScript type to `/src/lib/supabase.ts`
3. Create service file in `/src/services/`
4. Add RLS policies
5. Test thoroughly

### Adding a New Feature

1. Design database schema
2. Create migration
3. Build service functions
4. Add TypeScript types
5. Implement frontend integration
6. Test and document

## 📚 Documentation

- [Backend Setup Guide](BACKEND_SETUP.md) - Complete setup instructions
- [API Documentation](API_DOCUMENTATION.md) - Full API reference
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Pre-launch checklist

## 🐛 Troubleshooting

### Can't connect to database?
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Verify in Supabase dashboard:
# Settings → API → Project URL and anon key
```

### RLS policy errors?
```sql
-- Check policies in SQL Editor
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Test policy
SELECT * FROM your_table; -- Should respect RLS
```

### Real-time not working?
1. Check Realtime is enabled (Database → Replication)
2. Verify RLS policies allow SELECT
3. Check subscription code

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Update documentation

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Issues**: GitHub Issues
- **Questions**: Discussion forum
- **Security**: security@mindspace.example

## 🙏 Acknowledgments

- Built with [Supabase](https://supabase.com)
- Inspired by mental health advocacy
- Designed for student wellness

---

**Backend Version**: 1.0.0  
**Last Updated**: March 27, 2026  
**Status**: ✅ Production Ready
