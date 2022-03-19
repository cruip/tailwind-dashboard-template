import addNewStaff from "../../../../images/assets/add_new_question.png";
import classes from "./AddNewSurvey.module.css";
const AddNewSurvey = (props) => (
  <div className="pt-8 my-0 mx-auto">
    <div children={classes.imageMiddle}>
      <img src={addNewStaff} alt="hahah" />
    </div>
    <div className="text-center">
      <button>Add New Survey</button>
    </div>
  </div>
);

export default AddNewSurvey;
