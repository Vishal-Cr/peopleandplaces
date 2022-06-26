import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./styles/NewPlace.css";
import { useHistory } from "react-router-dom";
import InputDiv from "../Form-components/InputDiv";
import { useForm } from "../hooks/use-form";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validator";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../UI-elements/LoadingSpinner";

const NewPlace = () => {
  const { sendRequest, clearError, isError, isLoading } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form className="place-form" onSubmit={clearError}>
        {isLoading && <LoadingSpinner asOverlay />}

        <InputDiv
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <InputDiv
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <InputDiv
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <button
          type="submit"
          disabled={!formState.isValid}
          onClick={placeSubmitHandler}
        >
          ADD PLACE
        </button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
