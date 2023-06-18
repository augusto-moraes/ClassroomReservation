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
            <Button variant='outlined' startIcon={<DeleteIcon />}  >
              Delete reservation
            </Button>
          </div>
        </Card>
      ))}
    </div>



  );
}