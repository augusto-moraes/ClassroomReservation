import * as React from 'react';
import { Card } from '@mui/material';
import BasicButtonGroup from './ButtonGroup';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Salle({salle = 'TDX', desc = salle + ' est une salle incroyable !'}) {

    // States

    // Const
    const hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];
    const duree = ['1h', '2h']

    // Functions

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 25, paddingBottom:25, padding:20, width: 750, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
      <h1>Salle {salle}</h1>
        <div style={{textAlign: "left"}}>

        <p>{desc}</p>
        <BasicButtonGroup title='heure' items={hours}/>
        <BasicButtonGroup title='durée' items={duree}/>
        <div style={{textAlign: "right"}}>
        <Button variant="contained" size='small' endIcon={<SendIcon />} > Valider la réservation </Button>
        </div>
        </div>
      </Card>
      
    </div>



  );
}