import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Auto-hiding Sidebar on the left */}
      <Box sx={{ 
        width: { xs: 0, sm: '16px' },
        transition: 'width 0.3s ease',
        '&:hover': {
          width: { xs: 0, sm: '64px' }
        }
      }}>
        <Sidebar />
      </Box>
      
      {/* Topbar + content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Topbar */}
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
          <Topbar />
        </Box>
        {/* Page Content */}
        <Box sx={{ padding: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 