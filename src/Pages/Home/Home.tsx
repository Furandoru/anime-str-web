import React, { useState, useEffect, memo } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchPopularAnime } from '../../api/jikan';
import { useAuth } from '../../context/AuthContext';

// Memoized Anime Card Component for better performance
const AnimeCard = memo(({ anime, index }: { anime: any; index: number }) => {
  const theme = useTheme();
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const isFavorite = user?.favorites.includes(anime.mal_id.toString());

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(anime.mal_id.toString());
    } else {
      addToFavorites(anime.mal_id.toString());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
      style={{ width: '100%' }}
    >
      <Link 
        to={`/anime/${anime.mal_id}`} 
        style={{ 
          textDecoration: 'none', 
          color: 'inherit', 
          display: 'block',
          height: '100%'
        }}
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
            cursor: 'pointer',
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
          {/* Favorite button */}
          <IconButton
            onClick={handleFavoriteToggle}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: isFavorite ? '#ff4081' : 'white',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.8)',
              }
            }}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

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
          </Box>
          <CardContent sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: 2,
            textAlign: 'center'
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
                minHeight: '2.6em'
              }}
            >
              {anime.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
});
AnimeCard.displayName = 'AnimeCard';

const Home: React.FC = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPopularAnime(currentPage)
      .then((data) => {
        setAnimeList(data);
        setTotalPages(20); // Jikan returns 25 per page, but you can adjust as needed
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle items per page change (Jikan only supports 25 per page max)
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
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
          Discover Amazing Anime
        </Typography>
        <Typography variant="h6" sx={{ 
          color: theme.palette.text.secondary,
          fontWeight: 400
        }}>
          Explore the latest and greatest anime series
        </Typography>
      </Box>
      {/* Pagination Controls */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        maxWidth: '1400px',
        margin: '0 auto 24px auto',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="body2" sx={{ 
          color: theme.palette.text.secondary 
        }}>
          Showing {animeList.length ? `${(currentPage - 1) * itemsPerPage + 1}-${(currentPage - 1) * itemsPerPage + animeList.length}` : '0-0'} of {totalPages * itemsPerPage} anime
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ 
            color: theme.palette.text.secondary 
          }}>
            Items per page:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              sx={{
                backgroundColor: theme.palette.background.paper,
                '& .MuiSelect-select': {
                  color: theme.palette.text.primary
                }
              }}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* Anime Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
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
          {animeList.map((anime, index) => (
            <AnimeCard key={anime.mal_id} anime={anime} index={index} />
          ))}
        </Box>
      )}
      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 6,
        mb: 4
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }
              }
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
export { Home };