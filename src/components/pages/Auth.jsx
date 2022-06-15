import React, { useState, useContext } from "react";
import { useForm } from "../hooks/use-form";
import { Container } from "@material-ui/core";
import InputDiv from "../Form-components/InputDiv";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../util/validator";
import "./styles/Auth.css";
import { AuthContext } from "../context/AuthContext";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
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
  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    auth.login();
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
    console.log(setFormData);
  };
  return (
    <div className="auth_container">
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
  );
};

export default Auth;
