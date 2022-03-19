import Header from "../partials/Header";
import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import AddNewSurvey from "../components/Login/UI/empty/addNewTask";
import Modal from "../components/Login/UI/modal/Modal";
import { Fragment } from "react/cjs/react.production.min";
import AddingSurveyForm from "../components/Login/adding-survey/Adding_Survey_Form";
import AddingQuestions from "../components/Login/UI/AddingAnswerSections/AddingQuestions";
import QuestionImage from "../images/assets/add_new_stuff2.png";

const AddSurveyScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [surveys, setSurveys] = useState({});

  function openModalHandler() {
    setModalOpen(true);
  }

  function switchModalStatusHandler() {
    setModalOpen(!isModalOpen);
  }

  const addingSurveyHandler = (survey) => {
    setSurveys(survey);
  };

  const surveyLength = Object.keys(surveys).length;
  console.log(surveys);

  return (
    <Fragment>
      {isModalOpen && (
        <Modal onClose={switchModalStatusHandler}>
          <div className="text-center bg-[#689911] p-8 text-white font-bold text-lg ">
            Adding Survey
          </div>
          <div className="my-0 mx-auto">
            <AddingSurveyForm
              surveys={addingSurveyHandler}
              close={switchModalStatusHandler}
            />
          </div>
        </Modal>
      )}
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* //todo adding all survey */}
          {surveyLength !== 0 ? (
            <div className="w-3/4 my-0 mx-auto">
              <AddingQuestions
                image={QuestionImage}
                name={surveys.name}
                description={surveys.description}
              />
            </div>
          ) : (
            <div className="pt-8 my-0 mx-auto">
              <AddNewSurvey openModal={openModalHandler} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AddSurveyScreen;
