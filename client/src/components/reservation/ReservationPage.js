import * as React from 'react';
import { useState } from 'react';
import ButtonAppBar from './AppBar';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';
import AutoGrid from './AutoGrid';

const heures = ['8:00', '8:30', '9:00'];

export default function ReservationPage(salle, h) {

  const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
  // const heures = ['8:00', '8:30', '9:00'];

  const [times, setTimes] = useState([]);

    // States

    // Const

    // Functions

  return (
    <div>
      
        <div>
          <FiltresRecherche setTimes={setTimes}/>
        </div>

        <div>   
          {salles.map((salle, index) => (
            <Salle key={salle} salle={salle} heures={times[index]}/>
          ))}
        </div>

    </div>

  );
}

function getHeuresForSalle(salle, times) {
  switch (salle) {
    case 'TD A':
      return times[0];
    case 'TD B':
      return heures;
    case 'TD C':
      return times[2];
    case 'TD D':
      return times[3];
    case 'TD E':
      return times[4];
    case 'TD F':
      return times[5];
    case 'TP A':
      return times[6];
    case 'TP B':
      return times[7];
    case 'TP C':
      return times[8];
    case 'TP D':
      return times[9];
    case 'TP E':
      return times[10];
    case 'Projet A':
      return times[11];
    case 'Projet B':
      return times[12];
    default:
      return null;
  }
}
