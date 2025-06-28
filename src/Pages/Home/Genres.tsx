import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  Chip,
  Grid,
  Button,
  Tabs,
  Tab,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { dummyAnime } from '../../assets/dummyAnime';

// Genre definitions with anime IDs
const genres = {
  'Action': [1, 4, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30],
  'Adventure': [1, 4, 8, 15, 17, 18, 21, 22, 23, 25, 26, 27, 28, 29, 30],
  'Comedy': [2, 3, 6, 7, 10, 11, 12, 16, 20, 21, 22, 23],
  'Drama': [2, 5, 9, 10, 11, 12, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30],
  'Fantasy': [1, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 28, 29, 30],
  'Horror': [1, 4, 6, 8, 17, 19, 20],
  'Mystery': [2, 5, 10, 11, 12, 17, 19, 20],
  'Romance': [2, 5, 9, 12, 24, 25, 26, 27, 28, 29, 30],
  'Sci-Fi': [4, 9, 10, 11, 21],
  'Slice of Life': [2, 3, 5, 10, 11, 12, 24],
  'Supernatural': [1, 6, 7, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 28, 29, 30],
  'Thriller': [2, 4, 5, 6, 8, 10, 11, 12, 17, 19, 20],
};

// Memoized Anime Card Component
const AnimeCard = React.memo(({ anime, index }: { anime: any; index: number }) => {
  const theme = useTheme();

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
        to={`/anime/${anime.id}`} 
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
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 8px 30px rgba(0,0,0,0.4)' 
                : '0 8px 30px rgba(0,0,0,0.15)',
              '& .anime-image': {
                transform: 'scale(1.03)'
              }
            },
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
              image={anime.image}
              alt={anime.title}
              className="anime-image"
              loading="lazy"
              sx={{ 
                objectFit: 'cover',
                transition: 'transform 0.2s ease-in-out'
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              pointerEvents: 'none'
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

const Genres: React.FC = () => {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter anime based on selected genre
  const filteredAnime = useMemo(() => {
    if (selectedGenre === 'All') {
      return dummyAnime;
    }
    const genreAnimeIds = genres[selectedGenre as keyof typeof genres] || [];
    return dummyAnime.filter(anime => genreAnimeIds.includes(anime.id));
  }, [selectedGenre]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnime = filteredAnime.slice(startIndex, endIndex);

  // Handle genre change
  const handleGenreChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedGenre(newValue);
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const genreList = ['All', ...Object.keys(genres)];

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
          Anime Genres
        </Typography>
        <Typography variant="h6" sx={{ 
          color: theme.palette.text.secondary,
          fontWeight: 400
        }}>
          Discover anime by your favorite genres
        </Typography>
      </Box>

      {/* Genre Tabs */}
      <Box sx={{ 
        mb: 4,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              color: theme.palette.text.secondary,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              minWidth: 'auto',
              px: 3,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
              borderRadius: 1.5
            }
          }}
        >
          {genreList.map((genre) => (
            <Tab key={genre} label={genre} value={genre} />
          ))}
        </Tabs>
      </Box>

      {/* Results Info and Controls */}
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
          {selectedGenre === 'All' 
            ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredAnime.length)} of ${filteredAnime.length} anime`
            : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredAnime.length)} of ${filteredAnime.length} ${selectedGenre} anime`
          }
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
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Anime Grid */}
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
        {currentAnime.map((anime, index) => (
          <AnimeCard key={anime.id} anime={anime} index={index} />
        ))}
      </Box>

      {/* No Results Message */}
      {filteredAnime.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary,
            mb: 2
          }}>
            No anime found for this genre
          </Typography>
          <Typography variant="body1" sx={{ 
            color: theme.palette.text.secondary
          }}>
            Try selecting a different genre or check back later for new content.
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {filteredAnime.length > 0 && (
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
      )}
    </Box>
  );
};

export default Genres;
export { Genres }; 