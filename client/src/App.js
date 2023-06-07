import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home/Home"
import Home2 from "./components/Home/Home2"
import Home3 from "./components/Home/Home3"
import "./App.css";
import "./components/Home/Home.css";

function App() {
  return (
    <div className="App">        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />
      </Routes>
    </div>
  );
}

export default App;