import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  is_user: boolean;
  created_at: string;
}

// Get all messages for a user
export async function getAllMessages(userId: string) {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Get messages error:', error);
    return [];
  }
}

// Get recent chat messages (for general chat)
export async function getRecentMessages(limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data ? data.reverse() : []; // Reverse to show oldest first
  } catch (error: any) {
    console.error('Get messages error:', error);
    toast.error('Failed to load messages');
    return [];
  }
}

// Send a chat message
export async function sendMessage(
  userId: string,
  message: string,
  isUser: boolean = true
) {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        message,
        is_user: isUser,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Send message error:', error);
    toast.error('Failed to send message');
    return null;
  }
}

// Legacy function for compatibility
export async function sendChatMessage(
  senderId: string,
  senderName: string,
  message: string,
  isAnonymous: boolean = false
) {
  return sendMessage(senderId, message, true);
}

// Subscribe to new messages (real-time)
export function subscribeToMessages(callback: (message: ChatMessage) => void) {
  const subscription = supabase
    .channel('chat_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
      },
      (payload) => {
        callback(payload.new as ChatMessage);
      }
    )
    .subscribe();

  return subscription;
}

// Unsubscribe from messages
export async function unsubscribeFromMessages(subscription: any) {
  try {
    await supabase.removeChannel(subscription);
  } catch (error: any) {
    console.error('Unsubscribe error:', error);
  }
}