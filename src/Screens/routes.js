import { Routes, Route } from "react-router-dom";
import Authentication from "./Authentications";
import Dashboard from "../Screens/DashboardScreen";
const PagesRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Authentication />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
};

export default PagesRoutes;
