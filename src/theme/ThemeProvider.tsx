import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1d9bf0', // Twitter blue
        light: '#4db5f7',
        dark: '#0c7abf',
      },
      secondary: {
        main: '#f91880', // Twitter pink
        light: '#ff4da6',
        dark: '#d1005a',
      },
      background: {
        default: isDarkMode ? '#15202b' : '#f8f9fa', // Twitter dim background
        paper: isDarkMode ? '#192734' : '#ffffff', // Twitter dim card background
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#333333',
        secondary: isDarkMode ? '#8899a6' : '#666666', // Twitter dim text color
      },
      divider: isDarkMode ? '#38444d' : '#e0e0e0', // Twitter dim border color
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#192734' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.2)' 
              : '0 4px 20px rgba(0,0,0,0.1)',
            border: isDarkMode ? '1px solid #38444d' : '1px solid #e0e0e0',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#192734' : '#ffffff',
            borderBottom: isDarkMode 
              ? '1px solid #38444d' 
              : '1px solid #e0e0e0',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#192734' : '#ffffff',
            borderRight: isDarkMode ? '1px solid #38444d' : '1px solid #e0e0e0',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-outlined': {
              borderColor: isDarkMode ? '#38444d' : '#e0e0e0',
              '&:hover': {
                borderColor: isDarkMode ? '#8899a6' : '#999999',
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isDarkMode ? '#38444d' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? '#8899a6' : '#999999',
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 