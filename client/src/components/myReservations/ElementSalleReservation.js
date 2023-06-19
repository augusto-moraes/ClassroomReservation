import * as React from 'react';
import { Card } from '@mui/material';
import BasicButtonGroup from '../reservation/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RecupDataReservation, { MesSallesReserve, MeshorairesReserve, MesDureeReserve, MesDateReserve } from './recupDataReservation';

export default function Salle({salle = 'TDX', desc = salle + ' est reservé !'}) {

    // States
    const sallesReserver = MesSallesReserve();
    const horairesReserver = MeshorairesReserve();
    const dureeReserver = MesDureeReserve();
    const dateReserve = MesDateReserve();
    // Const
    const handleDelete = (index) => {
      //Salle 

      const salleId =  sallesReserver[index]

      // fabriquer l'heure de fin 
      const heureDebut = parseInt(horairesReserver[index])
      const dureeResa = parseInt(dureeReserver[index]);
      
      
      const heureFin = heureDebut + dureeResa;
      const heureFinS = heureFin.toString() + "h";
      // format de la date 
      const dateFin = dateReserve[index] + " "+ heureFinS
      const dateDebut = dateReserve[index] + " " + horairesReserver[index]
      

      const moment = require('moment');

      
      const dateFormat = moment(dateDebut, "DD-MM-YYYY HH:mm");

      const dateInter = dateFormat.format("YYYYMMDD");
      const horairesInter1 = dateFormat.format("HH:mm:ss");

      const dateFormat2 = moment(dateFin, "DD-MM-YYYY HH:mm");

      const dateInter2 = dateFormat2.format("YYYYMMDD");
      const horairesInter2 = dateFormat2.format("HH:mm:ss");
      

      const salleURI = encodeURIComponent(sallesReserver[index]);
      
      ///console.log(dateInter, horairesInter1);

      const url = '/deleteReservation?' + salleURI + '&heureDebut=' + dateInter + '%20' + horairesInter1 + '&heureFin=' + dateInter2 + '%20' + horairesInter2;
      console.log(url);

      fetch(url, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            console.log('Reservation deleted successfully.');
          } else {
            throw new Error('An error occurred while deleting the reservation.');
          }
        })
        .catch(error => {
          console.error(error);
        });
      
    }
    // Functions

    

  return (

    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
      {horairesReserver.map((heure, index) => (
        <Card key={index} style= {{paddingLeft: 20, padding:20, width: 1100, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
          <h1>{sallesReserver[index]} est réservée</h1>
          <p>Date : {dateReserve[index]}</p>
          <p>Heure : {horairesReserver[index]}</p>
          <p>Durée : {dureeReserver[index]}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='outlined' startIcon={<DeleteIcon />} onClick={() => handleDelete(index)} >
              Delete reservation
            </Button>
          </div>
        </Card>
      ))}
    </div>



  );
}