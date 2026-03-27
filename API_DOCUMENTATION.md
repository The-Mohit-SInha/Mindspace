# MindSpace Backend API Documentation

This document describes all the backend services and functions available in the MindSpace platform.

## Table of Contents

1. [Authentication Service](#authentication-service)
2. [Resource Service](#resource-service)
3. [Assessment Service](#assessment-service)
4. [Mood Service](#mood-service)
5. [Community Service](#community-service)
6. [Crisis Service](#crisis-service)
7. [Chat Service](#chat-service)

---

## Authentication Service

Located in `/src/services/authService.ts`

### Sign Up

```typescript
signUp(data: SignUpData): Promise<{ user, profile }>
```

Creates a new user account and profile.

**Parameters:**
- `email`: User's email address
- `password`: User's password (min 6 characters)
- `name`: User's full name
- `university`: (Optional) User's university

**Returns:** User object and profile data

**Example:**
```typescript
const result = await signUp({
  email: 'student@university.edu',
  password: 'securePassword123',
  name: 'John Doe',
  university: 'State University'
});
```

### Sign In

```typescript
signIn(data: SignInData): Promise<{ user, profile }>
```

Authenticates an existing user.

**Parameters:**
- `email`: User's email address
- `password`: User's password

**Returns:** User object and profile data

### Sign Out

```typescript
signOut(): Promise<void>
```

Signs out the current user.

### Get User Profile

```typescript
getUserProfile(userId: string): Promise<UserProfile | null>
```

Retrieves a user's profile information.

### Update Profile

```typescript
updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>
```

Updates user profile information.

**Example:**
```typescript
await updateUserProfile(userId, {
  bio: 'Psychology major interested in mental health advocacy',
  university: 'New University'
});
```

### Toggle Anonymous Mode

```typescript
toggleAnonymousMode(userId: string, isAnonymous: boolean): Promise<UserProfile>
```

Enables or disables anonymous mode for the user.

---

## Resource Service

Located in `/src/services/resourceService.ts`

### Get All Resources

```typescript
getAllResources(): Promise<Resource[]>
```

Fetches all mental health resources.

### Get Resources by Category

```typescript
getResourcesByCategory(category: string): Promise<Resource[]>
```

Fetches resources filtered by category.

**Categories:**
- `anxiety`
- `depression`
- `stress`
- `wellbeing`
- `sleep`

### Get Single Resource

```typescript
getResourceById(id: string): Promise<Resource | null>
```

Fetches a specific resource by ID.

### Mark Resource as Helpful

```typescript
markResourceHelpful(id: string): Promise<void>
```

Increments the helpful count for a resource.

### Search Resources

```typescript
searchResources(query: string): Promise<Resource[]>
```

Searches resources by title, description, and content.

---

## Assessment Service

Located in `/src/services/assessmentService.ts`

### Get All Assessments

```typescript
getAllAssessments(): Promise<Assessment[]>
```

Fetches all available assessments.

**Built-in Assessments:**
- GAD-7 (Generalized Anxiety Disorder)
- PHQ-9 (Depression Screening)
- Stress Level Assessment

### Get Assessment by ID

```typescript
getAssessmentById(id: string): Promise<Assessment | null>
```

Fetches a specific assessment with questions.

### Submit Assessment Result

```typescript
submitAssessmentResult(
  userId: string,
  assessmentId: string,
  score: number,
  answers: any,
  severity: string,
  recommendations: any
): Promise<AssessmentResult>
```

Saves user's assessment results.

**Example:**
```typescript
await submitAssessmentResult(
  userId,
  assessmentId,
  15,
  { q1: 2, q2: 3, q3: 2 },
  'Moderate',
  ['Recommendation 1', 'Recommendation 2']
);
```

### Get User Results

```typescript
getUserAssessmentResults(userId: string): Promise<AssessmentResult[]>
```

Retrieves all assessment results for a user.

### Calculate Severity

```typescript
calculateSeverity(score: number, maxScore: number): string
```

Calculates severity level based on score percentage.

**Severity Levels:**
- `Minimal`: < 25%
- `Mild`: 25-50%
- `Moderate`: 50-75%
- `Severe`: > 75%

### Generate Recommendations

```typescript
generateRecommendations(severity: string, category: string): string[]
```

Generates personalized recommendations based on severity.

---

## Mood Service

Located in `/src/services/moodService.ts`

### Save Mood Entry

```typescript
saveMoodEntry(userId: string, moodValue: number, note?: string): Promise<MoodEntry>
```

Records a mood entry for the user.

**Parameters:**
- `moodValue`: Integer from 1 (very sad) to 5 (great)
- `note`: (Optional) Additional notes

### Get Mood History

```typescript
getUserMoodHistory(userId: string, days?: number): Promise<MoodEntry[]>
```

Fetches user's mood history for specified number of days (default: 30).

### Get Today's Mood

```typescript
getTodayMoodEntry(userId: string): Promise<MoodEntry | null>
```

Checks if user has logged mood today.

### Get Mood Statistics

```typescript
getMoodStatistics(userId: string, days?: number): Promise<MoodStats>
```

Calculates mood statistics including average, highest, lowest, and trend.

**Returns:**
```typescript
{
  average: number,      // Average mood value
  highest: number,      // Highest mood recorded
  lowest: number,       // Lowest mood recorded
  trend: string,        // 'improving', 'stable', or 'declining'
  totalEntries: number  // Total number of entries
}
```

---

## Community Service

Located in `/src/services/communityService.ts`

### Support Groups

#### Get All Groups

```typescript
getAllSupportGroups(): Promise<SupportGroup[]>
```

Fetches all active support groups.

#### Join Group

```typescript
joinSupportGroup(groupId: string, userId: string): Promise<void>
```

Adds user to a support group.

#### Leave Group

```typescript
leaveSupportGroup(groupId: string, userId: string): Promise<void>
```

Removes user from a support group.

#### Get User's Groups

```typescript
getUserGroups(userId: string): Promise<SupportGroup[]>
```

Fetches all groups the user is a member of.

### Forum Topics

#### Get All Topics

```typescript
getAllForumTopics(): Promise<ForumTopic[]>
```

Fetches all forum topics.

#### Get Topic by ID

```typescript
getForumTopicById(id: string): Promise<ForumTopic | null>
```

Fetches a specific topic and increments view count.

#### Create Topic

```typescript
createForumTopic(
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  category: string
): Promise<ForumTopic>
```

Creates a new forum topic.

#### Get Topic Replies

```typescript
getTopicReplies(topicId: string): Promise<ForumReply[]>
```

Fetches all replies for a topic.

#### Create Reply

```typescript
createForumReply(
  topicId: string,
  content: string,
  authorId: string,
  authorName: string
): Promise<ForumReply>
```

Adds a reply to a forum topic.

### Events

#### Get All Events

```typescript
getAllEvents(): Promise<Event[]>
```

Fetches all upcoming events.

#### Create Event

```typescript
createEvent(
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  type: string,
  organizerId: string,
  maxAttendees?: number
): Promise<Event>
```

Creates a new event.

#### Register for Event

```typescript
registerForEvent(eventId: string, userId: string): Promise<void>
```

Registers user for an event.

#### Unregister from Event

```typescript
unregisterFromEvent(eventId: string, userId: string): Promise<void>
```

Unregisters user from an event.

---

## Crisis Service

Located in `/src/services/crisisService.ts`

### Get All Crisis Resources

```typescript
getAllCrisisResources(): Promise<CrisisResource[]>
```

Fetches all crisis resources, prioritizing emergency resources.

### Get Emergency Resources

```typescript
getEmergencyResources(): Promise<CrisisResource[]>
```

Fetches only emergency hotlines and resources.

### Get Resources by Type

```typescript
getCrisisResourcesByType(type: string): Promise<CrisisResource[]>
```

Fetches resources filtered by type.

**Types:**
- `hotline`
- `text`
- `in-person`
- `emergency`

---

## Chat Service

Located in `/src/services/chatService.ts`

### Get Recent Messages

```typescript
getRecentMessages(limit?: number): Promise<ChatMessage[]>
```

Fetches recent chat messages (default: 50).

### Send Message

```typescript
sendChatMessage(
  senderId: string,
  senderName: string,
  message: string,
  isAnonymous?: boolean
): Promise<ChatMessage>
```

Sends a chat message.

### Subscribe to Messages (Real-time)

```typescript
subscribeToMessages(callback: (message: ChatMessage) => void): Subscription
```

Subscribes to real-time message updates.

**Example:**
```typescript
const subscription = subscribeToMessages((newMessage) => {
  console.log('New message:', newMessage);
  // Update UI with new message
});

// Later, to unsubscribe:
await unsubscribeFromMessages(subscription);
```

---

## Advanced Supabase Functions

These are PostgreSQL functions available in your Supabase project.

### Get Mood Streak

```typescript
const { data } = await supabase.rpc('get_mood_streak', { user_uuid: userId });
```

Returns the number of consecutive days the user has logged their mood.

### Get Recommended Resources

```typescript
const { data } = await supabase.rpc('get_recommended_resources', { user_uuid: userId });
```

Returns personalized resource recommendations based on assessment history.

### Get User Activity Summary

```typescript
const { data } = await supabase.rpc('get_user_activity_summary', { user_uuid: userId });
```

Returns comprehensive activity statistics for the user.

### Get Trending Topics

```typescript
const { data } = await supabase.rpc('get_trending_topics', { 
  days_back: 7, 
  result_limit: 10 
});
```

Returns the most engaging forum topics.

### Suggest Support Groups

```typescript
const { data } = await supabase.rpc('suggest_support_groups', { 
  user_uuid: userId,
  result_limit: 5
});
```

Returns personalized group suggestions based on assessment history.

---

## Error Handling

All service functions include error handling and user-friendly toast notifications.

**Common Error Patterns:**

```typescript
try {
  const result = await someService();
  // Handle success
} catch (error) {
  // Error is already logged and toast shown
  // Handle specific error cases if needed
}
```

---

## Real-time Features

Supabase provides real-time subscriptions for:

- **Chat Messages**: Live chat updates
- **Forum Replies**: New replies to topics
- **Group Members**: Member joins/leaves
- **Event Attendees**: Event registrations

**Example Real-time Subscription:**

```typescript
const subscription = supabase
  .channel('custom-channel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'forum_replies',
      filter: `topic_id=eq.${topicId}`
    },
    (payload) => {
      console.log('New reply:', payload.new);
    }
  )
  .subscribe();
```

---

## Rate Limiting

Supabase provides automatic rate limiting to prevent abuse. Consider implementing client-side throttling for:

- Search queries
- Message sending
- Vote/reaction buttons

---

## Best Practices

1. **Always check authentication** before calling protected functions
2. **Handle loading states** in the UI during async operations
3. **Implement optimistic updates** for better UX
4. **Use real-time subscriptions** for collaborative features
5. **Cache frequently accessed data** in React state
6. **Implement pagination** for large data sets
7. **Validate user input** before sending to the backend
8. **Use anonymous mode** when privacy is important

---

## Security Considerations

- ✅ All sensitive tables have Row Level Security (RLS) enabled
- ✅ Users can only access their own data
- ✅ Anonymous posting is supported where appropriate
- ✅ API keys are environment variables (never committed)
- ✅ SQL injection protection via parameterized queries
- ✅ XSS protection via React's default escaping

---

## Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Backend Setup Guide](/BACKEND_SETUP.md)
- Test API calls in the Supabase Dashboard
- Check browser console for error messages
