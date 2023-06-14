import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({items=['rien'], title='titre'}) {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div style={{margin: 5}}>
    <span style={{marginRight: 10}}>{title}</span>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
        {items.map((item) => (
          <ToggleButton value={item}>{item}</ToggleButton>
        ))}
    </ToggleButtonGroup>
    </div>
  );
}