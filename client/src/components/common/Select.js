import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({options = ['nothing here'], placeholder='', onChange}) {
  const [selection, setSelection] = React.useState('');
  
  function handleChange(event) {
    setSelection(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>

      <FormControl fullWidth>

        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label={placeholder}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
  
}

