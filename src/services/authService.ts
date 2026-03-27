import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar_color: string;
  is_anonymous: boolean;
  bio?: string;
  university?: string;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  university?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Sign up a new user
export async function signUp(data: SignUpData) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create profile
      const avatarColors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
      ];
      
      const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: authData.user.id,
          name: data.name,
          email: data.email,
          avatar_color: randomColor,
          is_anonymous: false,
          university: data.university || null,
        });

      if (profileError) throw profileError;

      toast.success('Account created successfully!');
      return { user: authData.user, profile: null };
    }

    return { user: null, profile: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    toast.error(error.message || 'Failed to create account');
    throw error;
  }
}

// Sign in existing user
export async function signIn(data: SignInData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    if (authData.user) {
      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      toast.success('Welcome back!');
      return { user: authData.user, profile };
    }

    return { user: null, profile: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    toast.error(error.message || 'Failed to sign in');
    throw error;
  }
}

// Sign out user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success('Signed out successfully');
  } catch (error: any) {
    console.error('Sign out error:', error);
    toast.error('Failed to sign out');
    throw error;
  }
}

// Get current user session
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error: any) {
    console.error('Get session error:', error);
    return null;
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Get profile error:', error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    toast.success('Profile updated successfully');
    return data;
  } catch (error: any) {
    console.error('Update profile error:', error);
    toast.error('Failed to update profile');
    throw error;
  }
}

// Toggle anonymous mode
export async function toggleAnonymousMode(userId: string, isAnonymous: boolean) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_anonymous: isAnonymous })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    toast.success(`Anonymous mode ${isAnonymous ? 'enabled' : 'disabled'}`);
    return data;
  } catch (error: any) {
    console.error('Toggle anonymous error:', error);
    toast.error('Failed to toggle anonymous mode');
    throw error;
  }
}

// Update password
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    toast.success('Password updated successfully');
  } catch (error: any) {
    console.error('Update password error:', error);
    toast.error('Failed to update password');
    throw error;
  }
}

// Reset password request
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    toast.success('Password reset email sent');
  } catch (error: any) {
    console.error('Reset password error:', error);
    toast.error('Failed to send reset email');
    throw error;
  }
}
