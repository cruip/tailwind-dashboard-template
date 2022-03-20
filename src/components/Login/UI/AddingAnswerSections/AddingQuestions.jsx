import { useState } from "react";
import AddingQuestion from "../../../addingQuestion/AddingQuestion";
import Modal from "../modal/Modal";
import Empty from "../empty/empty";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddingQuestions = (props) => {
  const [isModalOpen, setOpenMdal] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function openHideHandler() {
    setOpenMdal(!isModalOpen);
  }
  const updatedArray = [];
  function QuestionArray(question) {
    updatedArray.push(...questions, question);
    setQuestion(updatedArray);
  }
  console.log(questions);
  const sendToDatabaseHandler = async () => {
    try {
      setIsLoading(true);
      if (questions.length !== 0) {
        const response = await axios.post(
          "https://ritco-app-default-rtdb.firebaseio.com/surveys.json",
          {
            surveyDescription: props.description,
            surveyTitle: props.name,
            surveyQuestions: questions,
          }
        );
        if (response.status == 200) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {isModalOpen && (
        <Modal onClose={openHideHandler}>
          <AddingQuestion questions={QuestionArray} />
        </Modal>
      )}
      <div>
        <div className="bg-[#02ca13] mt-8  p-4 flex flex-1 align-center rounded-xl ">
          <div className="w-96 pr-5">
            <img src={props.image} alt={props.image} />
          </div>
          <div className="flex flex-col align-center  justify-center text-white">
            <div className="font-bold, text-3xl uppercase">{props.name}</div>
            <div className="w-3/4">{props.description}</div>
            <div>
              <button className="rounded-xl" onClick={openHideHandler}>
                Add Questions
              </button>
            </div>
          </div>
        </div>
        {questions.length === 0 ? (
          <div className="text-center">
            <Empty />
          </div>
        ) : (
          <div className="pt-8">
            {questions.map((element, index) => (
              <div key={index} className="p-2 m-2 bg-[#CECECE]">
                Q {index}:{" "}
                {`${element.substring(0, 1).toUpperCase()}${element
                  .substring(1, 500)
                  .toLowerCase()} ?`}
              </div>
            ))}
          </div>
        )}
        {questions.length !== 0 && (
          <div className="text-right pr-2 pb-20">
            <button className="px-10" onClick={sendToDatabaseHandler}>
              {isLoading ? "Proccessing..." : "Save Survey"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddingQuestions;
