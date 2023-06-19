import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({items=['rien'], title='titre', onChange, disabled=false, disabledItems=[]}) {
  const [selection, setSelection] = React.useState('');

  function handleChange(event) {
    setSelection(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div style={{margin: 5}}>
    <span style={{marginRight: 10}}>{title}</span>
    <ToggleButtonGroup
      color="primary"
      value={selection}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      disabled={disabled}
      size={'small'}
    >
        {items.map((item) => (
          <ToggleButton key={item} value={item} disabled={disabledItems.indexOf(item) > -1}>{item}</ToggleButton>
        ))}
    </ToggleButtonGroup>
    </div>
  );
}