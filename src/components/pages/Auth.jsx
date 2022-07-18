import React, { useState, useContext, useEffect } from "react";
import { useForm } from "../hooks/use-form";
import { useHttpClient } from "../hooks/http-hook";
import InputDiv from "../Form-components/InputDiv";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../util/validator";
import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../UI-elements/LoadingSpinner";
import ImageUplaod from "../ImageUpload/imageUpload";
import "./styles/Auth.css";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      try {
        const formData = new FormData(); // inbuilt Browser API
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users/signup`,

          "POST",
          formData
          //for formData fetch api automatically sets the right headers.
        );
        //the fetch api takes 404 and other error responses also as a valid error.

        auth.login(responseData.user["id"], responseData.Authtoken);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users/login`,

          //the fetch api takes 404 and other error responses also as a valid error.
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.user["id"], responseData.Authtoken);
      } catch (err) {}
    }
  };

  const signupClickHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs, //loads the previous state
          name: undefined, //overrides just the name to be undefined
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const errorHandler = () => {
    clearError();
  };
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      <div className="auth_container">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="auth_form_container">
          <h1>{isLogin ? "Login" : "Signup"}</h1>
          <hr />
          <form onSubmit={authSubmitHandler} className="auth_form">
            {!isLogin && (
              <InputDiv
                element="input"
                id="name"
                label="Username"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter your name"
                onInput={inputHandler}
                placeholder="Please Enter Your Nickname"
              />
            )}
            {!isLogin && (
              <ImageUplaod
                center
                id="image"
                onInput={inputHandler}
                errorText="Please Provide an Image."
              />
            )}
            <InputDiv
              element="input"
              id="email"
              type="email"
              label="EMAIL"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please Enter a Valid Email Address"
              onInput={inputHandler}
              placeholder="Enter Email"
            />
            <InputDiv
              validators={[VALIDATOR_MINLENGTH(7)]}
              element="input"
              id="password"
              type="password"
              label="password"
              errorText="Please enter password of at least 7 characters"
              onInput={inputHandler}
              placeholder="Enter Password"
            />
            <button
              type="submit"
              disabled={!formState.isValid}
              className={!formState.isValid ? "btn" : " btn login_btn"}
            >
              {isLogin ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          <span
            style={{ color: "orange", display: "block", margin: "0.5rem 0" }}
          >
            {isLogin && "Not a member?"}
          </span>
          <button
            onClick={signupClickHandler}
            // disabled={!formState.isValid}
            className="btn signup_btn "
          >
            {isLogin ? "Register" : "LOGIN"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
