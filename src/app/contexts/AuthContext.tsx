import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isBackendConfigured } from '../../lib/supabase';
import * as authService from '../../services/authService';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  isAnonymous: boolean;
  avatarColor: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  toggleAnonymousMode: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    if (isBackendConfigured) {
      // Use Supabase backend
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await authService.getUserProfile(session.user.id);
          if (profile) {
            setUser(transformProfileToUser(profile));
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const profile = await authService.getUserProfile(session.user.id);
          if (profile) {
            setUser(transformProfileToUser(profile));
          }
        } else {
          setUser(null);
        }
      });

      setLoading(false);
      return () => subscription.unsubscribe();
    } else {
      // Use localStorage (demo mode)
      const storedUser = localStorage.getItem('mindspace_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  };

  // Save user to localStorage whenever it changes (demo mode)
  useEffect(() => {
    if (!isBackendConfigured) {
      if (user) {
        localStorage.setItem('mindspace_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('mindspace_user');
      }
    }
  }, [user]);

  const transformProfileToUser = (profile: authService.UserProfile): User => {
    return {
      id: profile.user_id,
      name: profile.name,
      email: profile.email,
      isAnonymous: profile.is_anonymous,
      avatarColor: profile.avatar_color,
      joinedDate: new Date(profile.created_at).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }),
    };
  };

  const signIn = async (email: string, password: string) => {
    if (isBackendConfigured) {
      // Use Supabase backend
      const { user: authUser, profile } = await authService.signIn({ email, password });
      if (profile) {
        setUser(transformProfileToUser(profile));
      }
    } else {
      // Demo mode - use localStorage
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === email);

      if (existingUser) {
        setUser(existingUser);
        toast.success('Welcome back!');
      } else {
        throw new Error('Invalid credentials');
      }
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (isBackendConfigured) {
      // Use Supabase backend
      const { user: authUser } = await authService.signUp({ 
        email, 
        password, 
        name 
      });
      if (authUser) {
        // Profile is created in authService, fetch it
        const profile = await authService.getUserProfile(authUser.id);
        if (profile) {
          setUser(transformProfileToUser(profile));
        }
      }
    } else {
      // Demo mode - use localStorage
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const colors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
      ];
      const avatarColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        isAnonymous: false,
        avatarColor,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };

      const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('mindspace_users', JSON.stringify(existingUsers));

      setUser(newUser);
      toast.success('Account created successfully!');
    }
  };

  const signOut = async () => {
    if (isBackendConfigured) {
      await authService.signOut();
    } else {
      toast.success('Signed out successfully');
    }
    setUser(null);
  };

  const toggleAnonymousMode = async () => {
    if (!user) return;

    if (isBackendConfigured) {
      const updatedProfile = await authService.toggleAnonymousMode(user.id, !user.isAnonymous);
      if (updatedProfile) {
        setUser(transformProfileToUser(updatedProfile));
      }
    } else {
      const updatedUser = { ...user, isAnonymous: !user.isAnonymous };
      setUser(updatedUser);

      const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
      const updatedUsers = existingUsers.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('mindspace_users', JSON.stringify(updatedUsers));
      toast.success(`Anonymous mode ${!user.isAnonymous ? 'enabled' : 'disabled'}`);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    if (isBackendConfigured) {
      const profileUpdates: Partial<authService.UserProfile> = {};
      if (updates.name) profileUpdates.name = updates.name;
      if (updates.email) profileUpdates.email = updates.email;
      
      const updatedProfile = await authService.updateUserProfile(user.id, profileUpdates);
      if (updatedProfile) {
        setUser(transformProfileToUser(updatedProfile));
      }
    } else {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
      const updatedUsers = existingUsers.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('mindspace_users', JSON.stringify(updatedUsers));
      toast.success('Profile updated successfully');
    }
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        toggleAnonymousMode,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}