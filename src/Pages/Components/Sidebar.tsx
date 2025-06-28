import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const MAX_DROP = 64; // px, max sidebar drop

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTopOffset(Math.min(scrollY, MAX_DROP));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{
       width: { xs: 0, sm: '16px' },
       overflow: 'visible',
       transition: 'width 0.3s ease',
       height: '100vh',
       display: 'flex',
       flexDirection: 'column', 
       alignItems: 'center',
       paddingTop: 2,
       backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
       position: 'fixed',
       top: `${topOffset}px`,
       left: 0,
       zIndex: 1200,
       boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
       transitionProperty: 'width, top',
       transitionDuration: '0.3s',
       transitionTimingFunction: 'ease',
       '&:hover': {
         width: { xs: 0, sm: '64px' },
         '& .sidebar-content': {
           opacity: 1,
           transform: 'translateX(0)'
         }
       }
    }}>
      {/* Sidebar Icons Aligned */}
      <Box className="sidebar-content" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 3, 
        width: '64px',
        opacity: 0,
        transform: 'translateX(-20px)',
        transition: 'all 0.3s ease',
        position: 'absolute',
        left: 0,
        top: 0,
        paddingTop: 2
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            py: 1, 
            borderRadius: 2, 
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0' 
            } 
          }}>
            <HomeRoundedIcon sx={{ fontSize: 30, mb: 0.5, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '12px' }}>
              Home
            </Typography>
          </Box>
        </Link>
        <Link to="/genres" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            py: 1, 
            borderRadius: 2, 
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0' 
            } 
          }}>
            <CategoryRoundedIcon sx={{ fontSize: 30, mb: 0.5, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '12px' }}>
              Genres
            </Typography>
          </Box>
        </Link>
        <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            py: 1, 
            borderRadius: 2, 
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0' 
            } 
          }}>
            <FavoriteRoundedIcon sx={{ fontSize: 30, mb: 0.5, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '12px' }}>
              Favorites
            </Typography>
          </Box>
        </Link>
        <Link to="/history" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            py: 1, 
            borderRadius: 2, 
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0' 
            } 
          }}>
            <HistoryRoundedIcon sx={{ fontSize: 30, mb: 0.5, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '12px' }}>
              History
            </Typography>
          </Box>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            py: 1, 
            borderRadius: 2, 
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0' 
            } 
          }}>
            <InfoRoundedIcon sx={{ fontSize: 30, mb: 0.5, color: theme.palette.text.primary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '12px' }}>
              About
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;