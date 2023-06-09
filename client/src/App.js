import * as React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'; 

import './App.css';

import ExampleMUI from './components/Example/ExampleMUI';
import NavBar from "./components/common/NavBar";
import Footer from './components/common/Footer';

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
          <Routes>
            <Route path='/' component={<Home/>} />
            <Route path='/test' component={<ExampleMUI/>} />
            <Route path='/login' component={<Login/>} />
          </Routes>
      <Footer/>
      </div>   
    </Router>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>
        Check out the <Link to="/blog">blog</Link> or the{" "}
        <Link to="users">users</Link> section
      </p>
    </>
  );
}

function Login() {
  return (
    <>
      <h1>Login page</h1>
    </>
  );
}