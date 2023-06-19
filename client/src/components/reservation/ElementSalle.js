import * as React from 'react';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ColorToggleButton from '../common/ToggleButtonGroup';

export default function Salle({salle = 'TDX', heures, desc = salle + ' est disponible aux horaires suivants : '}) {

    // Const
    const hours = ['08h00', '08h30', '09h00', '09h30', 
                    '10h00', '10h30', '11h00', '11h30', '12h00',
                    '12h30', '13h00', '13h30', '14h00', '14h30', 
                    '15h00', '15h30', '16h00', '16h30','17h00', 
                    '17h30', '18h00', '18h30', '19h00'];

    const dureeTotale = [`30 min`, `01h00`, `01h30`, `02h00`, `02h30`, `03h00`, `03h30`, `04h00`];

    const [disabledHours, setDisabledHours] = React.useState(heures);
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

    const handleClick = () => {
      const reservationData = {
        salle: salle,
        cours: 'LALALA',
        heureDebut: '20230529 16:00:00',
        heureFin: '20230529 18:00:00',
        utilisateur: 'toto',
        participants: ['arthur', 'bastien'],
        nombrePersonne: 3,
        porte: 'INSA'
      };
    
      fetch('/addResa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      })
        .then(response => response.json())
        .then(data => {
          // Gérer la réponse du serveur ici
          console.log('Réservation ajoutée:', data);
        })
        .catch(error => {
          // Gérer les erreurs ici
          console.error('Erreur lors de la réservation:', error);
        });
    };
    

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 25, paddingBottom:25, padding:20, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7', whiteSpace: 'nowrap', overflowX: 'scroll'}}>
      <h1>Salle {salle}</h1>
        <div style={{textAlign: "left"}}>
          <p>{desc}</p>
          <ColorToggleButton onChange={handleHeureChange} title='Heure' items={hours} disabledItems={disabledHours} />
          <ColorToggleButton onChange={handleDureeChange} title='Durée' items={duree} />
          <div style={{textAlign: "right"}}>
            <Button variant="contained" size='small' endIcon={<SendIcon />} onClick={handleClick}> Valider la réservation </Button>
          </div>
        </div>
      </Card> 
    </div>
  );
}

