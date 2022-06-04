import React from 'react';
import { MapContainer,Marker,Popup, TileLayer, useMap } from 'react-leaflet'

const Map = (props) => {
    const cordinates=props.location;
    let position=Object.keys(cordinates).map((key)=>cordinates[key]);
  
    return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height:'100%',width:'100%',borderRadius:'10px'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map