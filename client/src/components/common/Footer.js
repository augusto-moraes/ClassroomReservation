import React from 'react'
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {
    return (
      <Box style={{backgroundColor:'#F7F7F7', textAlign:'center'}}>
        <p>
            a wonderful footer made with the <FavoriteIcon/> 
        </p>
      </Box>
    );
  }
