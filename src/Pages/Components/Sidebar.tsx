import React, { useState, useRef } from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const showSidebar = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsVisible(true);
  };

  const hideSidebar = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200); // 0.5 second delay before hiding
  };

  const cancelHide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  return (
    <>
      {/* Invisible hover area on the left */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '60px',
          height: '100vh',
          zIndex: 1200,
          cursor: 'pointer'
        }}
        onMouseEnter={showSidebar}
        onMouseLeave={hideSidebar}
      />
      
      {/* Sidebar */}
      <Box 
        sx={{
          position: 'fixed',
          top: '50%',
          left: '24px',
          transform: 'translateY(-50%)',
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        onMouseEnter={cancelHide}
        onMouseLeave={hideSidebar}
      >
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            padding: 2.5,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 8px 32px rgba(0,0,0,0.4)' 
              : '0 8px 32px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
            minWidth: '80px',
            maxWidth: '100px',
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.3s ease'
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              width: '100%', 
              py: 1.5, 
              px: 2,
              borderRadius: 2.5, 
              border: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.palette.primary.main}`,
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              } 
            }}>
              <HomeRoundedIcon sx={{ 
                fontSize: 32, 
                mb: 1, 
                color: theme.palette.primary.main 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
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
              py: 1.5, 
              px: 2,
              borderRadius: 2.5, 
              border: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.palette.primary.main}`,
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              } 
            }}>
              <CategoryRoundedIcon sx={{ 
                fontSize: 32, 
                mb: 1, 
                color: theme.palette.primary.main 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
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
              py: 1.5, 
              px: 2,
              borderRadius: 2.5, 
              border: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.palette.secondary.main}`,
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              } 
            }}>
              <FavoriteRoundedIcon sx={{ 
                fontSize: 32, 
                mb: 1, 
                color: theme.palette.secondary.main 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
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
              py: 1.5, 
              px: 2,
              borderRadius: 2.5, 
              border: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.palette.primary.main}`,
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              } 
            }}>
              <HistoryRoundedIcon sx={{ 
                fontSize: 32, 
                mb: 1, 
                color: theme.palette.primary.main 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
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
              py: 1.5, 
              px: 2,
              borderRadius: 2.5, 
              border: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.palette.primary.main}`,
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              } 
            }}>
              <InfoRoundedIcon sx={{ 
                fontSize: 32, 
                mb: 1, 
                color: theme.palette.primary.main 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
                About
              </Typography>
            </Box>
          </Link>
        </Paper>
      </Box>
    </>
  );
};

export default Sidebar;