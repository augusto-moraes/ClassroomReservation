import * as React from 'react';
import ButtonAppBar from '../reservation/AppBar';
import Salle from './ElementSalleReservation';
import FiltresRecherche from '../reservation/FiltresRecherche';
import RecupDataReservation, { MesSallesReserve, MeshorairesReserve } from './recupDataReservation';



export default function MyReservations() {

  const sallesReserver = MesSallesReserve();

    // States

    // Const

    // Functions

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>
        <Salle/>
    </div>

  );
}