import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  message: string;
  is_anonymous: boolean;
  created_at: string;
}

// Get recent chat messages
export async function getRecentMessages(limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.reverse(); // Reverse to show oldest first
  } catch (error: any) {
    console.error('Get messages error:', error);
    toast.error('Failed to load messages');
    return [];
  }
}

// Send a chat message
export async function sendChatMessage(
  senderId: string,
  senderName: string,
  message: string,
  isAnonymous: boolean = false
) {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        sender_id: senderId,
        sender_name: isAnonymous ? 'Anonymous' : senderName,
        message,
        is_anonymous: isAnonymous,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Send message error:', error);
    toast.error('Failed to send message');
    throw error;
  }
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
