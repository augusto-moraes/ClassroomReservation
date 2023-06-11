import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Card } from 'semantic-ui-react';

export default function BasicButtonGroup() {
  return (
<div style={{margin: 5}}>
    <span style={{marginRight: 10}}>Heure</span>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>08:00</Button>
      <Button>08:30</Button>
      <Button>09:00</Button>
      <Button>10:00</Button>
    </ButtonGroup>
    </div>
  );
}