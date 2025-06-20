import { Box, Typography } from '@mui/material';

export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Home Page
      </Typography>
      <Typography variant="body1">
        This is the home page of your application. You can add more content here.
      </Typography>
    </Box>
  );
}
//

export default Home;