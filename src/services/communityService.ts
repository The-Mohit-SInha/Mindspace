import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  is_active: boolean;
  moderator_id: string;
  created_at: string;
  updated_at: string;
}

export interface ForumTopic {
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
}

export interface ForumReply {
  id: string;
  topic_id: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  organizer_id: string;
  attendee_count: number;
  max_attendees?: number;
  created_at: string;
  updated_at: string;
}

// ===== Support Groups =====

export async function getAllSupportGroups() {
  try {
    const { data, error } = await supabase
      .from('support_groups')
      .select('*')
      .eq('is_active', true)
      .order('member_count', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get support groups error:', error);
    toast.error('Failed to load support groups');
    return [];
  }
}

export async function joinSupportGroup(groupId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Joined group successfully!');
    return data;
  } catch (error: any) {
    console.error('Join group error:', error);
    if (error.code === '23505') {
      toast.error('You are already a member of this group');
    } else {
      toast.error('Failed to join group');
    }
    throw error;
  }
}

export async function leaveSupportGroup(groupId: string, userId: string) {
  try {
    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) throw error;

    toast.success('Left group successfully');
  } catch (error: any) {
    console.error('Leave group error:', error);
    toast.error('Failed to leave group');
    throw error;
  }
}

export async function getUserGroups(userId: string) {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        *,
        support_groups (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(item => item.support_groups);
  } catch (error: any) {
    console.error('Get user groups error:', error);
    return [];
  }
}

export async function isUserInGroup(groupId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', groupId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error: any) {
    console.error('Check group membership error:', error);
    return false;
  }
}

// ===== Forum Topics =====

export async function getAllForumTopics() {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get forum topics error:', error);
    toast.error('Failed to load forum topics');
    return [];
  }
}

export async function getForumTopicById(id: string) {
  try {
    // Increment view count
    await supabase.rpc('increment_topic_views', { topic_id: id });

    const { data, error } = await supabase
      .from('forum_topics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get forum topic error:', error);
    toast.error('Failed to load topic');
    return null;
  }
}

export async function createForumTopic(
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  category: string
) {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .insert({
        title,
        content,
        author_id: authorId,
        author_name: authorName,
        category,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Topic created successfully!');
    return data;
  } catch (error: any) {
    console.error('Create topic error:', error);
    toast.error('Failed to create topic');
    throw error;
  }
}

// ===== Forum Replies =====

export async function getTopicReplies(topicId: string) {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get replies error:', error);
    toast.error('Failed to load replies');
    return [];
  }
}

export async function createForumReply(
  topicId: string,
  content: string,
  authorId: string,
  authorName: string
) {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert({
        topic_id: topicId,
        content,
        author_id: authorId,
        author_name: authorName,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Reply posted!');
    return data;
  } catch (error: any) {
    console.error('Create reply error:', error);
    toast.error('Failed to post reply');
    throw error;
  }
}

// ===== Events =====

export async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get events error:', error);
    toast.error('Failed to load events');
    return [];
  }
}

export async function createEvent(
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  type: string,
  organizerId: string,
  maxAttendees?: number
) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert({
        title,
        description,
        date,
        time,
        location,
        type,
        organizer_id: organizerId,
        max_attendees: maxAttendees || null,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Event created successfully!');
    return data;
  } catch (error: any) {
    console.error('Create event error:', error);
    toast.error('Failed to create event');
    throw error;
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('event_attendees')
      .insert({
        event_id: eventId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Registered for event!');
    return data;
  } catch (error: any) {
    console.error('Register for event error:', error);
    if (error.code === '23505') {
      toast.error('You are already registered for this event');
    } else {
      toast.error('Failed to register for event');
    }
    throw error;
  }
}

export async function unregisterFromEvent(eventId: string, userId: string) {
  try {
    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;

    toast.success('Unregistered from event');
  } catch (error: any) {
    console.error('Unregister from event error:', error);
    toast.error('Failed to unregister from event');
    throw error;
  }
}

export async function isUserRegisteredForEvent(eventId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('event_attendees')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error: any) {
    console.error('Check event registration error:', error);
    return false;
  }
}
