import React from 'react'
import Card from '@mui/material/Card';
import './styles/PlaceItem.css';
import CardContent from '@mui/material/CardContent';
const PlaceItem = (props) => {
  return (
      <Card className='card' 
      sx={{ 
          backgroundColor: '#dddada',
            backgroundFilter:'blur(5px)',
            borderRadius:'26px',
            boxShadow:'35px 35px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)'

}}
      >
<CardContent className='card_container'>
    <li className='place-item'>
        <div className='card_image_container'> 
            <img src={props.image} className='card_image' alt={props.title} />
        
        </div>
        <div className='card_info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div>
            <button className='card_btn'>View On Map</button>
            <button className='card_btn'>Edit</button>
            <button className='card_btn'>Delete</button>
        </div>
        </li>
        </CardContent>
      </Card>
  )
}

export default PlaceItem