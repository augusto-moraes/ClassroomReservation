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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import moment from 'moment';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid({ setTimes, complet }) {
  const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
  const heures = ['8h', '8h30', '9h', '9h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', '14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30', '20h', '20h30', '21h', '21h30', '22h', '22h30'];
  const durees = ['30min', '1h', '1h30', '2h'];

  const [selectedSalle, setSelectedSalle] = React.useState('');
  const [selectedHeure, setSelectedHeure] = React.useState('');
  const [selectedDuree, setSelectedDuree] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(moment());

  //pour le pop-up d'erreur qunad la date n'est pas selected
  const [showErrorDialog, setShowErrorDialog] = React.useState(false);

  React.useEffect(() => {
    handleValidation();
  });

  const openErrorDialog = () => {
    setShowErrorDialog(true);
  };

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
  };  

  //pour le reset des filtres 
  const [filterKey, setFilterKey] = React.useState(0);

  const handleReset = () => {
    setSelectedSalle('');
    setSelectedHeure('');
    setSelectedDuree('');
    setSelectedDate(null);
    setFilterKey((prevKey) => prevKey + 1); // Force la mise à jour des filtres
  };

  
  const handleSalleChange = (value) => {
    setSelectedSalle(value);
  };

  const handleHeureChange = (value) => {
    const formattedHeure = value.replace('h', ':').padStart(5, '0');
    setSelectedHeure(formattedHeure);
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


  //fonction qui crée requête apres remplissage salle date heure duree
  function queryBuildingWithHourAndDuration(salle, date, heure, duree) {
    console.log('requête salle/date/heure/duree construite');
    const salleURI = encodeURIComponent(salle);
    return '/getReservationHourTime?salle=' + salleURI + '&date=' + date + '&heure=' + heure + '&duree=' + duree;
  }


  const handleValidation = () => {
    console.log('bouton valider cliqué');

    if (selectedDate === null) {
      openErrorDialog();
      return;
    }

    let apiUrls;

    if (selectedSalle==='') {

      complet = 1;

      if (selectedDuree==='' && selectedHeure !=='') {
        apiUrls = salles.map((salle) =>
          queryBuildingWithHour(salle, selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure)
        );
      } else if (selectedDuree==='' && selectedHeure==='') {
        apiUrls = salles.map((salle) =>
          queryBuilding(salle, selectedDate && selectedDate.format("YYYY-MM-DD"))
        );
      } else {
        apiUrls = salles.map((salle) =>
          queryBuildingWithHourAndDuration(salle, selectedDate && selectedDate.format("YYYY-MM-DD"), selectedHeure, selectedDuree)
        );    
      }

      console.log(apiUrls);
  
      const fetchPromises = apiUrls.map((apiUrl) => fetch(apiUrl).then((response) => response.json()));
    
      Promise.all(fetchPromises)
        .then((dataArray) => {
          const times = dataArray
            .map((data) => data.map((item) => item.time))
            .filter((time) => time.length > 0);
          console.log(times);
          setTimes(times);
        })
        .catch((error) => {
          console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
        });

    } else {//si on a mis une salle en filtre

      complet = 0;

      apiUrls = queryBuilding(selectedSalle, selectedDate && selectedDate.format("YYYY-MM-DD"))

      console.log(apiUrls);
  
      fetch(apiUrls)
        .then(response => response.json())
        .then(data => {
          const times = data.map(item => item.time);
          console.log(times);
        })
        .catch((error) => {
          console.error('Une erreur est survenue lors de la récupération des données de réservation de salle', error);
        });
    }

  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6}>
      <Grid item xs>
          <Item><BasicDatePicker onDateChange={handleDateChange} key={filterKey}></BasicDatePicker></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={salles} placeholder='Salle' onChange={handleSalleChange} key={filterKey}/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={heures} placeholder='Heure' onChange={(value) => handleHeureChange(value)} key={filterKey}/></Item>
        </Grid>
        <Grid item xs>
          <Item><BasicSelect options={durees} placeholder='Duree' onChange={handleDureeChange} key={filterKey}/></Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Button size='small' endIcon={<SendIcon />} onClick = {handleValidation}>  Valider </Button>
            <div style={{marginBottom:4}}>
            <Button size='small' endIcon={<RefreshIcon/>} onClick={handleReset} > Réinitialiser </Button>
            </div>
            </Item>
        </Grid>      
        
      </Grid>

      <Dialog open={showErrorDialog} onClose={closeErrorDialog}>
        <DialogTitle>Erreur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez sélectionner une date.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeErrorDialog}>OK</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}