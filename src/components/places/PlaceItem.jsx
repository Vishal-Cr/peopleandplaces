import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const PlaceItem = (props) => {
  return (
      <Card>
<CardContent>
    <li className=''>
        <div>
            <img src={props.image} alt={props.title} />
        
        </div>
        <div>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div>
            <button>View On Map</button>
            <button>Edit</button>
            <button>Delete</button>
        </div>
        </li>
        </CardContent>
      </Card>
  )
}

export default PlaceItem