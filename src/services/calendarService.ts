import { supabase, isBackendConfigured } from '../lib/supabase';
import { toast } from 'sonner';
import localStorageService from '../app/utils/localStorage';

export interface CalendarEvent {
  id: string;
  user_id: string;
  event_id?: string;
  title: string;
  description?: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  location?: string;
  event_type: 'wellness_event' | 'personal' | 'reminder' | 'appointment';
  color?: string;
  reminder_enabled: boolean;
  reminder_minutes: number;
  is_all_day: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCalendarEventData {
  title: string;
  description?: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  location?: string;
  event_type: 'wellness_event' | 'personal' | 'reminder' | 'appointment';
  color?: string;
  reminder_enabled?: boolean;
  reminder_minutes?: number;
  is_all_day?: boolean;
  event_id?: string;
}

// Mock storage for demo mode - Now using centralized localStorage service
let mockEvents: CalendarEvent[] = [];

// Initialize mock events from localStorage
const initializeMockEvents = () => {
  const storedEvents = localStorageService.getCalendarEvents();
  if (storedEvents.length === 0) {
    // Add default demo events only if none exist
    const defaultEvents: CalendarEvent[] = [
      {
        id: 'demo-1',
        user_id: 'demo-user',
        title: 'Morning Meditation',
        description: 'Start your day with mindfulness',
        start_date: new Date().toISOString().split('T')[0],
        start_time: '08:00',
        location: 'Wellness Center',
        event_type: 'wellness_event',
        color: 'purple',
        reminder_enabled: true,
        reminder_minutes: 30,
        is_all_day: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'demo-2',
        user_id: 'demo-user',
        title: 'Counseling Appointment',
        description: 'Weekly check-in session',
        start_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
        start_time: '14:00',
        location: 'Health Services Building',
        event_type: 'appointment',
        color: 'green',
        reminder_enabled: true,
        reminder_minutes: 60,
        is_all_day: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'demo-3',
        user_id: 'demo-user',
        title: 'Study Group Meeting',
        description: 'Psychology 101 review session',
        start_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
        start_time: '16:30',
        location: 'Library Room 204',
        event_type: 'personal',
        color: 'blue',
        reminder_enabled: true,
        reminder_minutes: 30,
        is_all_day: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    
    // Store default events in localStorage
    defaultEvents.forEach(event => {
      localStorageService.addCalendarEvent({
        userId: event.user_id,
        title: event.title,
        description: event.description,
        date: event.start_date,
        time: event.start_time,
        type: event.event_type === 'wellness_event' ? 'event' : event.event_type,
      });
    });
  }
};

// Initialize on module load
initializeMockEvents();

// Mock functions for demo mode - Now using localStorage service
const mockGetUserCalendarEvents = async (userId: string): Promise<CalendarEvent[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedEvents = localStorageService.getCalendarEvents();
  const userEvents = storedEvents.filter(e => e.userId === userId);
  
  // Convert localStorage format to CalendarEvent format
  return userEvents.map(e => ({
    id: e.id,
    user_id: e.userId,
    title: e.title,
    description: e.description,
    start_date: e.date,
    start_time: e.time || '09:00',
    event_type: e.type === 'event' ? 'wellness_event' : (e.type as any),
    color: 'purple',
    reminder_enabled: false,
    reminder_minutes: 30,
    is_all_day: false,
    created_at: e.createdAt,
    updated_at: e.createdAt,
  }));
};

const mockCreateCalendarEvent = async (userId: string, eventData: CreateCalendarEventData): Promise<CalendarEvent> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Add to localStorage service
  localStorageService.addCalendarEvent({
    userId,
    title: eventData.title,
    description: eventData.description,
    date: eventData.start_date,
    time: eventData.start_time,
    type: eventData.event_type === 'wellness_event' ? 'event' : eventData.event_type,
  });
  
  // Return the created event
  const newEvent: CalendarEvent = {
    id: `event-${Date.now()}`,
    user_id: userId,
    ...eventData,
    reminder_enabled: eventData.reminder_enabled ?? false,
    reminder_minutes: eventData.reminder_minutes ?? 30,
    is_all_day: eventData.is_all_day ?? false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  mockEvents.push(newEvent);
  return newEvent;
};

const mockDeleteCalendarEvent = async (eventId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  mockEvents = mockEvents.filter(event => event.id !== eventId);
  toast.success('Event removed from calendar');
};

const mockGetCalendarStatistics = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const today = new Date().toISOString().split('T')[0];
  const userEvents = mockEvents.filter(event => event.user_id === userId || event.user_id === 'demo-user');
  const upcomingEvents = userEvents.filter(event => event.start_date >= today);
  
  const eventsByType = userEvents.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalEvents: userEvents.length,
    upcomingEvents: upcomingEvents.length,
    eventsByType,
  };
};

// Get all calendar events for a user
export async function getUserCalendarEvents(userId: string) {
  if (!isBackendConfigured) {
    return mockGetUserCalendarEvents(userId);
  }

  try {
    const { data, error } = await supabase
      .from('user_calendar_events')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Get calendar events error:', error);
    toast.error('Failed to load calendar events');
    return [];
  }
}

// Get upcoming events (next 30 days)
export async function getUpcomingCalendarEvents(userId: string, daysAhead: number = 30) {
  if (!isBackendConfigured) {
    const events = await mockGetUserCalendarEvents(userId);
    const today = new Date();
    const futureDate = new Date(Date.now() + daysAhead * 86400000);
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      return eventDate >= today && eventDate <= futureDate;
    });
  }

  try {
    const { data, error } = await supabase.rpc('get_upcoming_calendar_events', {
      user_uuid: userId,
      days_ahead: daysAhead,
    });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Get upcoming events error:', error);
    return [];
  }
}

// Get events for a specific month
export async function getCalendarEventsByMonth(userId: string, year: number, month: number) {
  if (!isBackendConfigured) {
    const events = await mockGetUserCalendarEvents(userId);
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }

  try {
    const { data, error } = await supabase.rpc('get_calendar_events_by_month', {
      user_uuid: userId,
      target_year: year,
      target_month: month,
    });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Get events by month error:', error);
    toast.error('Failed to load calendar events');
    return [];
  }
}

// Get events for a specific date
export async function getCalendarEventsByDate(userId: string, date: string) {
  if (!isBackendConfigured) {
    const events = await mockGetUserCalendarEvents(userId);
    return events.filter(event => event.start_date === date);
  }

  try {
    const { data, error } = await supabase
      .from('user_calendar_events')
      .select('*')
      .eq('user_id', userId)
      .eq('start_date', date)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Get events by date error:', error);
    return [];
  }
}

// Create a new calendar event
export async function createCalendarEvent(userId: string, eventData: CreateCalendarEventData) {
  if (!isBackendConfigured) {
    return mockCreateCalendarEvent(userId, eventData);
  }

  try {
    const { data, error } = await supabase
      .from('user_calendar_events')
      .insert({
        user_id: userId,
        ...eventData,
        color: eventData.color || 'purple',
        reminder_enabled: eventData.reminder_enabled ?? true,
        reminder_minutes: eventData.reminder_minutes ?? 30,
        is_all_day: eventData.is_all_day ?? false,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Event added to calendar!');
    return data;
  } catch (error: any) {
    console.error('Create calendar event error:', error);
    if (error.code === '23505') {
      toast.error('This event is already in your calendar');
    } else {
      toast.error('Failed to add event to calendar');
    }
    throw error;
  }
}

// Add wellness event to calendar (from events page)
export async function addWellnessEventToCalendar(
  userId: string,
  eventId: string,
  title: string,
  description: string,
  date: string,
  time: string,
  location: string
) {
  return createCalendarEvent(userId, {
    event_id: eventId,
    title,
    description,
    start_date: date,
    start_time: time,
    location,
    event_type: 'wellness_event',
    color: 'purple',
    reminder_enabled: true,
    reminder_minutes: 30,
  });
}

// Update calendar event
export async function updateCalendarEvent(eventId: string, updates: Partial<CreateCalendarEventData>) {
  if (!isBackendConfigured) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const eventIndex = mockEvents.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      toast.success('Event updated!');
      return mockEvents[eventIndex];
    }
    throw new Error('Event not found');
  }

  try {
    const { data, error } = await supabase
      .from('user_calendar_events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single();

    if (error) throw error;

    toast.success('Event updated!');
    return data;
  } catch (error: any) {
    console.error('Update calendar event error:', error);
    toast.error('Failed to update event');
    throw error;
  }
}

// Delete calendar event
export async function deleteCalendarEvent(eventId: string) {
  if (!isBackendConfigured) {
    return mockDeleteCalendarEvent(eventId);
  }

  try {
    const { error } = await supabase
      .from('user_calendar_events')
      .delete()
      .eq('id', eventId);

    if (error) throw error;

    toast.success('Event removed from calendar');
  } catch (error: any) {
    console.error('Delete calendar event error:', error);
    toast.error('Failed to remove event');
    throw error;
  }
}

// Check if event is already in calendar
export async function isEventInCalendar(userId: string, eventId: string) {
  if (!isBackendConfigured) {
    const events = await mockGetUserCalendarEvents(userId);
    return events.some(event => event.event_id === eventId);
  }

  try {
    const { data, error } = await supabase
      .from('user_calendar_events')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return !!data;
  } catch (error: any) {
    console.error('Check event in calendar error:', error);
    return false;
  }
}

// Remove wellness event from calendar
export async function removeWellnessEventFromCalendar(userId: string, eventId: string) {
  if (!isBackendConfigured) {
    mockEvents = mockEvents.filter(event => !(event.user_id === userId && event.event_id === eventId));
    toast.success('Event removed from calendar');
    return;
  }

  try {
    const { error } = await supabase
      .from('user_calendar_events')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (error) throw error;

    toast.success('Event removed from calendar');
  } catch (error: any) {
    console.error('Remove event from calendar error:', error);
    toast.error('Failed to remove event');
    throw error;
  }
}

// Get calendar statistics
export async function getCalendarStatistics(userId: string) {
  if (!isBackendConfigured) {
    return mockGetCalendarStatistics(userId);
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data: allEvents, error: allError } = await supabase
      .from('user_calendar_events')
      .select('*')
      .eq('user_id', userId);

    if (allError) throw allError;

    const { data: upcomingEvents, error: upcomingError } = await supabase
      .from('user_calendar_events')
      .select('*')
      .eq('user_id', userId)
      .gte('start_date', today);

    if (upcomingError) throw upcomingError;

    const eventsByType = allEvents?.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      totalEvents: allEvents?.length || 0,
      upcomingEvents: upcomingEvents?.length || 0,
      eventsByType,
    };
  } catch (error: any) {
    console.error('Get calendar statistics error:', error);
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      eventsByType: {},
    };
  }
}