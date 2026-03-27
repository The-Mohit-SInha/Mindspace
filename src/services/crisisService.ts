import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface CrisisResource {
  id: string;
  title: string;
  type: string;
  phone?: string;
  description: string;
  availability: string;
  is_emergency: boolean;
  created_at: string;
}

// Get all crisis resources
export async function getAllCrisisResources() {
  try {
    const { data, error } = await supabase
      .from('crisis_resources')
      .select('*')
      .order('is_emergency', { ascending: false })
      .order('title', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get crisis resources error:', error);
    toast.error('Failed to load crisis resources');
    return [];
  }
}

// Get emergency resources
export async function getEmergencyResources() {
  try {
    const { data, error } = await supabase
      .from('crisis_resources')
      .select('*')
      .eq('is_emergency', true)
      .order('title', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get emergency resources error:', error);
    return [];
  }
}

// Get resources by type
export async function getCrisisResourcesByType(type: string) {
  try {
    const { data, error } = await supabase
      .from('crisis_resources')
      .select('*')
      .eq('type', type)
      .order('title', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get crisis resources by type error:', error);
    return [];
  }
}
