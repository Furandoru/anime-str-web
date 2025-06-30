import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  WatchLater as WatchLaterIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  if (!user) return null;

  const stats = [
    {
      title: 'Favorites',
      value: user.favorites.length,
      icon: <FavoriteIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.main
    },
    {
      title: 'Watchlist',
      value: user.watchlist.length,
      icon: <WatchLaterIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      color: theme.palette.secondary.main
    },
    {
      title: 'Watched',
      value: user.watchHistory.length,
      icon: <HistoryIcon sx={{ fontSize: 32, color: theme.palette.success.main }} />,
      color: theme.palette.success.main
    },
    {
      title: 'This Week',
      value: Math.floor(Math.random() * 10) + 1, // Mock data
      icon: <TrendingUpIcon sx={{ fontSize: 32, color: theme.palette.warning.main }} />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 3 
      }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: 60,
            height: 60,
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            border: `3px solid ${theme.palette.background.paper}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            Welcome back, {user.username}! 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ready to discover more amazing anime?
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        {stats.map((stat, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`,
              border: `1px solid ${stat.color}20`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${stat.color}20`,
                transition: 'all 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                {stat.icon}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: stat.color, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            px: 3,
            py: 1.5
          }}
        >
          View Favorites
        </Button>
        <Button
          variant="outlined"
          startIcon={<WatchLaterIcon />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            px: 3,
            py: 1.5
          }}
        >
          My Watchlist
        </Button>
        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            px: 3,
            py: 1.5
          }}
        >
          Watch History
        </Button>
      </Box>
    </Box>
  );
};

export default UserDashboard; 