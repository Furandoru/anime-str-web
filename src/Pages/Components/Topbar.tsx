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

const Topbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
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

  return (
    <Box sx={{ 
      height: '64px', 
      color: theme.palette.text.primary, 
      display: 'flex', 
      alignItems: 'center', 
      px: 3,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.palette.mode === 'dark' 
        ? '0 1px 3px rgba(0,0,0,0.3)' 
        : '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* Left: Topbar Icon and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
        <NightsStayRoundedIcon sx={{ fontSize: 32, marginRight: 2, color: theme.palette.primary.main }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          AzukiCloud
        </Typography>
      </Box>
      
      {/* Center: Search Bar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8f9fa', 
        borderRadius: 3, 
        px: 3, 
        mx: 4, 
        flex: 1, 
        maxWidth: 600,
        minWidth: 400,
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
        }
      }}>
        <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 20 }} />
        <InputBase 
          placeholder="Search anime, movies, TV shows..." 
          sx={{ 
            width: '100%', 
            fontSize: '15px',
            color: theme.palette.text.primary,
            '& input': {
              color: theme.palette.text.primary
            }
          }} 
        />
      </Box>
      
      {/* Right: Dark Mode Toggle and User Avatar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        minWidth: 'fit-content',
        ml: 'auto',
        gap: 1
      }}>
        {/* Dark Mode Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{ 
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* User Avatar with Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
          <Avatar 
            alt="User" 
            src="" 
            sx={{ 
              bgcolor: theme.palette.primary.main, 
              width: 40, 
              height: 40,
              mr: 1,
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            U
          </Avatar>
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 500, color: theme.palette.text.primary }}>
            User
          </Typography>
          <KeyboardArrowDownRoundedIcon sx={{ color: theme.palette.text.secondary }} />
        </Box>
        
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
            <Typography sx={{ color: theme.palette.text.primary }}>User</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ py: 1.5, color: '#d32f2f' }}>
            <LogoutRoundedIcon sx={{ mr: 2, color: '#d32f2f' }} />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
