import * as React from 'react';
import { Card } from '@mui/material';
import BasicButtonGroup from '../reservation/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Salle({salle = 'TDX', desc = salle + ' est reservé !'}) {

    // States

    // Const

    // Functions

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 20, padding:20, width: 1100, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
        <h1>Salle {salle} est réservé</h1>
        <p>Date : </p>
        <p>Heure : </p>
        <p>Durée : </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant='outlined' startIcon={<DeleteIcon />}>
            Delete reservation
          </Button>
        </div>
      </Card>
    </div>



  );
}