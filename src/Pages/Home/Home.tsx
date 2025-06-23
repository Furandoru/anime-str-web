import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import HomeLayout from '../Layouts/HomeLayout';
import { dummyAnime } from '../../assets/dummyAnime';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <Box sx={{ 
                padding: 2,
                width:{
                  xs: '100%',
                  sm: '100%',
                  md: '100%',
                  lg: '100%', 
                }
                 }}>
        <Grid container spacing={2}>
          {dummyAnime.map((anime, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg:2 }} key={anime.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={anime.image}
                    alt={anime.title}
                  />
                  <CardContent sx={{maxHeight: '50px', overflow: 'hidden'}}>
                    <Typography 
                    variant="body1" 
                    fontWeight="bold"
                     sx={{
                        display: 'block',
                        textOverflow: 'ellipsis',
                        // overflow: 'hidden',
                        // whiteSpace: 'nowrap',
                        // transition:'all 0.3 ease',
                        // '&:hover':{
                        //   whiteSpace: 'normal',
                        //   textOverflow: 'clip'
                        // }
                     }}
                    >
                      {anime.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </HomeLayout>
  );
};

export default Home;
export { Home };