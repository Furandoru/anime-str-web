import React from 'react';
import { Box, Typography } from '@mui/material';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';

const Topbar: React.FC = () => {
  return (
    <Box sx={{ height: '64px', color: '#222', display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
        {/* Topbar Icon */}
        <NightsStayRoundedIcon sx={{ fontSize: 30, marginRight: 2 }} />
      <Typography variant="h6">Cloud</Typography>
      {/* Add topbar content here */}
    </Box>
  );
};

export default Topbar;
