import React from 'react';
import {ListItem,ListItemAvatar,Avatar,List,ListItemText,Typography} from "@material-ui/core";
import './styles/UserItem.css';
import {Link} from 'react-router-dom';
const UserItem = (props) => {
  return (
    <List className='user-item'>
      <Link to={`/${props.id}/places`}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar className="user-item__image">
          <Avatar alt="Avatar-image" src={props.image} />
        </ListItemAvatar>
        <ListItemText
        
       
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}

                component="header"
                variant="h5"
                style={{color:'#fff'}}
              >
               {props.name}
            </Typography>
              <Typography
                sx={{ display: 'inline' }}
                style={{color:'#fff'}}
                component="subHeader"
                variant="h6"
               
              >
                 {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </Typography>
              
              
            </React.Fragment>
          }
        />
      </ListItem>
      </Link>

  </List>
  )
}

export default UserItem;