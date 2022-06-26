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
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",

          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        //the fetch api takes 404 and other error responses also as a valid error.

        auth.login(responseData.user["id"]);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",

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

        auth.login(responseData.user["id"]);
      } catch (err) {}
    }
  };

  const signupClickHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs, //loads the previous state
          name: undefined, //overrides just the name to be undefined
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
              />
            )}
            {!isLogin && <ImageUplaod center id="image" />}
            <InputDiv
              element="input"
              id="email"
              type="email"
              label="EMAIL"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please Enter a Valid Email Address"
              onInput={inputHandler}
            />
            <InputDiv
              validators={[VALIDATOR_MINLENGTH(7)]}
              element="input"
              id="password"
              type="password"
              label="password"
              errorText="Please enter password of at least 7 characters"
              onInput={inputHandler}
            />
            <button
              type="submit"
              disabled={!formState.isValid}
              className={!formState.isValid ? "btn" : " btn login_btn"}
            >
              {isLogin ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          {isLogin && "Not a member?"}
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
