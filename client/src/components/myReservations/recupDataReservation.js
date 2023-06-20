import * as React from 'react';
import { useState } from 'react';

export default function RecupDataReservation() {

  // data comes from backend
  const [data, setData] = useState([]); 

  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch('/getReservationUser?user=toto')
      .then((res) => res.text())
      .then((text) => {setData(JSON.parse(text))
      })    
  }, []);
  return (<></>);
}

export function MesSallesReserve() {
  const [data, setData] = useState([]);
  const [salleNames, setSalleNames] = useState([]);
 
  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch('/getReservationUser?user=toto')
      .then((res) => res.text())
      .then((text) => {setData(JSON.parse(text))
      })  
  }, []);

  React.useEffect(() => {
    const extractedSalleNames = data.map(item => item.Salle);
    setSalleNames(extractedSalleNames);
  }, [data]);

  return salleNames;
}

export function MeshorairesReserve(user="toto") {
  const [data, setData] = useState([]);
  const [horaires, sethoraires] = useState([]);

  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch(`/getReservationUser?user=${user}`)
      .then((res) => res.text())
      .then((text) => {setData(JSON.parse(text))
      })    
  }, []);

  React.useEffect(() => {
    const extractedSalleNames = data.map(item => item["heure début"]);
    sethoraires(extractedSalleNames);
  }, [data]);

  return horaires;
}

export function MesDureeReserve(user='toto') {
  const [data, setData] = useState([]);
  const [duree, setDuree] = useState([]);
 

  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch(`/getReservationUser?user=${user}`)
      .then((res) => res.text())
      .then((text) => {setData(JSON.parse(text))
      })   
  }, []);

  React.useEffect(() => {
    const extractedDuree = data.map(item => item["Durée"]);
    setDuree(extractedDuree);
  }, [data]);

  return duree;
}

export function MesDateReserve(user='toto') {
  const [data, setData] = useState([]);
  const [dateR, setDateR] = useState([]);
 
  // fetches data from backend (port 3001) and saves it in session as "data", to be displayed in the button
  React.useEffect(() => {
    fetch(`/getReservationUser?user=${user}`)
      .then((res) => res.text())
      .then((text) => {setData(JSON.parse(text))
      })
  }, []);

  React.useEffect(() => {
    const extractedDate = data.map(item => item["Date"]);
    setDateR(extractedDate);
  }, [data]);

  return dateR;  
}







