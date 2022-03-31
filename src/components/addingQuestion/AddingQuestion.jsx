import UserInput from "../Login/UI/userInput/user_input_validations";
import classes from "../../components/Login/adding-survey/Adding_survey_Form.module.css";
import { Fragment } from "react/cjs/react.production.min";

const isNotEmpty = (value) => value.trim() !== "" && value.length > 2;
const AddingQuestion = (props) => {
  const {
    value: enteredQuestionValue,
    isValid: isQuestionValid,
    hasError: hasQuestionError,
    valueChangeHandler: QuestionChangeHandler,
    inputBlurHandler: QuestionBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringQuestionClasses = hasQuestionError
    ? classes.invalidForm
    : classes.InputCss;

  let formIsValid = false;
  if (isQuestionValid) {
    formIsValid = true;
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      props.questions(enteredQuestionValue);
    }
  }
  return (
    <Fragment>
      <div className="p-4 bg-[#689911] text-white text-center uppercase">
        Question Entry
      </div>
      <form className={classes.Survey} onSubmit={submitHandler}>
        <div className={classes.InputControl}>
          <label htmlFor="">Enter Question Name</label>
          <input
            className={enteringQuestionClasses}
            value={enteredQuestionValue}
            onChange={QuestionChangeHandler}
            onBlur={QuestionBlurHandler}
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
          {props.buttonStatus ? props.buttonStatus : "Add Question"}
        </button>
      </form>
    </Fragment>
  );
};

export default AddingQuestion;
