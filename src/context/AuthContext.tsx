import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser, getAuthToken, setAuthToken, removeAuthToken } from '../api/backend';

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
  updateAvatar: (avatarUrl: string) => void;
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
    const token = getAuthToken();
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('anime_user');
        removeAuthToken();
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
      removeAuthToken();
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      
      // Store the token
      setAuthToken(response.access_token);
      
      // Convert backend user format to frontend format
      const userData: User = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar || '',
        preferences: {
          theme: 'dark',
          language: 'en',
          notifications: true,
        },
        watchlist: [],
        favorites: [],
        watchHistory: [],
      };
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // Don't throw here, let the component handle the error
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await registerUser({ username, email, password });
      
      // Store the token
      setAuthToken(response.access_token);
      
      // Convert backend user format to frontend format
      const userData: User = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar || '',
        preferences: {
          theme: 'dark',
          language: 'en',
          notifications: true,
        },
        watchlist: [],
        favorites: [],
        watchHistory: [],
      };
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      // Don't throw here, let the component handle the error
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      setUser({ ...user, avatar: avatarUrl });
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
    if (user && !user.watchHistory.includes(animeId)) {
      setUser({ ...user, watchHistory: [...user.watchHistory, animeId] });
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
    updateAvatar,
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