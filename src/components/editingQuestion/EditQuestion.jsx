import UserInput from "../../components/Login/UI/userInput/editable_user_validation";
import classes from "./EditQuestion.module.css";
const isNotEmpty = (value) => value.trim() !== "" && value.length > 2;
const EditQuestion = (props) => {
  const {
    value: enteredQuestionNameValue,
    isValid: isQuestionNameValid,
    hasError: hasQuestionNameError,
    valueChangeHandler: QuestionNameChangeHandler,
    inputBlurHandler: QuestionNameBlurHandler,
  } = UserInput(isNotEmpty, props.questionSelected[0]);

  const enteringQuestionNameClasses = hasQuestionNameError
    ? classes.invalidForm
    : classes.InputCss;

  let formIsValid = false;
  if (isQuestionNameValid) {
    formIsValid = true;
  }

  const QuestionInformation = {
    QuestionTitle: enteredQuestionNameValue,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.clicked(enteredQuestionNameValue);
    }
  };

  return (
    <form className={classes.Question} onSubmit={submitHandler}>
      <div className={classes.InputControl}>
        <label htmlFor="">Enter Question Name</label>
        <input
          className={enteringQuestionNameClasses}
          value={enteredQuestionNameValue}
          onChange={QuestionNameChangeHandler}
          onBlur={QuestionNameBlurHandler}
          type="text"
          placeholder="Question name"
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

export default EditQuestion;
