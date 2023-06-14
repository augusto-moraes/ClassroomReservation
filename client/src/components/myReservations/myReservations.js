import * as React from 'react';
import ButtonAppBar from '../reservation/AppBar';
import Salle from './ElementSalleReservation';
import FiltresRecherche from '../reservation/FiltresRecherche';



export default function MyReservations() {

  const sallesReserver = ['TD A', 'TD B', 'TD C'];

    // States

    // Const

    // Functions

  return (
    <div style={{backgroundColor:'#F7F7F7'}}>
        <div>
          <h1>Mes reservations</h1>
        </div>

        <div>   
          {sallesReserver.map((salle) => (
            <Salle salle={salle}/>
          ))}
        </div>

    

    </div>

  );
}