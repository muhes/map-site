import React from 'react';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';

class Map extends React.Component {
    libraries = ["places"]
    center = {
    lat: 43.653225,
    lng: -79.383186,
    render() {
        const {isLoaded,loadError} = useLoadScript({
            googleMapsApiKey: "AIzaSyCp-n6_YIG6BW6yP4KwPj65pcJYPcRkAoA",
            libraries,
          })
        
          if (loadError) return "Error loading maps"
          if (!isLoaded) return "Loading Maps"
          return (
            <div className="App">
              <GoogleMap mapContainerStyle = {containerStyle} zoom = {8} center = {center}></GoogleMap>
            </div>
          );
    }
}
}