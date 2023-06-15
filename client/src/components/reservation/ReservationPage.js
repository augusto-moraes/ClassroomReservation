import * as React from 'react';
import { useState } from 'react';
import ButtonAppBar from './AppBar';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';
import AutoGrid from './AutoGrid';

export default function ReservationPage(salle, h) {

  const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
  const heures = ['8:00', '8:30', '9:00'];
  const [reservationTimes, setReservationTimes] = useState([]);

    // States

    // Const

    // Functions

  return (
    <div>
      
        <div>
          <FiltresRecherche setReservationTimes={setReservationTimes}/>
        </div>

        <div>   
          {salles.map((salle) => (
            <Salle key={salle} salle={salle} heures={reservationTimes}/>
          ))}
        </div>

    </div>

  );
}