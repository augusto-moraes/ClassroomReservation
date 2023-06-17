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

export default function AutoGrid({ setTimes }) {
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

  //fonction qui crée la requête à partir du filtre en ayant rempli salle et date
  function queryBuilding(salle, date) {

    console.log('requête salle/date construite');

    const salleURI = encodeURIComponent(salle);
    return '/getRoomReservation?salle='+salleURI+'&date='+date;

  }


  //fonction qui crée requête apres remplissage salle date et heure
  function queryBuildingWithHour(salle, date, heure) {
    console.log('requête salle/date/heure construite');
    const salleURI = encodeURIComponent(salle);
    return '/getReservationHour?salle=' + salleURI + '&date=' + date + '&heure=' + heure;
  }

  // //fonction récursive pour récupérer les heures pour chaque salle
  // function fetchReservationTimesForSalle(salles, index, selectedDate, selectedHeure, setReservationTimes, reservationTimes) {
  //   if (index >= salles.length) {
  //     // Toutes les salles ont été traitées, mettre à jour le state avec les temps de réservation
  //     setReservationTimes(reservationTimes);
  //     return;
  //   }

  //   const salle = salles[index];
  //   let apiUrl;

  //   if (selectedHeure === '') {
  //     apiUrl = queryBuilding(salle, selectedDate && selectedDate.format("YYYY-MM-DD"));
  //   } else {
  //     apiUrl = queryBuildingWithHour(salle, selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure);
  //   }

  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       const times = data.map(item => item.time);
  //       const updatedReservationTimes = reservationTimes.concat({ salle, heures: times });
  //       fetchReservationTimesForSalle(salles, index + 1, selectedDate, selectedHeure, setReservationTimes, updatedReservationTimes);
  //     })
  //     .catch(error => {
  //       console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
  //     });
  // }

  // //fonction appelée à chaque click sur valider
  // const handleValidation = () => {
  //   console.log('bouton valider cliqué');
  //   const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];

  //   fetchReservationTimesForSalle(salles, 0, selectedDate, selectedHeure, setReservationTimes, []);
  // };

  const handleValidation = () => {
    console.log('bouton valider cliqué');
  
    const apiUrls = salles.map((salle) =>
      queryBuildingWithHour(salle, selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure)
    );
    console.log(apiUrls);
  
    const fetchPromises = apiUrls.map((apiUrl) => fetch(apiUrl).then((response) => response.json()));
  
    Promise.all(fetchPromises)
      .then((dataArray) => {
        const times = dataArray.map((data) => data.map((item) => item.time));
        console.log(times);
        setTimes(times);
      })
      .catch((error) => {
        console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
      });
  };
  


  //dernière version
  //fonction appelée à chaque click sur valider
  // const handleValidation = () => {

  //   console.log('bouton valider cliqué');

  //   const apiUrls = [];
  //   let times = [];

  //   for (let i = 0; i < salles.length; i++) {
  //     const apiUrl = queryBuildingWithHour(salles[i], selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure);
  //     apiUrls.push(apiUrl);
  //     console.log(apiUrl);

  //     fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Traitement les données de réservation de salle ici : affichage des salles
  //       const reservationTimes = data.map(item => item.time);//un tableau reservationTimes est en fait un seul élément du tableau times
  //       console.log(reservationTimes);
  //       times[i] = reservationTimes; // Stocker les temps de réservation dans le tableau times à l'indice correspondant

  //     })

  //     .catch(error => {
  //       console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
  //     });
  //   }

  //   setTimes(times);

  // };
  

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