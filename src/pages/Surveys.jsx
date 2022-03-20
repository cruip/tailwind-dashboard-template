import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useCallback, useEffect } from "react";

const SurveysScreen = () => {
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsloading] = useState(false);
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

  console.log(surveys);

  return (
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
              <ClipLoader color="blue" />
            </div>
          ) : (
            <div className="my-0 mx-auto w-[70%] grid grid-cols-2 gap-4 align-center justify-center ">
              {surveys.map((survey) => {
                return (
                  <div
                    key={survey.id}
                    className=" bg-gradient-to-t from-blue-500 to-blue-400  h-[300px] p-4 pt-8 text-white shadow-md shadow-blue-500/40 hover:shadow-indigo-500/40 cursor-pointer"
                  >
                    <div className="text-3xl font-bold">
                      {survey.surveyTitle}
                    </div>
                    <div>{survey.surveyDescription}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SurveysScreen;
