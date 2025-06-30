import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Floating centered sidebar */}
      <Sidebar />
      
      {/* Topbar + content */}
      <Box sx={{ 
        flexGrow: 1,
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Topbar */}
        <Box sx={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center',
          width: '100%'
        }}>
          <Topbar />
        </Box>
        {/* Page Content */}
        <Box sx={{ 
          width: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent'
          }
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 