import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const SurveyDetails = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div>Swiftmotoin</div>
        <div>Swiftmotoin</div>
        <div>Swiftmotoin</div>
        <div>Swiftmotoin</div>
        <div>Swiftmotoin</div>
      </div>
    </div>
  );
};

export default SurveyDetails;
