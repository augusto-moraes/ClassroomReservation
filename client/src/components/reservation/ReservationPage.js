import * as React from 'react';
import { useState } from 'react';
import Salle from './ElementSalle';
import FiltresRecherche from './FiltresRecherche';


export default function ReservationPage(salle, h, complet =1) {

    // States

    // Const
    const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
    const dureeResa = ['30min'];
    const [times, setTimes] = useState([]);

    // Functions

  if (complet === 1) {
    return (
      <div>
        
          <div>
            <FiltresRecherche setTimes={setTimes} complet={1}/>
          </div>

          <div>   
            {times.length === 0 ? (
              <p>Loading...</p>
            ) : (
              salles.map((salle, index) => (
              <Salle key={salle} salle={salle} heures={times[index]} duration={dureeResa}/>
            )))}
          </div>

      </div>
    );
  } else {
    return (
      <div>
        
          <div>
            <FiltresRecherche setTimes={setTimes} complet={0}/>
          </div>

          <div>   
            {salles.length > 0 && (
              <Salle key={salles[0]} salle={salles[0]} heures={times[0]} duration={dureeResa}/>
            )}
          </div>

      </div>

    );  
  }
}

