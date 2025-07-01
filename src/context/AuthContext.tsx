import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser, getAuthToken, setAuthToken, removeAuthToken, updateAvatar, updatePreferences, updateUserData, getUserData } from '../api/backend';

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
  favorites: string[];
  watchlist: string[];
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
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  addToFavorites: (animeId: string) => void;
  removeFromFavorites: (animeId: string) => void;
  addToWatchlist: (animeId: string) => void;
  removeFromWatchlist: (animeId: string) => void;
  syncUserData: () => Promise<void>;
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
    const initializeUser = async () => {
      try {
        const savedUser = localStorage.getItem('anime_user');
        const token = getAuthToken();
        
        if (savedUser && token) {
          try {
            const parsedUser = JSON.parse(savedUser);
            const userWithDefaults = {
              ...parsedUser,
              favorites: parsedUser.favorites || [],
              watchlist: parsedUser.watchlist || [],
              preferences: parsedUser.preferences || { theme: 'dark', language: 'en', notifications: true },
            };
            setUser(userWithDefaults);
            
            // Try to sync with backend, but don't fail if it doesn't work
            try {
              const userData = await getUserData();
              setUser({
                id: userData.id,
                username: userData.username,
                email: userData.email,
                avatar: userData.avatar || '',
                preferences: userData.preferences || { theme: 'dark', language: 'en', notifications: true },
                favorites: userData.favorites || [],
                watchlist: userData.watchlist || [],
              });
            } catch (syncError) {
              console.warn('Failed to sync with backend, using local data:', syncError);
              // Keep using the local data if sync fails
            }
          } catch (parseError) {
            console.error('Error parsing saved user:', parseError);
            localStorage.removeItem('anime_user');
            removeAuthToken();
          }
        }
      } catch (error) {
        console.error('Error during user initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('anime_user', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    } else {
      localStorage.removeItem('anime_user');
      removeAuthToken();
    }
  }, [user]);

  const syncUserData = async () => {
    try {
      const userData = await getUserData();
      setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar || '',
        preferences: userData.preferences || { theme: 'dark', language: 'en', notifications: true },
        favorites: userData.favorites || [],
        watchlist: userData.watchlist || [],
      });
    } catch (error) {
      console.error('Error syncing user data:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };

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
        preferences: response.user.preferences,
        favorites: response.user.favorites || [],
        watchlist: response.user.watchlist || [],
      };
      
      setUser(userData);
      return true;
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
      const response = await registerUser({ username, email, password });
      
      // Store the token
      setAuthToken(response.access_token);
      
      // Convert backend user format to frontend format
      const userData: User = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar || '',
        preferences: response.user.preferences,
        favorites: response.user.favorites || [],
        watchlist: response.user.watchlist || [],
      };
      
      setUser(userData);
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
    removeAuthToken();
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const updateAvatar = async (avatarUrl: string) => {
    if (user) {
      try {
        // Update in backend
        await updateAvatar(avatarUrl);
        // Update local state
        setUser({ ...user, avatar: avatarUrl });
      } catch (error) {
        console.error('Error updating avatar:', error);
        // Still update locally even if backend fails
        setUser({ ...user, avatar: avatarUrl });
      }
    }
  };

  const updateUserPreferences = async (preferences: Partial<User['preferences']>) => {
    if (user) {
      try {
        // Update in backend
        await updatePreferences(preferences);
        // Update local state
        setUser({
          ...user,
          preferences: { ...user.preferences, ...preferences }
        });
      } catch (error) {
        console.error('Error updating preferences:', error);
        // Still update locally even if backend fails
        setUser({
          ...user,
          preferences: { ...user.preferences, ...preferences }
        });
      }
    }
  };

  const addToFavorites = async (animeId: string) => {
    if (user && !user.favorites.includes(animeId)) {
      const newFavorites = [...user.favorites, animeId];
      try {
        // Update in backend
        await updateUserData({ favorites: newFavorites });
        // Update local state
        setUser({ ...user, favorites: newFavorites });
      } catch (error) {
        console.error('Error updating favorites:', error);
        // Still update locally even if backend fails
        setUser({ ...user, favorites: newFavorites });
      }
    }
  };

  const removeFromFavorites = async (animeId: string) => {
    if (user) {
      const newFavorites = user.favorites.filter(id => id !== animeId);
      try {
        // Update in backend
        await updateUserData({ favorites: newFavorites });
        // Update local state
        setUser({ ...user, favorites: newFavorites });
      } catch (error) {
        console.error('Error updating favorites:', error);
        // Still update locally even if backend fails
        setUser({ ...user, favorites: newFavorites });
      }
    }
  };

  const addToWatchlist = async (animeId: string) => {
    if (user && !user.watchlist.includes(animeId)) {
      const newWatchlist = [...user.watchlist, animeId];
      try {
        // Update in backend
        await updateUserData({ watchlist: newWatchlist });
        // Update local state
        setUser({ ...user, watchlist: newWatchlist });
      } catch (error) {
        console.error('Error updating watchlist:', error);
        // Still update locally even if backend fails
        setUser({ ...user, watchlist: newWatchlist });
      }
    }
  };

  const removeFromWatchlist = async (animeId: string) => {
    if (user) {
      const newWatchlist = user.watchlist.filter(id => id !== animeId);
      try {
        // Update in backend
        await updateUserData({ watchlist: newWatchlist });
        // Update local state
        setUser({ ...user, watchlist: newWatchlist });
      } catch (error) {
        console.error('Error updating watchlist:', error);
        // Still update locally even if backend fails
        setUser({ ...user, watchlist: newWatchlist });
      }
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
    updateUserPreferences,
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    syncUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 