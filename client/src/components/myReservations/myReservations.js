import * as React from 'react';
import ButtonAppBar from '../reservation/AppBar';
import Salle from './ElementSalleReservation';
import FiltresRecherche from '../reservation/FiltresRecherche';
import RecupDataReservation, { MesSallesReserve, MeshorairesReserve } from './recupDataReservation';
import { useState, useEffect } from 'react';



export default function MyReservations() {

  const sallesReserver = MesSallesReserve();
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUser(storedUsername);
    } else {
      const username = prompt('Veuillez saisir votre nom :');
      setUser(username);
      localStorage.setItem('username', username);
    }
  }, []);

  console.log('Nom saisi :', user);
    

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>
        
        <Salle/>
    </div>

  );
}