import * as React from 'react';
import { Card, ToggleButton } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ColorToggleButton from '../common/ToggleButtonGroup';

export default function Salle({salle = 'TDX', heures, desc = salle + ' est une salle incroyable !'}) {

    // States

    // Const
    const hours = heures;
    const duree = ['30min', '1h', '1h30', '2h']

    // Functions

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center", overflowX: 'auto'}} >
      <Card style= {{paddingLeft: 25, paddingBottom:25, padding:20, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7', whiteSpace: 'nowrap'}}>
      <h1>Salle {salle}</h1>
        <div style={{textAlign: "left"}}>

        <p>{desc}</p>
        <ColorToggleButton title='heure' items={hours}></ColorToggleButton>
        <ColorToggleButton title='durée' items={duree}></ColorToggleButton>
        <div style={{textAlign: "right"}}>
        <Button variant="contained" size='small' endIcon={<SendIcon />} > Valider la réservation </Button>
        </div>
        </div>
      </Card>
      
    </div>



  );
}


