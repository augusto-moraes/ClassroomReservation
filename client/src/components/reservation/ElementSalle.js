import * as React from 'react';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ColorToggleButton from '../common/ToggleButtonGroup';

export default function Salle({salle = 'TDX', desc = salle + ' est une salle incroyable !'}) {

    // States

    // Const
    const hours = ['08:00', '08:30', '09:00', '09:30', 
                    '10:00', '10:30', '11:00', '11:30', '12:00',
                    '12:30', '13:00', '13:30', '14:00', '14:30', 
                    '15:00', '15:30', '16:00', '16:30','17:00', 
                    '17:30', '18:00', '18:30', '19:00'];

    const disabledHours = ['08:00', '08:30', '14:00', '14:30', '15:00', '15:30']
    const dureeTotale = [`30 min`, `01:00`, `01:30`, `02:00`, `02:30`, `03:00`, `03:30`, `04:00`];

    const [selectedHeure, setSelectedHeure] = React.useState('');
    const [selectedDuree, setSelectedDuree] = React.useState('');

    const [duree, setDuree] = React.useState(dureeTotale.slice(0, Math.min(hours.length, dureeTotale.length)));

    // Functions
    const calculDuree = (value) => {
      var nextDisabledHour = disabledHours.findIndex(val => val > value);
      var positionInHour = hours.findIndex(val => val === disabledHours[nextDisabledHour]);
      if(positionInHour === -1) positionInHour = hours.length;
      return positionInHour - hours.findIndex(val => val === value)
    }

    const handleHeureChange = (value) => {
      setSelectedHeure(value);
      setDuree(dureeTotale.slice(0, calculDuree(value)));
    };

    const handleDureeChange = (value) => {
      setSelectedDuree(value);
    };

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 25, paddingBottom:25, padding:20, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
      <h1>Salle {salle}</h1>
        <div style={{textAlign: "left"}}>
          <p>{desc}</p>
          <ColorToggleButton  onChange={handleHeureChange} title='Heure' items={hours} disabledItems={disabledHours} />
          <ColorToggleButton  onChange={handleDureeChange} title='Durée' items={duree} />
          <div style={{textAlign: "right"}}>
            <Button variant="contained" size='small' endIcon={<SendIcon />} > Valider la réservation </Button>
          </div>
        </div>
      </Card> 
    </div>
  );
}