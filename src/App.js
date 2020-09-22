import React from 'react';
import MapComponent from './Components/GoogleMap'
import logo from './logo.svg';
import { Button } from 'reactstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import shortid from 'shortid';
const axios = require('axios').default;
require('dotenv').config()

const containerStyle = {
  width: '9ovw',
  height: '95vh'
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
}



function App() {
  const [markers, setMarkers] = React.useState([])
    const [selected, setSelected] = React.useState([])

  function save() {
    
    console.log(markers)
    const id = shortid.generate();
    window.confirm(
      "this is your id " +  id + " you can get your saved points by entering this id in the search bar")
    axios.post('https://desolate-temple-82822.herokuapp.com/locations', {
      id: id,
      markers: markers
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  const mapClick = React.useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }])
    }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map)=> {
    mapRef.current = map
  }, [])
  function search() {
    const id = document.getElementById("search").value
    console.log(id)
    axios.post('https://desolate-temple-82822.herokuapp.com/getPoints', {
      location_id:id
    })
    .then((response) => {
      const data = response.data
      try {
        for (var index = 0;index < response.data.length; ++index){
          setMarkers(current => [...current, {
            lat:parseFloat(data[index].lat) ,
            lng: parseFloat(data[index].lng),
            time: new Date()
          }])
        }
      }
    catch { 
      console.log("not found")
    }
      
    }, (error) => {
      console.log(error);
    });
  }

  
  
  return (
    <Router>
    <div className="App">        
        <Route path="/:id" component = {MapComponent}/>
        <Route path="/" component = {MapComponent}/>
    </div>
    </Router>
  );
}

export default App;
//<Route path="/:id" components = {MapComponent}/>
