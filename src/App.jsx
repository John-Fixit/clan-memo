import MainLayout from "./layout/MainLayout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Memo from "./pages/memo/Memo";
import Login from "./pages/login/Login";
import MyApproval from "./pages/myApproval/MyApproval";
import useCurrentUser from "./hooks/useCurrentUser";
import { useEffect } from "react";
import GlobalProviders from "./lib/GlobalProvider";
import LandingPage from "./pages/landingPage";
import "aos/dist/aos.css";
import AOS from "aos";

const App = () => {
  
  const { userData } = useCurrentUser();

  useEffect(()=>{
    if(!userData){
      <Navigate to="/login" />
    }
  }, [userData])

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/my-approval" element={<MyApproval />} />
        </Route>
      </Routes>
      <GlobalProviders/>
    </>
  );
};

export default App;
