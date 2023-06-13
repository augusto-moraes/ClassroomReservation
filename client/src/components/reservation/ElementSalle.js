import * as React from 'react';
import { Card } from '@mui/material';
import BasicButtonGroup from './ButtonGroup';

export default function Salle({salle = 'TDX', desc = salle + ' est une salle incroyable !'}) {

    // States

    // Const

    // Functions

  return (

    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <Card style= {{paddingLeft: 20, padding:20, width: 1100, margin: "10px", borderRadius: "5px", backgroundColor: 'white', boxShadow: '2px 2px 0px #D7D7D7'}}>
        <h1>Salle {salle}</h1>
        <p>{desc}</p>
        <BasicButtonGroup/>
        <BasicButtonGroup/>
      </Card>
    </div>



  );
}