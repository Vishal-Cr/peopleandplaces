import React from 'react';

import './styles/UserItem.css';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent  from '@mui/material/CardContent';
import { Typography } from '@mui/material';
const UserItem = (props) => {
  return (
    <Card className='user-item'>
      <Link to={`/${props.id}/places`} exact='true'>
    
       <CardHeader
  avatar={<Avatar style={{width:'5rem',height:'5rem',margin:'0px',padding:'0px'}}alt="Avatar-image" className="user-item__image" src={props.image} />}
       
       />
       <CardContent >
       <Typography variant="h6" color="#fff"  className='Card-text'>
          {props.name}
        </Typography>
       <Typography variant="body1" color="#fff" className='Card-text'>
          {props.placeCount }{`${props.placeCount>1?' Places':' place'}`}
        </Typography>
       </CardContent>
            
      </Link>

  </Card>
  )
}

export default UserItem;