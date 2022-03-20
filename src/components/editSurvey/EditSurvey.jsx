import UserInput from "../../components/Login/UI/userInput/editable_user_validation";
import classes from "./EditSurvey.module.css";
const isNotEmpty = (value) => value.trim() !== "" && value.length > 2;
const EditSurvey = (props) => {
  const {
    value: enteredSurveyNameValue,
    isValid: isSurveyNameValid,
    hasError: hasSurveyNameError,
    valueChangeHandler: SurveyNameChangeHandler,
    inputBlurHandler: SurveyNameBlurHandler,
  } = UserInput(isNotEmpty, props.survey[0].surveyTitle);
  const {
    value: enteredSurveyDescriptionValue,
    isValid: isSurveyDescriptionValid,
    hasError: hasSurveyDescriptionError,
    valueChangeHandler: SurveyDescriptionChangeHandler,
    inputBlurHandler: SurveyDescriptionBlurHandler,
  } = UserInput(isNotEmpty, props.survey[0].surveyDescription);

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
    surveyTitle: enteredSurveyNameValue,
    surveyDescription: enteredSurveyDescriptionValue,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.editedSurvey(surveyInformation);
    }
    props.editSurveyHandler(surveyInformation);
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
          className={enteringDescriptionClasses}
          value={enteredSurveyDescriptionValue}
          onChange={SurveyDescriptionChangeHandler}
          onBlur={SurveyDescriptionBlurHandler}
          placeholder="Survey Description"
          id="form-element"
        />
      </div>

      <button
        className="disabled:opacity-75 mb-8"
        disabled={!formIsValid}
        type="submit"
        onClick={() => submitHandler}
      >
        {props.name}
      </button>
    </form>
  );
};

export default EditSurvey;
