import * as React from 'react';
import ButtonAppBar from './AppBar';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';

export default function ReservationPage() {

    // States

    // Const

    // Functions

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>

        <div>
        <FiltresRecherche></FiltresRecherche>
        </div>

        <div>   
        <Salle salle={"TDC"}></Salle>
        </div>

    </div>

  );
}