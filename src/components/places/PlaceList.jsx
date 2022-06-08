import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PlaceItem from "./PlaceItem";
import "./styles/PlaceList.css";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="place_user-item">
        <CardContent>
          <Typography variant="heading" color="#333" className="Card-text">
            <h1>No Places Found.Maybe Create One?</h1>
          </Typography>

          <button>
            <Link to="/places/new">Share Place</Link>
          </button>
        </CardContent>
      </Card>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          location={place.location}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
