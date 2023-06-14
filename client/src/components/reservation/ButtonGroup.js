import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup({items=['rien'], title='titre'}) {

  return (
    <div style={{margin: 5}}>
      <span style={{marginRight: 10}}>{title}</span>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {items.map((item) => (
          <Button variant="outlined">{item}</Button>
        ))}
      </ButtonGroup>
    </div>
  );
}