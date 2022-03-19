import UserInput from "../UI/userInput/user_input_validations";
import classes from "./Adding_survey_Form.module.css";
const isNotEmpty = (value) => value.trim() !== "" && value.length > 2;
const AddingSurveyForm = (props) => {
  const {
    value: enteredSurveyNameValue,
    isValid: isSurveyNameValid,
    hasError: hasSurveyNameError,
    valueChangeHandler: SurveyNameChangeHandler,
    inputBlurHandler: SurveyNameBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredSurveyDescriptionValue,
    isValid: isSurveyDescriptionValid,
    hasError: hasSurveyDescriptionError,
    valueChangeHandler: SurveyDescriptionChangeHandler,
    inputBlurHandler: SurveyDescriptionBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringSurveyNameClasses = hasSurveyNameError
    ? classes.invalidForm
    : classes.InputCss;
  const enteringDescriptionClasses = hasSurveyDescriptionError
    ? classes.invalidForm
    : classes.InputCss;

  let formIsValid = false;
  if (isSurveyNameValid && isSurveyDescriptionValid) {
    formIsValid = true;
  }

  const surveyInformation = {
    name: enteredSurveyNameValue,
    description: enteredSurveyDescriptionValue,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.surveys(surveyInformation);
      props.close();
    }
  };
  return (
    <form className={classes.Survey} onSubmit={submitHandler}>
      <div className={classes.InputControl}>
        <label htmlFor="">Enter Survey Name</label>
        <input
          className={enteringSurveyNameClasses}
          value={enteredSurveyNameValue}
          onChange={SurveyNameChangeHandler}
          onBlur={SurveyNameBlurHandler}
          type="text"
          placeholder="Survey name"
          id="form-element"
        />
      </div>
      <div className={classes.InputControl}>
        <label htmlFor="">Enter Survey Description</label>
        <textarea
          rows={5}
          className={enteredSurveyDescriptionValue}
          value={enteringDescriptionClasses}
          onChange={SurveyDescriptionChangeHandler}
          onBlur={SurveyDescriptionBlurHandler}
          placeholder="Survey Description "
          id="form-element"
        />
      </div>

      <button
        className="disabled:opacity-75 mb-8"
        disabled={!formIsValid}
        type="submit"
        onClick={() => submitHandler}
      >
        Add survey
      </button>
    </form>
  );
};

export default AddingSurveyForm;
