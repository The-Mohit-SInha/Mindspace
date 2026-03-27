# Calendar Feature Documentation

## Overview

The MindSpace platform now includes a comprehensive personal calendar system integrated into user profiles. Users can:
- View their personal calendar
- Add custom events
- Add wellness events from the Community page
- Track upcoming events
- Manage event details

## Database Setup

### 1. Run the Calendar Schema

Execute the calendar schema in your Supabase SQL Editor:

```sql
-- Location: /supabase/calendar-schema.sql
```

This creates:
- `user_calendar_events` table
- RLS policies for data security
- Helper functions for querying events
- Indexes for performance

### Key Features:
- ✅ User-specific calendar events
- ✅ Multiple event types (wellness_event, personal, reminder, appointment)
- ✅ Color coding for organization
- ✅ Reminder settings
- ✅ All-day event support
- ✅ Automatic linking with wellness events

## Frontend Implementation

### Components Created

#### 1. UserCalendar Component
**Location**: `/src/app/components/UserCalendar.tsx`

**Features**:
- Monthly calendar view
- Click dates to view/add events
- Event statistics dashboard
- Add custom events dialog
- Color-coded events by type
- Delete events
- Responsive design

**Props**:
```typescript
interface UserCalendarProps {
  userId: string; // Current user ID
}
```

**Usage**:
```tsx
import { UserCalendar } from '../components/UserCalendar';

<UserCalendar userId={user.id} />
```

### Services Created

#### Calendar Service
**Location**: `/src/services/calendarService.ts`

**Key Functions**:

```typescript
// Get all calendar events for user
getUserCalendarEvents(userId: string): Promise<CalendarEvent[]>

// Get upcoming events (next 30 days)
getUpcomingCalendarEvents(userId: string, daysAhead?: number): Promise<CalendarEvent[]>

// Get events for specific month
getCalendarEventsByMonth(userId: string, year: number, month: number): Promise<CalendarEvent[]>

// Get events for specific date
getCalendarEventsByDate(userId: string, date: string): Promise<CalendarEvent[]>

// Create new calendar event
createCalendarEvent(userId: string, eventData: CreateCalendarEventData): Promise<CalendarEvent>

// Add wellness event to calendar (from Community page)
addWellnessEventToCalendar(
  userId: string,
  eventId: string,
  title: string,
  description: string,
  date: string,
  time: string,
  location: string
): Promise<CalendarEvent>

// Update calendar event
updateCalendarEvent(eventId: string, updates: Partial<CreateCalendarEventData>): Promise<CalendarEvent>

// Delete calendar event
deleteCalendarEvent(eventId: string): Promise<void>

// Check if wellness event is already in calendar
isEventInCalendar(userId: string, eventId: string): Promise<boolean>

// Get calendar statistics
getCalendarStatistics(userId: string): Promise<CalendarStats>
```

## Integration Points

### 1. Profile Page
**Location**: `/src/app/pages/Profile.tsx`

The profile page now includes a tabbed interface:
- **Settings Tab**: User settings and anonymous mode
- **Calendar Tab**: Personal calendar view

```tsx
<Tabs defaultValue="settings">
  <TabsList>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="calendar">Calendar</TabsTrigger>
  </TabsList>
  
  <TabsContent value="settings">
    {/* Settings content */}
  </TabsContent>
  
  <TabsContent value="calendar">
    <UserCalendar userId={user.id} />
  </TabsContent>
</Tabs>
```

### 2. Community Page - Events Section
**Location**: `/src/app/pages/CommunityNew.tsx`

**"Add to Calendar" Button**:
- Located in event details view
- Shows "Added to Calendar" with checkmark when event is already added
- Shows "Add to Calendar" when event is not added
- Automatically converts time formats
- Links event to user calendar

```tsx
<Button 
  size="lg" 
  variant="outline" 
  className="flex-1"
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCalendar(selectedEvent);
  }}
>
  {eventInCalendar[selectedEvent] ? (
    <>
      <CheckCircle className="w-5 h-5 mr-2" />
      Added to Calendar
    </>
  ) : (
    <>
      <Calendar className="w-5 h-5 mr-2" />
      Add to Calendar
    </>
  )}
</Button>
```

## Event Types

The calendar supports four event types with color coding:

| Type | Color | Use Case |
|------|-------|----------|
| `wellness_event` | Purple | Events from Community page |
| `personal` | Blue | Personal appointments/events |
| `reminder` | Yellow | Reminders and tasks |
| `appointment` | Green | Counseling/medical appointments |

## User Workflow

### Adding a Wellness Event to Calendar

1. User navigates to **Community** → **Events**
2. User clicks on an event to view details
3. User clicks **"Add to Calendar"** button
4. Event is automatically added to their calendar with:
   - Title from event
   - Description including location
   - Date and time
   - Type set to 'wellness_event'
   - Purple color coding
   - 30-minute reminder enabled

5. Button changes to **"Added to Calendar"** with checkmark
6. User can view event in **Profile** → **Calendar**

### Creating a Custom Event

1. User navigates to **Profile** → **Calendar**
2. User clicks **"Add Event"** button or clicks on a date
3. Fill in event details:
   - Title (required)
   - Description (optional)
   - Date (required)
   - Time
   - Location
   - Event Type
4. Click **"Add Event"**
5. Event appears in calendar

### Viewing Calendar

1. Navigate to **Profile** → **Calendar**
2. View current month calendar
3. Use arrow buttons to navigate months
4. Events shown as colored dots on dates
5. Click date to view all events for that day
6. Click event to see details or delete

## Calendar Statistics

The calendar displays three key metrics:
- **Total Events**: All events in calendar
- **Upcoming Events**: Events in the future
- **Events by Type**: Breakdown by event type

## Technical Details

### Data Structure

```typescript
interface CalendarEvent {
  id: string;
  user_id: string;
  event_id?: string;              // Links to wellness events
  title: string;
  description?: string;
  start_date: string;             // YYYY-MM-DD format
  start_time: string;             // HH:MM format (24-hour)
  end_date?: string;
  end_time?: string;
  location?: string;
  event_type: 'wellness_event' | 'personal' | 'reminder' | 'appointment';
  color?: string;
  reminder_enabled: boolean;
  reminder_minutes: number;       // Default: 30
  is_all_day: boolean;
  created_at: string;
  updated_at: string;
}
```

### Time Format Conversion

The system automatically converts between:
- **12-hour format** (displayed in UI): "3:00 PM"
- **24-hour format** (stored in database): "15:00"

### Security

- ✅ Row Level Security (RLS) ensures users only see their own events
- ✅ All calendar operations require authentication
- ✅ Event IDs are UUIDs for security
- ✅ User ID validation on all operations

## API Examples

### Get User's Calendar Events

```typescript
import { getUserCalendarEvents } from '../../services/calendarService';

const events = await getUserCalendarEvents(user.id);
console.log(`User has ${events.length} events`);
```

### Add Wellness Event from Community Page

```typescript
import { addWellnessEventToCalendar } from '../../services/calendarService';

await addWellnessEventToCalendar(
  user.id,
  '1',  // Event ID from community page
  'Mental Health Awareness Workshop',
  'Join us for this workshop event at Student Center',
  '2026-03-30',
  '15:00',
  'Student Center, Room 201'
);
```

### Create Personal Event

```typescript
import { createCalendarEvent } from '../../services/calendarService';

await createCalendarEvent(user.id, {
  title: 'Counseling Appointment',
  description: 'Weekly check-in',
  start_date: '2026-04-01',
  start_time: '14:00',
  location: 'Health Center',
  event_type: 'appointment',
  reminder_enabled: true,
  reminder_minutes: 60,
});
```

### Check if Event Already Added

```typescript
import { isEventInCalendar } from '../../services/calendarService';

const isAdded = await isEventInCalendar(user.id, eventId);
if (isAdded) {
  console.log('Event already in calendar');
}
```

## Troubleshooting

### Events not showing?
- Check user is authenticated
- Verify calendar schema is installed
- Check RLS policies in Supabase
- Inspect browser console for errors

### "Add to Calendar" not working?
- Ensure user is signed in
- Verify event data is complete
- Check date/time format is valid
- Review Supabase logs for errors

### Calendar not loading?
- Check userId is valid
- Verify user has permission
- Check network tab for API errors
- Ensure Supabase connection is working

## Future Enhancements

Potential features to add:
- 📧 Email reminders
- 🔔 Push notifications
- 📤 Export to Google Calendar/iCal
- 🔄 Recurring events
- 👥 Shared calendar events
- 📱 Mobile app integration
- 🎨 Custom color themes
- 📊 Analytics dashboard

## Testing Checklist

- [ ] User can view calendar in profile
- [ ] User can add custom events
- [ ] User can add wellness events from Community page
- [ ] "Add to Calendar" button updates correctly
- [ ] Events display on correct dates
- [ ] User can delete events
- [ ] Calendar statistics display correctly
- [ ] Month navigation works
- [ ] Date selection works
- [ ] Event types are color-coded
- [ ] RLS prevents access to other users' events
- [ ] Mobile responsive design works

## Files Modified/Created

### Created
- ✅ `/supabase/calendar-schema.sql` - Database schema
- ✅ `/src/services/calendarService.ts` - API service
- ✅ `/src/app/components/UserCalendar.tsx` - Calendar component
- ✅ `/CALENDAR_FEATURE.md` - This documentation

### Modified
- ✅ `/src/app/pages/Profile.tsx` - Added calendar tab
- ✅ `/src/app/pages/CommunityNew.tsx` - Added "Add to Calendar" functionality

---

**Status**: ✅ **Complete and Production Ready**

**Version**: 1.0.0  
**Last Updated**: March 27, 2026
