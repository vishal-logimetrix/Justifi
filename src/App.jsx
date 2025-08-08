import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
// import LawyerRegistration from './Pages/LawyerRegistration';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Call from './components/Dashboard/Call';
import AboutUs from './Pages/About-us';
import AskQuery from './Pages/AskQuery';
import OfflinePage from './Pages/OfflinePage';
import { CallProvider } from './Context/CallContext';
import ChatBot from './Pages/ChatBot';
import SupremeCourt from './Pages/SupremeCourt';
import HighCourt from './Pages/HighCourt';
import DistrictCourt from './Pages/DistrictCourt';
import UserRegister from './Pages/UserRegister';
import ChatHistory from './Pages/ChatHistory';
import LawyerList from './Pages/LawyerList';
import LawyerOptions from './Pages/LawyerOptions';
import LawyerCaseDetails from './components/Dashboard/LawyerCaseDetails';
import LawyerCasesList from './components/Dashboard/LawyerCaseList';
import LawyerProfile from './Pages/LawyerProfile';



function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You're back online!");
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're offline. Check your internet connection.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return (
    <>
    <CallProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      {!isOnline ? (
        <OfflinePage /> // 👈 Show offline screen if no internet
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/ask-query" element={<AskQuery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/supreme-court" element={<SupremeCourt />} />
          <Route path="/register/high-court" element={<HighCourt />} />
          <Route path="/register/district-court" element={<DistrictCourt />} />
          <Route path="/register/user" element={<UserRegister />} />
          <Route path="/register/lawyer-options" element={<LawyerOptions />} />
          <Route path='' element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lawyer-list" element={<LawyerList />} />
            <Route path="/call" element={<Call />} />
            <Route path="/case-list" element={<LawyerCasesList />} />
            <Route path="/cases/:caseId" element={<LawyerCaseDetails />} />
            <Route path="/chat-bot" element={<ChatBot />} />
            <Route path="/chat-history" element={<ChatHistory />} />
            <Route path="/lawyer-profile" element={<LawyerProfile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
      </CallProvider>
    </>
  );
}

export default App;
