import Header from "../partials/Header";
import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import AddNewSurvey from "../components/Login/UI/empty/addNewTask";

const AddSurveyScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* //todo adding all survey */}
        <div className="pt-8 my-0 mx-auto">
          <AddNewSurvey />
        </div>
      </div>
    </div>
  );
};

export default AddSurveyScreen;
