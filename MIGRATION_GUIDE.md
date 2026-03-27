# Migrating AuthContext to Supabase

This guide shows you how to update your existing AuthContext to use the Supabase backend instead of localStorage.

## Current LocalStorage-Based AuthContext

Your current `AuthContext` uses localStorage to store user data. This works for development but doesn't persist across devices or provide real authentication.

## Updated Supabase-Based AuthContext

Here's the updated version that uses real authentication:

```typescript
// /src/app/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { getUserProfile, UserProfile } from '../../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  isAnonymous: boolean;
  bio?: string;
  university?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, university?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  toggleAnonymous: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUserProfile(supabaseUser: SupabaseUser) {
    try {
      const profile = await getUserProfile(supabaseUser.id);
      if (profile) {
        setUser({
          id: profile.user_id,
          name: profile.name,
          email: profile.email,
          avatarColor: profile.avatar_color,
          isAnonymous: profile.is_anonymous,
          bio: profile.bio || undefined,
          university: profile.university || undefined,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async function signIn(email: string, password: string) {
    const { signIn: signInService } = await import('../../services/authService');
    const { user: authUser } = await signInService({ email, password });
    if (authUser) {
      await loadUserProfile(authUser);
    }
  }

  async function signUp(email: string, password: string, name: string, university?: string) {
    const { signUp: signUpService } = await import('../../services/authService');
    const { user: authUser } = await signUpService({ email, password, name, university });
    if (authUser) {
      await loadUserProfile(authUser);
    }
  }

  async function signOut() {
    const { signOut: signOutService } = await import('../../services/authService');
    await signOutService();
    setUser(null);
  }

  async function updateUser(updates: Partial<User>) {
    if (!user) return;
    
    const { updateUserProfile } = await import('../../services/authService');
    const updated = await updateUserProfile(user.id, updates as any);
    
    if (updated) {
      setUser({
        ...user,
        ...updates,
      });
    }
  }

  async function toggleAnonymous() {
    if (!user) return;
    
    const { toggleAnonymousMode } = await import('../../services/authService');
    const updated = await toggleAnonymousMode(user.id, !user.isAnonymous);
    
    if (updated) {
      setUser({
        ...user,
        isAnonymous: !user.isAnonymous,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUser,
        toggleAnonymous,
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
```

## Migration Steps

### Step 1: Update AuthContext

Replace the contents of `/src/app/contexts/AuthContext.tsx` with the code above.

### Step 2: Update Sign In Page

```typescript
// /src/app/pages/SignIn.tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      // Error is already shown by the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### Step 3: Update Sign Up Page

```typescript
// /src/app/pages/SignUp.tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    university: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.university
      );
      navigate('/');
    } catch (error) {
      // Error is already shown by the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={formData.university}
        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
        placeholder="University (optional)"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### Step 4: Update Profile Page

```typescript
// /src/app/pages/Profile.tsx
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { user, updateUser, toggleAnonymous, signOut } = useAuth();

  if (!user) return <Navigate to="/sign-in" />;

  const handleUpdateProfile = async (updates: any) => {
    await updateUser(updates);
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Anonymous Mode: {user.isAnonymous ? 'On' : 'Off'}</p>
      
      <button onClick={toggleAnonymous}>
        Toggle Anonymous Mode
      </button>
      
      <button onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}
```

## Benefits of Supabase Authentication

✅ **Real Authentication**: Users can sign in from any device
✅ **Secure**: Passwords are hashed, sessions are encrypted
✅ **Scalable**: Handles millions of users
✅ **Feature-Rich**: Email verification, password reset, OAuth
✅ **Real-time**: Automatic session refresh
✅ **Cross-Device**: Same account works everywhere

## Testing the Migration

1. **Sign Up**: Create a new account
2. **Sign In**: Log in with credentials
3. **Profile**: Update profile information
4. **Anonymous Mode**: Toggle anonymous mode
5. **Sign Out**: Log out and verify session ends
6. **Persistence**: Refresh page and verify still logged in

## Rollback Plan

If you need to revert to localStorage:

1. Keep a backup of the original `AuthContext.tsx`
2. Git commit before making changes
3. Can switch back by reverting the commit

## Common Issues

### "User already registered"
- This email is already in use
- Use sign in instead, or use a different email

### "Invalid credentials"
- Check email and password are correct
- Verify caps lock is off

### "Not authorized"
- Check RLS policies in Supabase
- Verify user is authenticated

## Next Steps

After migrating authentication:

1. ✅ Update all pages to use `useAuth()` hook
2. ✅ Add loading states during authentication
3. ✅ Implement protected routes
4. ✅ Add password reset functionality
5. ✅ Consider adding OAuth (Google, GitHub)
6. ✅ Add email verification (optional)

---

Your authentication is now production-ready! 🎉
