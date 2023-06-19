import * as React from 'react';
import Salle from './ElementSalleReservation';

export default function MyReservations() {

  const sallesReserver = ['TD A', 'TD B', 'TD C'];

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