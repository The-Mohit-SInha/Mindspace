import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: any;
  created_at: string;
  updated_at: string;
}

export interface AssessmentResult {
  id: string;
  user_id: string;
  assessment_id: string;
  score: number;
  severity: string;
  answers: any;
  recommendations: any;
  created_at: string;
}

// Get all assessments
export async function getAllAssessments() {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get assessments error:', error);
    toast.error('Failed to load assessments');
    return [];
  }
}

// Get assessment by ID
export async function getAssessmentById(id: string) {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get assessment error:', error);
    toast.error('Failed to load assessment');
    return null;
  }
}

// Submit assessment result
export async function submitAssessmentResult(
  userId: string,
  assessmentId: string,
  score: number,
  answers: any,
  severity: string,
  recommendations: any
) {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        user_id: userId,
        assessment_id: assessmentId,
        score,
        answers,
        severity,
        recommendations,
      })
      .select()
      .single();

    if (error) throw error;

    toast.success('Assessment completed successfully');
    return data;
  } catch (error: any) {
    console.error('Submit assessment error:', error);
    toast.error('Failed to save assessment result');
    throw error;
  }
}

// Get user's assessment results
export async function getUserAssessmentResults(userId: string) {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select(`
        *,
        assessments (
          title,
          category
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get user results error:', error);
    toast.error('Failed to load your results');
    return [];
  }
}

// Get latest result for an assessment
export async function getLatestAssessmentResult(userId: string, assessmentId: string) {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .eq('assessment_id', assessmentId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data;
  } catch (error: any) {
    console.error('Get latest result error:', error);
    return null;
  }
}

// Calculate severity based on score
export function calculateSeverity(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  
  if (percentage < 25) return 'Minimal';
  if (percentage < 50) return 'Mild';
  if (percentage < 75) return 'Moderate';
  return 'Severe';
}

// Generate recommendations based on severity
export function generateRecommendations(severity: string, category: string) {
  const recommendations = {
    Minimal: [
      'Continue practicing self-care and stress management techniques',
      'Maintain your current support system',
      'Consider preventive strategies like regular exercise and good sleep habits',
    ],
    Mild: [
      'Explore our self-help resources and coping strategies',
      'Join a support group to connect with peers',
      'Practice relaxation techniques like deep breathing or meditation',
      'Monitor your symptoms and track your mood',
    ],
    Moderate: [
      'Consider scheduling an appointment with a counselor',
      'Join support groups and connect with others who understand',
      'Use our crisis resources if you need immediate support',
      'Practice stress management techniques daily',
      'Reach out to trusted friends or family members',
    ],
    Severe: [
      'We strongly recommend speaking with a mental health professional',
      'Contact your campus counseling center for an appointment',
      'Use our crisis support resources - help is available 24/7',
      'Don\'t hesitate to reach out to trusted friends, family, or mentors',
      'If you\'re in immediate danger, please call 988 or 911',
    ],
  };

  return recommendations[severity as keyof typeof recommendations] || recommendations.Minimal;
}
