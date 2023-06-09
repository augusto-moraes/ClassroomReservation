import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import BasicSelect from '../Select';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box >
      <Grid container spacing={4}>
        <Grid xs>
          <Item><BasicSelect></BasicSelect></Item>
        </Grid>
        <Grid xs>
          <Item><BasicSelect></BasicSelect></Item>
        </Grid>
        <Grid xs>
          <Item><BasicSelect></BasicSelect></Item>
        </Grid>
        <Grid xs>
          <Item><BasicSelect></BasicSelect></Item>
        </Grid>
      </Grid>
    </Box>
  );
}