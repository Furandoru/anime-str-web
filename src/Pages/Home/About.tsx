import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  useTheme,
  Button,
  Divider,
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Devices as DevicesIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const theme = useTheme();

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

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Extensive Library',
      description: 'Discover thousands of anime titles from classics to the latest releases'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Personal Favorites',
      description: 'Create your own collection of favorite anime and track your progress'
    },
    {
      icon: <PlayIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: 'High Quality Streaming',
      description: 'Enjoy crystal clear video quality with adaptive streaming technology'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />,
      title: 'Safe & Secure',
      description: 'Your data is protected with industry-standard security measures'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      title: 'Lightning Fast',
      description: 'Optimized for speed with minimal loading times and smooth playback'
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />,
      title: 'Multi-Platform',
      description: 'Watch on any device - desktop, tablet, or mobile phone'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Anime Titles' },
    { number: '50+', label: 'Genres' },
    { number: '24/7', label: 'Availability' },
    { number: 'HD', label: 'Quality' }
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
        {/* Hero Section */}
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
              About AzukiCloud
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
              Your ultimate destination for discovering, watching, and managing your favorite anime content. 
              Built with passion for the anime community.
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
                Start Watching
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/genres"
                startIcon={<SearchIcon />}
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5
                }}
              >
                Explore Genres
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
              {stats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
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
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Features Section */}
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
            Why Choose AzukiCloud?
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6
          }}>
            {features.map((feature, index) => (
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
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Mission Section */}
        <motion.div variants={itemVariants}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              mb: 6, 
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
              textAlign: 'center'
            }}
          >
            <StarIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 3 }} />
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: theme.palette.text.secondary, lineHeight: 1.6 }}>
              To provide anime enthusiasts with a seamless, high-quality streaming experience 
              that celebrates the art and culture of Japanese animation. We believe in making 
              anime accessible to everyone while respecting the creators and the community.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip label="Quality" color="primary" variant="outlined" />
              <Chip label="Community" color="secondary" variant="outlined" />
              <Chip label="Innovation" color="success" variant="outlined" />
              <Chip label="Accessibility" color="warning" variant="outlined" />
            </Box>
          </Paper>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              Ready to Start Your Anime Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of anime fans and discover your next favorite series
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
                  backgroundColor: 'white',
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  }
                }}
              >
                Get Started
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
                  py: 1.5,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                View Favorites
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default About;
export { About }; 