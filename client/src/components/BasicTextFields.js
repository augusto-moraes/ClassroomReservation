import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields() {
    const [user, setUser] = React.useState('');
  
    const handleChange = (e) => {
      setUser(e.target.value);
    };
  
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Prénom"
          variant="outlined"
          value={user}
          onChange={handleChange}
        />
      </Box>
    );
  }
  
