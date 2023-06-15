import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicSelect from '../common/Select';
import { Button } from '@mui/material';
import BasicDatePicker from '../common/BasicDatePicker';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
//import * from './ReservationPage';

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

  const [selectedSalle, setSelectedSalle] = React.useState('');
  const [selectedHeure, setSelectedHeure] = React.useState('');
  const [selectedDuree, setSelectedDuree] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleSalleChange = (value) => {
    setSelectedSalle(value);
  };

  const handleHeureChange = (value) => {
    setSelectedHeure(value);
  };

  const handleDureeChange = (value) => {
    setSelectedDuree(value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  //fonction qui crée la requête à partir du filtre
  function queryBuilding(salle, date, heure, duree) {

    console.log('requête construite');

    const salleURI = encodeURIComponent(salle);
    return '/getRoomReservation?salle='+salleURI+'&date='+date;

  }

  //fonction appelée à chaque click sur valider
  const handleValidation = () => {

    console.log('bouton valider cliqué');

    const apiUrl = queryBuilding(selectedSalle, selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure, selectedDuree);
    console.log(apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Traitement les données de réservation de salle ici : affichage des salles
        const times = data.map(item => item.time);
        console.log(times);
        //exporter times et l'importer dans Reservation page....
      })

      .catch(error => {
        console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
      });
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
      <Grid item xs>
          <Item><BasicDatePicker onDateChange={handleDateChange} ></BasicDatePicker></Item>
          {/* <p> date : {selectedDate && selectedDate.format("YYYY-MM-DD")} </p> */}
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={salles} placeholder='Salle' onChange={handleSalleChange}/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={heures} placeholder='Heure' onChange={handleHeureChange}/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={durees} placeholder='Duree' onChange={handleDureeChange}/></Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Button size='small' endIcon={<SendIcon />} onClick = {handleValidation}>  Valider </Button>
            <div style={{marginBottom:4}}>
            <Button size='small' endIcon={<RefreshIcon/>}> Réinitialiser </Button>
            </div>
            </Item>
        </Grid>      
        
      </Grid>
    </Box>
  );
}