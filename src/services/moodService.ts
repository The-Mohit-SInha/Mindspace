import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_value: number;
  note?: string;
  created_at: string;
}

// Save mood entry
export async function saveMoodEntry(userId: string, moodValue: number, note?: string) {
  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: userId,
        mood_value: moodValue,
        note: note || null,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Mood recorded!');
    return data;
  } catch (error: any) {
    console.error('Save mood error:', error);
    toast.error('Failed to save mood entry');
    throw error;
  }
}

// Get user's mood history
export async function getUserMoodHistory(userId: string, days: number = 30) {
  try {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', dateLimit.toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get mood history error:', error);
    toast.error('Failed to load mood history');
    return [];
  }
}

// Get today's mood entry
export async function getTodayMoodEntry(userId: string) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data;
  } catch (error: any) {
    console.error('Get today mood error:', error);
    return null;
  }
}

// Get mood statistics
export async function getMoodStatistics(userId: string, days: number = 30) {
  try {
    const moodHistory = await getUserMoodHistory(userId, days);
    
    if (moodHistory.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        trend: 'stable',
        totalEntries: 0,
      };
    }

    const moodValues = moodHistory.map(entry => entry.mood_value);
    const average = moodValues.reduce((a, b) => a + b, 0) / moodValues.length;
    const highest = Math.max(...moodValues);
    const lowest = Math.min(...moodValues);

    // Calculate trend (simple comparison of first half vs second half)
    const midPoint = Math.floor(moodValues.length / 2);
    const firstHalfAvg = moodValues.slice(0, midPoint).reduce((a, b) => a + b, 0) / midPoint;
    const secondHalfAvg = moodValues.slice(midPoint).reduce((a, b) => a + b, 0) / (moodValues.length - midPoint);
    
    let trend = 'stable';
    if (secondHalfAvg > firstHalfAvg + 0.3) trend = 'improving';
    if (secondHalfAvg < firstHalfAvg - 0.3) trend = 'declining';

    return {
      average: Number(average.toFixed(1)),
      highest,
      lowest,
      trend,
      totalEntries: moodHistory.length,
    };
  } catch (error: any) {
    console.error('Get mood statistics error:', error);
    return {
      average: 0,
      highest: 0,
      lowest: 0,
      trend: 'stable',
      totalEntries: 0,
    };
  }
}
