import * as React from 'react';
import Salle from './ElementSalleReservation';
import FiltresRecherche from '../reservation/FiltresRecherche';
import RecupDataReservation, { MesSallesReserve, MeshorairesReserve } from './recupDataReservation';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';




export default function MyReservations() {

  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUsernameSet(true);
  };

  if (!isUsernameSet) {
    return (
      <div style={{ backgroundColor: '#F7F7F7', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <label>
            Veuillez saisir votre nom d'utilisateur :
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <Button type="submit">Valider</Button>
        </form>
      </div>
    );
  }

  

  

  //MesSallesReserve(username);

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>
        <Salle user={username}/>
  
    </div>
  );
  
  
}


