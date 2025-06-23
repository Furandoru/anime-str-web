import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const Sidebar: React.FC = () => {
  return (
    <Box sx={{
       width: { xs: 0, sm: '64px' },overflow:'hidden', transition:'width 0.3s', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 

    }}>
      {/* Sidebar Icon */}
      <HomeRoundedIcon sx={{ fontSize: 30, marginBottom: 2 }} />
      
      {/* text next to the icon */}
      <Typography variant="body2" sx={{ color: 'black', fontSize: '12px' }}>
        Home
      </Typography>
      
    </Box>
  );
};

export default Sidebar;