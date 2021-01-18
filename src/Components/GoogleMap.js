import React from 'react'
import '../App.css'
import shortid from 'shortid';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from 'reactstrap';
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

class MapComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {markers:[], selected : {}, googleMapsReady: false}
        
    }

    search = () => {
        const {match: { params}} =  this.props
        const id = params.id
    console.log(id)
    axios.post('https://desolate-temple-82822.herokuapp.com/getPoints', {
      location_id:id
    })
    .then((response) => {
      const data = response.data
      try {
        for (var index = 0;index < response.data.length; ++index){
            const newElement = {
                lat:parseFloat(data[index].lat) ,
            lng: parseFloat(data[index].lng),
            time: new Date()
                }
                this.setState(prevState => ({
                    markers : [...prevState.markers,newElement]
            })
            )

        }
      }
    catch { 
      console.log("not found")
    }
      
    }, (error) => {
      console.log(error);
    });
    }

    save = () => {
        var path
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            path = "http://localhost:3000/"
        } else {
            path = "https://muhes-map.herokuapp.com/"
        }

         const id = shortid.generate();
        window.prompt(
            "Share this link: " , path+id)
        axios.post('https://desolate-temple-82822.herokuapp.com/locations', {
            id: id,
            markers: this.state.markers
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
  
    }

    componentDidMount() {

        const {match: { params}} =  this.props
        if (params.id === undefined) {
            console.log('ioio')
        }
        this.search()
        }
    
    render() {
        return (
            <div>
              <h3>Map Checkpoints</h3>
              <h5>Click on the your points then click share to get a shareable link</h5>
        <Button color="success" onClick = {() => this.save()}> Share</Button>
        <LoadScript
       googleMapsApiKey={process.env.API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={9}
          center={center}
          onClick = {(event) => {
              const newElement = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
                }
                console.log(this.state.markers)
              this.setState(prevState => ({
            markers : [...prevState.markers,newElement]
    })
    )}      
}
        >
        {this.state.markers.map(marker => 
          <Marker key ={marker.time.toISOString()} position ={{lat: marker.lat, lng: marker.lng} }
             />)}
             />
             </GoogleMap>

     </LoadScript>
          
        </div>
        )
    }
}
export default MapComponent;
