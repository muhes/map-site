import React from 'react';
import MapComponent from './Components/GoogleMap'
import logo from './logo.svg';
import { Button } from 'reactstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
require('dotenv').config()

function App() {

  return (
    <Router>
    <div className="App">
        <Route exact path="/" component = {MapComponent}/> 
        <Route path="/:id" component = {MapComponent}/>
        
    </div>
    </Router>
  );
}

export default App;
