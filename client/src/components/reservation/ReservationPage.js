import * as React from 'react';
import ButtonAppBar from './AppBar';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';

export default function ReservationPage(salle) {

  const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];

    // States

    // Const

    // Functions

  return (
    <div>

        <div>
          <FiltresRecherche />
        </div>

        <div>   
          {salles.map((salle) => (
            <Salle salle={salle} />
          ))}
        </div>

    </div>

  );
}