import * as React from 'react';
import Salle from './ElementSalle';
import moment from 'moment';
import AutoGrid from './AutoGrid';


export default function ReservationPage() {

    // States

    // Const
    const salles = ['TD A', 'TD B', 'TD C', 'TD D', 'TD E', 'TD F', 'TP A', 'TP B', 'TP C', 'TP D', 'TP E', 'Projet A', 'Projet B'];
    const [times, setTimes] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(moment());

    // Functions

    return (
      <div>
          <div style={{margin: '50px'}}>
            <AutoGrid setTimes={setTimes} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
          </div>

          <div>   
          {times === null ? (
              <div>
                <br/><br/><br/><br/>
                <p>Loading...</p>
              </div>
            ) : (
              salles.map((salle, index) => (
                <Salle key={index} salle={salle} heures={times[index]} date={selectedDate}/>
            )))}
          </div>
      </div>
    );
}

