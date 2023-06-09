import * as React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 

import './App.css';

import ExempleMUI from './components/Exemple/ExempleMUI';
import NavBar from "./components/common/NavBar";

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path='/' component={<ExempleMUI/>} />
          </Routes>
        </div>
      
      </div>   
    </Router>
  );
}