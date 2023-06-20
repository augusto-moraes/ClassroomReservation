import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields({user, setUser}) {
    const handleChange = (e) => {
      setUser(e.target.value);
    };
  
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '21ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Nom d'utilisateur"
          variant="outlined"
          value={user}
          onChange={handleChange}
          size='small'
        />
      </Box>
    );
  }
  
