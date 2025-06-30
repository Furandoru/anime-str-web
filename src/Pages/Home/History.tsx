import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  useTheme,
  Button,
  Chip,
} from '@mui/material';
import {
  History as HistoryIcon,
  PlayCircle as PlayIcon,
  Favorite as FavoriteIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock history data - in a real app, this would come from the API
  const mockHistoryItems = [
    {
      id: '1',
      title: 'Attack on Titan',
      image: 'https://via.placeholder.com/150x200/667eea/ffffff?text=AOT',
      episode: 'Episode 25',
      watchedAt: '2 hours ago',
      progress: 85
    },
    {
      id: '2',
      title: 'Demon Slayer',
      image: 'https://via.placeholder.com/150x200/f093fb/ffffff?text=DS',
      episode: 'Episode 12',
      watchedAt: '1 day ago',
      progress: 100
    },
    {
      id: '3',
      title: 'My Hero Academia',
      image: 'https://via.placeholder.com/150x200/4facfe/ffffff?text=MHA',
      episode: 'Episode 8',
      watchedAt: '3 days ago',
      progress: 60
    }
  ];

  return (
    <Box sx={{ 
      p: 3,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: 6,
            position: 'relative'
          }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' }
              }}
            >
              Watch History
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 400,
                mb: 3,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Track your anime watching journey and continue where you left off
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/"
                startIcon={<PlayIcon />}
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                Continue Watching
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/favorites"
                startIcon={<FavoriteIcon />}
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5
                }}
              >
                View Favorites
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 6, 
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`
            }}
          >
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 4
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <HistoryIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  {user.watchHistory.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Watched
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <TimeIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  {mockHistoryItems.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This Week
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <PlayIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 2 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  {Math.floor(Math.random() * 20) + 10}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Hours Watched
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <FavoriteIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 2 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  {user.favorites.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Favorites
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* History Items */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 4, 
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}
          >
            Recent Activity
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6
          }}>
            {mockHistoryItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                    borderRadius: 3,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{ 
                          width: 80, 
                          height: 120, 
                          borderRadius: 8,
                          objectFit: 'cover'
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ mb: 1, fontWeight: 500 }}>
                          {item.episode}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.watchedAt}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.progress}%
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        width: '100%', 
                        height: 4, 
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}>
                        <Box sx={{ 
                          width: `${item.progress}%`, 
                          height: '100%', 
                          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 2
                        }} />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label="Continue" 
                        color="primary" 
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                      <Chip 
                        label="Add to Favorites" 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Empty State */}
        {user.watchHistory.length === 0 && (
          <motion.div variants={itemVariants}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 6, 
                borderRadius: 4,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                textAlign: 'center'
              }}
            >
              <HistoryIcon sx={{ fontSize: 80, color: theme.palette.text.secondary, mb: 3 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                No Watch History Yet
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                Start watching anime to build your history and track your progress
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/"
                startIcon={<PlayIcon />}
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                Start Watching
              </Button>
            </Paper>
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
};

export default History;
export { History }; 