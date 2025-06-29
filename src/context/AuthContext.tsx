import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  watchlist: string[];
  favorites: string[];
  watchHistory: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  addToWatchlist: (animeId: string) => void;
  removeFromWatchlist: (animeId: string) => void;
  addToFavorites: (animeId: string) => void;
  removeFromFavorites: (animeId: string) => void;
  addToHistory: (animeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('anime_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('anime_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('anime_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('anime_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          username: 'DemoUser',
          email: 'demo@example.com',
          avatar: '',
          preferences: {
            theme: 'dark',
            language: 'en',
            notifications: true,
          },
          watchlist: [],
          favorites: [],
          watchHistory: [],
        };
        setUser(mockUser);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        avatar: '',
        preferences: {
          theme: 'dark',
          language: 'en',
          notifications: true,
        },
        watchlist: [],
        favorites: [],
        watchHistory: [],
      };
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addToWatchlist = (animeId: string) => {
    if (user && !user.watchlist.includes(animeId)) {
      setUser({ ...user, watchlist: [...user.watchlist, animeId] });
    }
  };

  const removeFromWatchlist = (animeId: string) => {
    if (user) {
      setUser({ ...user, watchlist: user.watchlist.filter(id => id !== animeId) });
    }
  };

  const addToFavorites = (animeId: string) => {
    if (user && !user.favorites.includes(animeId)) {
      setUser({ ...user, favorites: [...user.favorites, animeId] });
    }
  };

  const removeFromFavorites = (animeId: string) => {
    if (user) {
      setUser({ ...user, favorites: user.favorites.filter(id => id !== animeId) });
    }
  };

  const addToHistory = (animeId: string) => {
    if (user) {
      const newHistory = [animeId, ...user.watchHistory.filter(id => id !== animeId)].slice(0, 100);
      setUser({ ...user, watchHistory: newHistory });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    addToHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 