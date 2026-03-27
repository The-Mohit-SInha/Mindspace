import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mindspace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('mindspace_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mindspace_user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, accept any email/password combination
    // In a real app, this would validate against a backend
    const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
    const existingUser = existingUsers.find((u: any) => u.email === email);

    if (existingUser) {
      setUser(existingUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate avatar color based on name
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

    // Store in "database" (localStorage for demo)
    const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('mindspace_users', JSON.stringify(existingUsers));

    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const toggleAnonymousMode = () => {
    if (user) {
      setUser({ ...user, isAnonymous: !user.isAnonymous });
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Update in "database"
      const existingUsers = JSON.parse(localStorage.getItem('mindspace_users') || '[]');
      const updatedUsers = existingUsers.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('mindspace_users', JSON.stringify(updatedUsers));
    }
  };

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
