import MainLayout from "./layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Memo from "./pages/memo/Memo";
import Login from "./pages/login/Login";
import MyApproval from "./pages/myApproval/MyApproval";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/my-approval" element={<MyApproval />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
