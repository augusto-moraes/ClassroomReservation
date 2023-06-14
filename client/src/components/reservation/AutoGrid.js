import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicSelect from '../common/Select';
import { Button } from '@mui/material';
import BasicDatePicker from '../common/BasicDatePicker';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
  const heures = ['8h', '8h30', '9h', '9h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', '14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30', '20h', '20h30', '21h', '21h30', '22h', '22h30'];
  const durees = ['30min', '1h', '1h30', '2h'];
  //const team = ['Augusto', 'Mounir', 'Hedi', 'Kowsi', 'Matthieu'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
      <Grid item xs>
          <Item><BasicDatePicker></BasicDatePicker></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={salles} placeholder='Salle'/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={heures} placeholder='Heure'/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={durees} placeholder='Duree'/></Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div style={{paddingTop: 10}}>
            <Button size='large'> Valider </Button>
            </div>
            </Item>
        </Grid>      
        
      </Grid>
    </Box>
  );
}