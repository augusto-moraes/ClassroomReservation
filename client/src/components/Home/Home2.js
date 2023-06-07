import {useState} from "react";
import React from 'react';
import Wrapper from "./Wrapper";
import Screen from './Screen';
import Hour from "./HourButton";
import Button from './Button';

const btnValue = [
  ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
]

function Home() {

  const [newDate, setDate] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    setDate (event.target.value) 
  }

  return (
    <div>
      <h1>Réservation</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input 
          value={newDate} 
          type="text" 
          placeholder="Date" 
          onChange={handleChange}        
        />
        <input type="text" placeholder="Heure" />
        <input type="text" placeholder="Durée" />
        <input type="text" placeholder="Nombre de personnes" />
        <button>Valider</button>
      </form>
      <Wrapper>
        <h1>
          salle TD A
        </h1>
        <Hour>
          {btnValue.flat().map((btn, i) => (
            <Button
              value={btn}
              key={i}
            />
          ))}
        </Hour>
      </Wrapper>
      <Wrapper>
        <h1>
          salle TD B
        </h1>
      </Wrapper>
      <Wrapper>
        <h1>
          salle TD C
        </h1>

      </Wrapper>
    </div>
  )
}

export default Home;