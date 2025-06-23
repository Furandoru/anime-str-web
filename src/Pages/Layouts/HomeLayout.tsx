import React from 'react';
import { Box } from '@mui/material';
import  Sidebar  from '../Components/Sidebar'; 
import  Topbar  from '../Components/Topbar'; 

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh'}}>
      
      {/* Sidebar on the left */}
      <Box sx={{ width: '64px', paddingTop: 8 }}>
        <Sidebar />
      </Box>

      {/*Topbar + content */}
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

export default HomeLayout;
