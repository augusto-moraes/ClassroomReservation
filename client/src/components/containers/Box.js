import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}