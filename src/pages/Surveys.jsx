import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useCallback, useEffect } from "react";
import imageURL from "../images/assets/add_new_question.png";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Login/UI/modal/Modal";
import Alert from "../components/confirmationModal/Confirmation";
import AlertMessage from "../components/Messages/Alert";
import { useNavigate } from "react-router-dom";
import EditSurvey from "../components/editSurvey/EditSurvey";

const SurveysScreen = () => {
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setModelOpen] = useState(false);
  const [surveyId, setSurveyId] = useState("");
  const [isEditModalOpen, setEditModal] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState({});
  const [editedSurveyData, setEditedSurvey] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(1);

  const navigate = useNavigate();

  const surveysHandler = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await axios.get(
        "https://ritco-app-default-rtdb.firebaseio.com/surveys.json"
      );
      const data = await response.data;
      let arrayOfData = [];

      for (let i in data) {
        arrayOfData.push({ id: i, ...data[i] });
      }
      setSurveys(arrayOfData);
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

  function closeModal() {
    setModelOpen(false);
    setEditModal(false);
  }

  async function deleteSurveyHandler() {
    try {
      setDeleting(true);
      await axios
        .delete(
          `https://ritco-app-default-rtdb.firebaseio.com/surveys/${surveyId}.json`
        )
        .then(() => {
          setSurveys((currentSurveys) =>
            currentSurveys.filter((survey) => survey.id !== surveyId)
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

  function gotoSurveyHandler(id) {
    navigate(`/surveys/${id}`);
  }

  // modal for editStuff
  function openEditableModalHandler(id) {
    setEditModal(true);
    setSurveyId(id);
    console.log(id);
    const selectedSurvey = surveys.filter((survey) => survey.id === id);
    setSelectedSurvey(selectedSurvey);
  }

  async function editChangableHandler(dataInfo) {
    try {
      setIsEditing(true);
      const response = await axios.patch(
        `https://ritco-app-default-rtdb.firebaseio.com/surveys/${surveyId}.json`,
        dataInfo
      );
      const data = response.data;
      let dataArray = [];
      console.log(data);
      if (data) {
        setIsEditing(false);
        closeModal();
        window.location.reload(true);
      }
    } catch (error) {
      setIsEditing(false);
      console.log(error);
    }
  }

  function openModalHandler(id) {
    setModelOpen(true);
    setSurveyId(id);
  }

  return (
    <>
      {isEditModalOpen && (
        <Modal onClose={closeModal}>
          <EditSurvey
            survey={selectedSurvey}
            editedSurvey={setEditedSurvey}
            editSurveyHandler={editChangableHandler}
            name={isEditing ? "Updating..." : " Add survey"}
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
          <div>
            <div className="text-center font-bold pt-8 text-3xl">Surveys</div>
            <div className="text-center  p-8 text-lg w-[70%] mx-auto my-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              iusto quaerat quas vitae odit ducimus doloribus repellendus
              temporibus rem repudiandae. Non esse sit quos magnam quisquam ab
              reprehenderit deserunt laboriosam?
            </div>
            {isLoading ? (
              <div className="text-center flex flex-col item-center justify-center h-[300px] mx-auto my-0 w-[10px]">
                <ClipLoader color="green-500" />
              </div>
            ) : (
              <div className="my-0 mx-auto w-[70%] grid grid-cols-2 gap-4 align-center justify-center ">
                {surveys
                  .map((survey) => {
                    return (
                      <div
                        key={survey.id}
                        className="relative bg-gradient-to-t from-green-500 to-green-400  h-[300px] p-4 pt-8 text-white shadow-md shadow-blue-500/40 hover:shadow-indigo-500/40 cursor-pointer"
                      >
                        <div
                          onClick={() => {
                            gotoSurveyHandler(survey.id);
                          }}
                        >
                          <div className="h-[100px] ">
                            <img
                              className="object-contain h-[100%] w-[100%]"
                              src={imageURL}
                              alt={imageURL}
                            />
                          </div>
                          <div className="text-3xl font-bold text-center">
                            {survey.surveyTitle}
                          </div>
                          <div className="text-center">
                            {survey.surveyDescription}
                          </div>
                        </div>

                        <div className="flex gap-4 flex-reverse pr-4 pb-2 align-bottom absolute bottom-0 right-0 z-10 ">
                          <div
                            className="p-1 "
                            onClick={() => openEditableModalHandler(survey.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </div>
                          <div
                            className=" py-1 px-2  text-center"
                            onClick={() => openModalHandler(survey.id)}
                          >
                            <FontAwesomeIcon icon={faRemove} />
                          </div>
                        </div>
                        <div className="absolute left-0 bottom-0 pb-2 pl-2">
                          <div className="font-bold">{`${survey.surveyQuestions.length} Questions`}</div>
                        </div>
                      </div>
                    );
                  })
                  .reverse()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SurveysScreen;
