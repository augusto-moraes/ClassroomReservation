import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  const hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];

  return (
<div style={{margin: 5}}>
    <span style={{marginRight: 10}}>Heure</span>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {hours.map((time) => (
        <Button>{time}</Button>
      ))}
    </ButtonGroup>
    </div>
  );
}