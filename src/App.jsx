import MainLayout from "./layout/MainLayout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Memo from "./pages/memo/Memo";
import Login from "./pages/login/Login";
import MyApproval from "./pages/myApproval/MyApproval";
import useCurrentUser from "./hooks/useCurrentUser";
import { useEffect } from "react";

const App = () => {
  
  const { userData } = useCurrentUser();

  useEffect(()=>{
    if(!userData){
      <Navigate to="/login" />
    }
  }, [userData])

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
