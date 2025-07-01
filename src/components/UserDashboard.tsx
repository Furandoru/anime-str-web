import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  if (!user) return null;

  return (
    <Box sx={{ 
      mb: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      borderRadius: 2,
      background: theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(0,0,0,0.02)',
      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    }}>
      <Avatar
        src={user.avatar}
        sx={{
          width: 40,
          height: 40,
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <PersonIcon />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Welcome back, {user.username}!
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {user.favorites.length} favorites • {user.watchlist.length} in watchlist
        </Typography>
      </Box>
      <Chip
        label="Premium"
        size="small"
        color="primary"
        variant="outlined"
        sx={{ fontSize: '0.7rem' }}
      />
    </Box>
  );
};

export default UserDashboard; 