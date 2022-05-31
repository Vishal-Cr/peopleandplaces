import React from 'react'
import Card from '@mui/material/Card';
import CardContent  from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlaceItem from './PlaceItem';
const PlaceList = (props) => {
  
  if(props.items.length===0){
return (<Card className='user-item'>
    <CardContent>
    
    <Typography variant="body1" color="#fff" className='Card-text'>
    
         <h1>No Places Found.Maybe Create One?</h1>
    
         </Typography>

         <button>Share Place</button>
    
            </CardContent>
    
    </Card>)
  }
    return (
         
    <ul className='place-list'>
        {props.items.map(place=><PlaceItem key={place.id} 
        id={place.id}
        image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />)}
        </ul>
  )
}

export default PlaceList