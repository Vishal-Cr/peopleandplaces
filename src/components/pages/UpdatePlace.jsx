import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import Card from "@mui/material/Card";
import InputDiv from "../Form-components/InputDiv";
import { useForm } from "../hooks/use-form";
import ErrorModal from "../Modal/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validator";
import "./styles/UpdatePlace.css";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UI-elements/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import Button from "../Form-components/Button";
const UpdatePlace = () => {
  const { isError, isLoading, sendRequest, clearError } = useHttpClient();
  const placeId = useParams()["placeId"];
  const auth = useContext(AuthContext);
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();

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

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.places);
        setFormData(
          {
            title: {
              value: responseData.places.title,
              isValid: false,
            },
            description: {
              value: responseData.places.description,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (!loadedPlace && !isError) {
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
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
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
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
        )
      </Container>
    </React.Fragment>
  );
};

export default UpdatePlace;
