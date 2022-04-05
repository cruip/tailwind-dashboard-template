import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import imageUrl from "../images/assets/add_new_question.png";
import { faEdit, faRemove, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../components/confirmationModal/Confirmation";
import AlertMessage from "../components/Messages/Alert";
import Modal from "../components/confirmationModal/Confirmation";
import AddingQuestion from "../components/addingQuestion/AddingQuestion";
import EditQuestion from "../components/editingQuestion/EditQuestion";

const SurveyDetails = () => {
  const params = useParams();
  const [survey, setSurvey] = useState({});
  const [questions, setQuestion] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setModelOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [isDeleting, setDeleting] = useState(false);
  const [isAddingQuestionOpen, setAddingQuestion] = useState(false);
  const [isCreatingNew, setCreatingNew] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [isEditing, setEditing] = useState(false);

  const surveysHandler = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await axios.get(
        `https://ritco-app-default-rtdb.firebaseio.com/surveys/${params.id}.json`
      );
      const data = await response.data;

      setSurvey(data);
      setQuestion(data.surveyQuestions);
      if (data) {
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    surveysHandler();
  }, [surveysHandler]);

  function openModalHandler(id) {
    setModelOpen(true);
    console.log(id);
    setQuestionId(id);
  }

  function closeModal() {
    setModelOpen(false);
    setAddingQuestion(false);
    setIsEditable(false);
  }

  async function deleteSurveyHandler() {
    try {
      setDeleting(true);
      await axios
        .delete(
          `https://ritco-app-default-rtdb.firebaseio.com/surveys/${params.id}/surveyQuestions/${questionId}.json`
        )
        .then(() => {
          setQuestion((currentQuestions) =>
            currentQuestions.filter((_, index) => index !== questionId)
          );
          setDeleting(false);
        })
        .then(() => {
          closeModal();
        });
    } catch (error) {
      console.log(error);
    }
  }

  function onOpenAddQuestionHandler() {
    setAddingQuestion(true);
  }

  const user = localStorage.getItem("username");
  // console.log(user);

  async function addQuestionHandler(question) {
    try {
      setCreatingNew(true);
      const datas = questions.push(question);
      setSurvey(datas);
      if (question) {
        const response = await axios.patch(
          `https://ritco-app-default-rtdb.firebaseio.com/surveys/${params.id}/surveyQuestions.json`,
          { ...questions }
        );
        const datasInfo = await response.data;
        if (datasInfo) {
          closeModal();
          setCreatingNew(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function openEditableModal(id) {
    setIsEditable(true);
    const selectedQuest = questions.filter((element, index) => index === id);
    setSelectedQuestion(selectedQuest);
    setQuestionId(id);
  }

  async function getSelectedQuestion(question) {
  
    try {
      setEditing(true);
      const response = await axios.patch(
        `https://ritco-app-default-rtdb.firebaseio.com/surveys/${params.id}/surveyQuestions.json`,
        {[questionId]:question}
      );
      const data = await response.data;
      if (data) {
        setEditing(false);
        closeModal();
      }
    } catch (error) {
      setEditing(false);
      console.log(error);
    }
  }

  const filteredQuestionsArray = questions.filter(data => data!= null);

 

  return (
    <>
      {isEditable && (
        <Modal onClose={closeModal}>
          <EditQuestion
            name={isEditing ? "Editing..." : "Edit"}
            questionSelected={selectedQuestion}
            clicked={getSelectedQuestion}
          />
        </Modal>
      )}
      {isAddingQuestionOpen && (
        <Modal onClose={closeModal}>
          <AddingQuestion
            questions={addQuestionHandler}
            buttonStatus={isCreatingNew ? "Creating" : "Add Question"}
          />
        </Modal>
      )}
      {isModalOpen && (
        <Alert onClose={closeModal}>
          <AlertMessage
            buttonName={isDeleting ? "Deleting..." : "Delete"}
            cancelClicked={closeModal}
            confirmClicked={deleteSurveyHandler}
          />
        </Alert>
      )}
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          <div className="text-center flex flex-row align-center justify-center h-[500px] ">
            {isLoading ? (
              <div className="w-[100px] text-center  flex flex-col align-center justify-center">
                <ClipLoader color="green" />
              </div>
            ) : (
              <div className="w-[80%] relative">
                <div className="bg-gradient-to-t from-green-500 to-green-400 h-[300px]relative mx-auto my-0 mt-8  p-4 pt-8 text-white shadow-md shadow-blue-500/40 hover:shadow-indigo-500/40">
                  <div className="w-[120px] text-center mx-auto my-0">
                    <img
                      className="object-contain"
                      src={imageUrl}
                      alt={imageUrl}
                    />
                  </div>
                  <div className="font-bold text-2xl">{survey.surveyTitle}</div>
                  <div>{survey.surveyDescription}</div>
                </div>
                <div
                  className="absolute top-12 right-4 p-2 text-white w-[100px] cursor-pointer"
                  onClick={onOpenAddQuestionHandler}
                >
                  <div className="font-bold">
                    <FontAwesomeIcon icon={faAdd} size="2x" />
                  </div>
                  <div className="text-sm">New Question</div>
                </div>
                <div>
                  <div className="font-bold text-2xl pt-8 pb-2 text-left pl-8 ">
                    {` Survey Questions (${questions.length})`}
                  </div>
                  <div className="h[2px] bg[black]"></div>
                  {filteredQuestionsArray.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="px-8 py-2 mx-8 my-4 bg-[#CECECE] flex justify-between items-center "
                      >
                        <div className="text-left">{element}</div>
                        <div
                          className="flex flex-row "
                          onClick={() => openEditableModal(index)}
                        >
                          <div className="pr-2 mr-2 cursor-pointer">
                            <FontAwesomeIcon icon={faEdit} />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => openModalHandler(index)}
                          >
                            <FontAwesomeIcon icon={faRemove} color="red" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyDetails;
