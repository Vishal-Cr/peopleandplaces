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
import ImageUpload from "../ImageUpload/imageUpload";
import Button from "../Form-components/Button";
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <form className="place-form" onSubmit={clearError}>
        {isLoading && <LoadingSpinner asOverlay />}

        <InputDiv
          id="title"
          element="input"
          type="text"
          placeholder="Enter Name of the place you visited Recently."
          label="Name Of the Place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <InputDiv
          id="description"
          element="textarea"
          label="Description of the Place"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          placeholder="How would you describe the place?"
          onInput={inputHandler}
        />
        <InputDiv
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          placeholder="Enter Address of the place(try to be accurate)"
          onInput={inputHandler}
        />
        <ImageUpload id="image" onInput={inputHandler} />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={placeSubmitHandler}
        >
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
