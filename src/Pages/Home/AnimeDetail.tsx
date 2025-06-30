import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
} from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchAnimeById } from '../../api/jikan';
import { useAuth } from '../../context/AuthContext';

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = user?.favorites.includes(id || '');

  useEffect(() => {
    const loadAnime = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const animeData = await fetchAnimeById(id);
        setAnime(animeData);
      } catch (err) {
        setError('Failed to load anime details');
        console.error('Error loading anime:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!id) return;
    
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !anime) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Anime not found'}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
        >
          Go Back Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        <Box sx={{ 
          flex: { xs: '1', md: '0 0 400px' },
          maxWidth: { xs: '100%', md: '400px' }
        }}>
          <Card sx={{ 
            boxShadow: 3, 
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardMedia
              component="img"
              height="400"
              image={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
              alt={anime.title}
              sx={{ objectFit: 'cover' }}
            />
            
            {/* Favorite button */}
            <IconButton
              onClick={handleFavoriteToggle}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: isFavorite ? '#ff4081' : 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Card>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
            {anime.title}
          </Typography>
          
          {/* Score and status */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            {anime.score && (
              <Chip 
                label={`★ ${anime.score}`} 
                sx={{ 
                  backgroundColor: 'rgba(255,215,0,0.9)', 
                  color: 'black',
                  fontWeight: 'bold'
                }} 
              />
            )}
            <Chip label={anime.status} color="primary" />
            <Chip label={anime.type} variant="outlined" />
          </Box>
          
          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {anime.genres.map((genre: any) => (
                <Chip 
                  key={genre.mal_id} 
                  label={genre.name} 
                  sx={{ mr: 1, mb: 1 }} 
                  variant="outlined"
                />
              ))}
            </Box>
          )}
          
          {/* Synopsis */}
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: theme.palette.text.secondary }}>
            {anime.synopsis || 'No description available'}
          </Typography>
          
          {/* Additional info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              <strong>Episodes:</strong> {anime.episodes || 'Unknown'}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              <strong>Duration:</strong> {anime.duration || 'Unknown'}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              <strong>Rating:</strong> {anime.rating || 'Unknown'}
            </Typography>
            {anime.aired && (
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                <strong>Aired:</strong> {anime.aired.string || 'Unknown'}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large">
              Watch Now
            </Button>
            <Button 
              variant={isFavorite ? "contained" : "outlined"} 
              size="large"
              startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
              onClick={handleFavoriteToggle}
              color={isFavorite ? "secondary" : "primary"}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
            <Button variant="outlined" size="large">
              Share
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeDetail; 