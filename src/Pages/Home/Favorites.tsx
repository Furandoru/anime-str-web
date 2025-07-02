import React, { useState, useEffect, memo } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchAnimeById } from '../../api/jikan';

// Memoized Favorite Anime Card Component
const FavoriteAnimeCard = memo(({ 
  anime, 
  index, 
  onRemove 
}: { 
  anime: any; 
  index: number; 
  onRemove: (id: string) => void;
}) => {
  const theme = useTheme();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(anime.mal_id.toString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.2s cubic-bezier(.4,0,.2,1), background-color 0.2s cubic-bezier(.4,0,.2,1)',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 8px 32px rgba(0,0,0,0.35)' 
              : '0 8px 32px rgba(0,0,0,0.13)',
            '& .anime-image': {
              transform: 'scale(1.03)'
            }
          },
        }}
      >
        {/* Remove button */}
        <IconButton
          onClick={handleRemove}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            zIndex: 2,
            '&:hover': {
              backgroundColor: 'rgba(255,0,0,0.8)',
            }
          }}
        >
          <Delete />
        </IconButton>

        <Link 
          to={`/anime/${anime.mal_id}`} 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit', 
            display: 'block',
            height: '100%'
          }}
        >
          <Box sx={{ 
            height: '280px', 
            overflow: 'hidden',
            position: 'relative'
          }}>
            <CardMedia
              component="img"
              height="280"
              image={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
              alt={anime.title}
              className="anime-image"
              loading="lazy"
              sx={{ 
                objectFit: 'cover',
                transition: 'transform 0.2s ease-in-out'
              }}
            />
            {/* Overlay gradient */}
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              pointerEvents: 'none',
            }} />
            
            {/* Score badge */}
            {anime.score && (
              <Chip
                label={`★ ${anime.score}`}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(255,215,0,0.9)',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}
              />
            )}
          </Box>
          
          <CardContent sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            padding: 2,
          }}>
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: 1.3,
                color: theme.palette.text.primary,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '2.6em',
                mb: 1
              }}
            >
              {anime.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.8rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexGrow: 1
              }}
            >
              {anime.synopsis || 'No description available'}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 1
            }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {anime.type} • {anime.episodes || '?'} eps
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {anime.status}
              </Typography>
            </Box>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
});
FavoriteAnimeCard.displayName = 'FavoriteAnimeCard';

const Favorites: React.FC = () => {
  const theme = useTheme();
  const { user, removeFromFavorites } = useAuth();
  const [favoriteAnime, setFavoriteAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavoriteAnime = async () => {
      if (!user?.favorites || user.favorites.length === 0) {
        setFavoriteAnime([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch anime data for each favorite ID
        const animePromises = user.favorites.map(async (id) => {
          try {
            return await fetchAnimeById(id);
          } catch (err) {
            console.error(`Failed to fetch anime ${id}:`, err);
            return null; // Return null for failed requests
          }
        });
        
        const animeData = await Promise.all(animePromises);
        // Filter out null values (failed requests)
        const validAnime = animeData.filter(anime => anime !== null);
        setFavoriteAnime(validAnime);
        
        if (validAnime.length < user.favorites.length) {
          setError(`Some favorites couldn't be loaded (${user.favorites.length - validAnime.length} failed)`);
        }
      } catch (err) {
        setError('Failed to load favorite anime');
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteAnime();
  }, [user?.favorites]);

  const handleRemoveFromFavorites = (animeId: string) => {
    removeFromFavorites(animeId);
    setFavoriteAnime(prev => prev.filter(anime => anime.mal_id.toString() !== animeId));
  };

  return (
    <Box sx={{ 
      padding: 3,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.primary.main,
          mb: 1
        }}>
          My Favorites
        </Typography>
        <Typography variant="h6" sx={{ 
          color: theme.palette.text.secondary,
          fontWeight: 400
        }}>
          Your personal collection of beloved anime ({user?.favorites.length || 0} items)
        </Typography>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh' 
        }}>
          <CircularProgress size={60} />
        </Box>
      ) : favoriteAnime.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: theme.palette.text.secondary 
        }}>
          <FavoriteBorder sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            No favorites yet
          </Typography>
          <Typography variant="body1">
            Start adding anime to your favorites to see them here!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)'
          },
          gap: 3,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <AnimatePresence>
            {favoriteAnime.map((anime, index) => (
              <Box key={anime.mal_id}>
                <FavoriteAnimeCard 
                  anime={anime} 
                  index={index}
                  onRemove={handleRemoveFromFavorites}
                />
              </Box>
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
};

export default Favorites; 