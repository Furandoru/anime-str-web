import React from 'react';
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
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dummyAnime } from '../../assets/dummyAnime';

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const anime = dummyAnime.find(a => a.id === Number(id));

  if (!anime) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h4">Anime not found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
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
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={anime.image}
              alt={anime.title}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            {anime.title}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Chip label="Action" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Adventure" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Fantasy" sx={{ mr: 1, mb: 1 }} />
          </Box>
          
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            This is a detailed description of {anime.title}. It's an amazing anime that 
            features incredible storytelling, stunning animation, and memorable characters. 
            The plot follows an epic journey filled with action, adventure, and emotional moments 
            that will keep you on the edge of your seat.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large">
              Watch Now
            </Button>
            <Button variant="outlined" size="large">
              Add to Favorites
            </Button>
            <Button variant="outlined" size="large">
              Share
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimeDetail; 