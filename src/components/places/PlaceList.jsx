//This Page is linked to UserPlaces comp in pages folder.
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PlaceItem from "./PlaceItem";
import "./styles/PlaceList.css";
import Button from "../Form-components/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="place_user-item" sx={{ height: "100vh" }}>
        <CardContent>
          <Typography variant="heading" className="Card-text">
            <h1 style={{ color: "darkOrange" }}>
              No Places Found.Maybe Create One?
            </h1>
          </Typography>

          <Button>
            <Link
              to="/places/new"
              style={{
                color: "#fff",
                "&:hover": {
                  color: "#1F5156",
                },
                textDecoration: "none",
              }}
            >
              Share Place
            </Link>
          </Button>
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
          image={place.image}
          title={place.title}
          location={place.location}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
