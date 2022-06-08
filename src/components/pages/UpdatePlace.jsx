import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import Card from "@mui/material/Card";
import InputDiv from "../Form-components/InputDiv";
import { useForm } from "../hooks/use-form";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validator";
import "./styles/UpdatePlace.css";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Eifel Tower",
    description: "Biggest steel tower",
    imageUrl:
      "data:image/jpeg;base64,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",
    address: " Champ de Mars, 5 Av. Anatole France, 75007 Paris",
    location: {
      lat: 48.8584,
      lng: 2.2945,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "The Taj Mahal",
    description: "World's Eight Wonder",
    imageUrl:
      "https://s3.amazonaws.com/files.gofox.com/wp-content/uploads/2020/03/Taj-Mahal-scaled.jpeg",
    address: " Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    location: {
      lat: 27.1751,
      lng: 78.0421,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: false,
          },
          description: {
            value: identifiedPlace.description,
            isValid: false,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);
  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="notFound_text">
        <Card className="notFound_card">
          <h2>Error:404, </h2>
          <h2>Could not find Any place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Container>
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <InputDiv
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <InputDiv
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </button>
      </form>
      )
    </Container>
  );
};

export default UpdatePlace;
