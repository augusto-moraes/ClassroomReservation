import * as React from 'react';
import { Card, ToggleButton } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ColorToggleButton from '../common/ToggleButtonGroup';

export default function Salle({salle = 'TDX', desc = salle + ' est une salle incroyable !'}) {

    // States

    // Const
    const hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];
    const duree = ['1h', '2h']
    const [selectedHeure, setSelectedHeure] = React.useState('');
    const [selectedDuree, setSelectedDuree] = React.useState('');

    // Functions
    const handleHeureChange = (value) => {
      setSelectedHeure(value);
    };
    const handleDureeChange = (value) => {
      setSelectedDuree(value);
    };
  

  

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 25, paddingBottom:25, padding:20, width: 750, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
      <h1>Salle {salle}</h1>
        <div style={{textAlign: "left"}}>

        <p>{desc}</p>
        <ColorToggleButton  onChange={handleHeureChange} title='heure' items={hours}></ColorToggleButton>
        <ColorToggleButton  onChange={handleDureeChange} title='durée' items={duree}></ColorToggleButton>
        <div style={{textAlign: "right"}}>
        <Button variant="contained" size='small' endIcon={<SendIcon />} > Valider la réservation </Button>
        </div>
        </div>
      </Card>
      
    </div>



  );
}