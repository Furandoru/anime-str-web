import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  InputBase, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider,
  IconButton,
  useTheme as useMuiTheme
} from '@mui/material';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import SearchIcon from '@mui/icons-material/Search';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../context/AuthContext';

const Topbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const theme = useMuiTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <Box sx={{ 
      height: '64px', 
      color: theme.palette.text.primary, 
      display: 'flex', 
      alignItems: 'center', 
      px: 3,
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 1px 3px rgba(0,0,0,0.3)' 
        : '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Left: Topbar Icon and Title */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        minWidth: 'fit-content',
        flexShrink: 0,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8,
          transition: 'opacity 0.2s ease-in-out'
        }
      }} onClick={() => navigate('/')}>
        <NightsStayRoundedIcon sx={{ fontSize: 32, marginRight: 2, color: theme.palette.primary.main }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          AzukiCloud
        </Typography>
      </Box>
      
      {/* Center: Search Bar */}
      <Box sx={{ 
        display: { xs: 'none', md: 'flex' }, // Hide on small screens
        alignItems: 'center', 
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        borderRadius: 3, 
        px: 3, 
        mx: { xs: 1, md: 4 }, 
        flex: 1, 
        maxWidth: 600,
        minWidth: 200,
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
          transform: 'translateY(-1px)',
        },
        '&:focus-within': {
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 0 3px ${theme.palette.primary.main}25`,
          transform: 'translateY(-1px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: -1,
        },
        '&:hover::before': {
          opacity: 0.05,
        }
      }}>
        <SearchIcon sx={{ 
          color: theme.palette.text.secondary, 
          mr: 2, 
          fontSize: 20,
          transition: 'color 0.3s ease-in-out',
          '&:hover': {
            color: theme.palette.primary.main,
          }
        }} />
        <InputBase 
          placeholder="Search anime, movies, TV shows..." 
          sx={{ 
            width: '100%', 
            fontSize: '15px',
            color: theme.palette.text.primary,
            fontWeight: 500,
            '& input': {
              color: theme.palette.text.primary,
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.7,
                fontWeight: 400,
              },
              '&:focus::placeholder': {
                opacity: 0.5,
              }
            },
            '& .MuiInputBase-input': {
              padding: '12px 0',
            }
          }} 
        />
        {/* Search suggestions indicator */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          ml: 2,
          opacity: 0.6,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: 1,
          }
        }}>
          <Typography variant="caption" sx={{ 
            color: theme.palette.text.secondary,
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            ⌘K
          </Typography>
        </Box>
      </Box>
      
      {/* Right: Dark Mode Toggle and User Avatar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        minWidth: 'fit-content',
        ml: 'auto',
        gap: 1,
        flexShrink: 0
      }}>
        {/* Mobile Search Button */}
        <IconButton
          sx={{ 
            display: { xs: 'flex', md: 'none' },
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.15)' 
                : 'rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.primary.main}`,
              transform: 'scale(1.05)',
              boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
            }
          }}
        >
          <SearchIcon />
        </IconButton>

        {/* Dark Mode Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{ 
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.15)' 
                : 'rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.primary.main}`,
              transform: 'scale(1.05)',
              boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
            }
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* User Avatar */}
        <IconButton
          onClick={handleClick}
          sx={{ 
            p: 0.5,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.15)' 
                : 'rgba(0,0,0,0.1)',
              border: `2px solid ${theme.palette.primary.main}`,
              transform: 'scale(1.05)',
            }
          }}
        >
          <Avatar 
            src={user?.avatar} 
            alt={user?.username || 'User'}
            sx={{ 
              width: 36, 
              height: 36,
              background: user?.avatar 
                ? 'transparent' 
                : 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(0,0,0,0.3)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        </IconButton>
        
        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 4px 20px rgba(0,0,0,0.4)' 
                : '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper
            }
          }}
        >
          <MenuItem onClick={handleUserClick} sx={{ py: 1.5 }}>
            <PersonRoundedIcon sx={{ mr: 2, color: theme.palette.text.secondary }} />
            <Typography sx={{ color: theme.palette.text.primary }}>Profile</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#d32f2f' }}>
            <LogoutRoundedIcon sx={{ mr: 2, color: '#d32f2f' }} />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
