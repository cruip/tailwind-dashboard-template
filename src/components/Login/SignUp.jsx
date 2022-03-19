import React, { useState } from "react";
import UserInput from "./UI/userInput/user_input_validations";
import classes from "./login.module.css";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router";

const isNotEmpty = (value) => value.trim() !== "" && value.length > 5;
const isEmailValidated = (value) => value.includes("@") || value.trim() !== "";
const SignUp = ({ signUpHandler }) => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const {
    value: enteredNameValue,
    isValid: isNameValid,
    hasError: hasNameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredEmailValue,
    isValid: isEmailValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = UserInput(isEmailValidated);

  const {
    value: enteredPasswordValue,
    isValid: isPasswordValid,
    hasError: hasPasswordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringEmailClasses = hasEmailError
    ? classes.invalidForm
    : classes.InputCss;
  const enteringNameClasses = hasNameError
    ? classes.invalidForm
    : classes.InputCss;
  // const enteredContactNumberClasses = hasContactNumberError
  //   ? classes.invalidForm
  //   : classes.InputCss;
  const enteringPasswordClasses = hasPasswordError
    ? classes.invalidForm
    : classes.InputCss;
  // const enteringPasswordConfirmClasses = hasConfirmPasswordError
  //   ? classes.invalidForm
  //   : classes.InputCss;

  const submitHandler = async (event) => {
    setIsloading(true);
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const signInInformation = {
      username: enteredNameValue,
      email: enteredEmailValue,
      password1: enteredPasswordValue,
      password2: enteredPasswordValue,
    };
    try {
      setIsloading(true);
      const data = await auth.createUserWithEmailAndPassword(
        enteredEmailValue,
        enteredPasswordValue
      );
      const user = await data.user;
      console.log(user);
      if (user) {
        setIsloading(false);
        localStorage.setItem("username", user.email.toString());
        localStorage.setItem("names", enteredNameValue);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      setIsloading(false);
    }
  };

  let formIsValid = false;
  if (isEmailValid && isPasswordValid && isNameValid) {
    formIsValid = true;
  }

  const switchAccountHandler = () => {
    signUpHandler(signUpHandler());
  };

  return (
    <form className={classes.Login} onSubmit={submitHandler}>
      <div className={classes.LoginTitle}>Sign Up</div>
      <div className={classes.InputControl}>
        <label htmlFor="">Your Full Names</label>
        <input
          className={enteringNameClasses}
          value={enteredNameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
          placeholder="Names"
          id="form-element"
        />
      </div>
      <div className={classes.InputControl}>
        <label htmlFor="">Enter your email</label>
        <input
          className={enteringEmailClasses}
          value={enteredEmailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
          placeholder="Email"
          id="form-element"
        />
      </div>

      <div className={classes.InputControl}>
        <label htmlFor="">Create Password</label>
        <input
          className={enteringPasswordClasses}
          value={enteredPasswordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          type="password"
          placeholder="Password"
          id="form-element"
        />
      </div>

      <button type="submit" onClick={submitHandler}>
        {isLoading ? "Loading..." : "SignUp"}
      </button>
      <div className={classes.continueWith}>
        Do you have account please?
        <span onClick={switchAccountHandler}> login</span>
      </div>
    </form>
  );
};

export default SignUp;
