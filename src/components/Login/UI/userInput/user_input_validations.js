/** @format */

import React, { useState } from "react";

const UserInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.currentTarget.value);
  };

  const captionChangeHandler = (event) => {
    setEnteredValue(event.currentTarget.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    captionChangeHandler,
    inputBlurHandler,
  };
};
export default UserInput;
