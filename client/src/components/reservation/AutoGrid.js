import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicSelect from '../common/Select';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  const options1 = ['Option A', 'Option B', 'Option C'];
  const options2 = ['Option 1', 'Option 2', 'Option 3'];
  const salles = ['TDC', 'TDD', 'TDE'];
  const team = ['Augusto', 'Mounir', 'Hedi', 'Kowsi', 'Matthieu'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Item><BasicSelect options={options1} placeholder='ABC'/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={options2} placeholder='123'/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={salles} placeholder='Salles'/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={team} placeholder='Team'/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}