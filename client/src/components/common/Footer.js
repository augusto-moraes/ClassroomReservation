import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              a wonderful footer
            </Typography>
      </Box>
    );
  }
