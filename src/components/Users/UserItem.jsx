import React from "react";

import "./styles/UserItem.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography, Grid } from "@mui/material";

const UserItem = (props) => {
  return (
    <Grid sx={{ flexGrow: 4 }} container spacing="2">
      <Grid item xs={12}>
        <Card
          sx={{
            background: "transparent",
            border: "2px solid #ffdd40",
            transition: "all 0.5s ease",
            borderRadius: "10px",
            "&:hover": {
              background: "rgb(7, 177, 77, 0.42)",
            },
          }}
        >
          <Link to={`/${props.id}/places`} style={{ textDecoration: "none" }}>
            <CardMedia
              component="img"
              alt="Avatar-image"
              className="user-item__image"
              height="140"
              src={`${import.meta.env.VITE_APP_BASE_URL}/${props.image}`}
              sx={{ widht: "2rem", height: "14rem" }}
            />

            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: "3px",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                {props.name}
              </Typography>

              <Typography variant="h6" color="orange">
                {props.placeCount}
                {`${props.placeCount > 1 ? " Places" : " Place"}`}
              </Typography>
            </CardContent>
          </Link>
        </Card>
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};

export default UserItem;
