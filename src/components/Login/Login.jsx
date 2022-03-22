import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { useState } from "react";
import { auth } from "../../../firebase";
import UserInput from "./UI/userInput/user_input_validations";

const isNotEmpty = (value) => value.trim() !== "" && value.length > 2;
const isEmailValidated = (value) => value.includes("@") || value.trim() !== "";
const Login = ({ signUpHandler }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
  const enteringPasswordClasses = hasPasswordError
    ? classes.invalidForm
    : classes.InputCss;

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    try {
      const response = await auth.signInWithEmailAndPassword(
        enteredEmailValue,
        enteredPasswordValue
      );
      const data = await response.user;
      if (data?.email) {
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let formIsValid = false;
  if (isEmailValid && isPasswordValid) {
    formIsValid = true;
  }

  const switchAccountHandler = () => {
    signUpHandler();
  };

  return (
    <form className={classes.Login} onSubmit={submitHandler}>
      <div className={classes.LoginTitle}>Login</div>

      <div className={classes.InputControl}>
        <label htmlFor="">Enter Password</label>
        <input
          className={enteringEmailClasses}
          value={enteredEmailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
          placeholder="Email"
          id="form-element"
        />
      </div>
      <div className={classes.InputControl}>
        <label htmlFor="">Enter Password</label>
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

      <button type="submit" onClick={() => submitHandler}>
        {isLoading ? "Loading..." : "Login"}
      </button>
      <div className={classes.continueWith}>
        If you don't have account{" "}
        <span onClick={switchAccountHandler}>Sign Up</span>
      </div>
    </form>
  );
};
export default Login;
