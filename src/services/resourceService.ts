import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface Resource {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
  author?: string;
  read_time: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// Get all resources
export async function getAllResources() {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get resources error:', error);
    toast.error('Failed to load resources');
    return [];
  }
}

// Get resources by category
export async function getResourcesByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get resources by category error:', error);
    toast.error('Failed to load resources');
    return [];
  }
}

// Get single resource
export async function getResourceById(id: string) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get resource error:', error);
    toast.error('Failed to load resource');
    return null;
  }
}

// Increment helpful count
export async function markResourceHelpful(id: string) {
  try {
    const { data, error } = await supabase
      .rpc('increment_helpful_count', { resource_id: id });

    if (error) throw error;
    toast.success('Thanks for your feedback!');
    return data;
  } catch (error: any) {
    console.error('Mark helpful error:', error);
    // Don't show error toast for this
    return null;
  }
}

// Search resources
export async function searchResources(query: string) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Search resources error:', error);
    toast.error('Failed to search resources');
    return [];
  }
}
