import * as React from 'react';
import { useState } from 'react';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';


export default function ReservationPage() {

    // States

    // Const
    const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
    const [times, setTimes] = useState([]);

    // Functions

    return (
      <div>
        
          <div>
            <FiltresRecherche setTimes={setTimes} />
          </div>

          <div>   
            {salles.map((salle, index) => (
              <Salle key={index} salle={salle} heures={times[index]}/>
            ))}
          </div>

      </div>
    );
}

