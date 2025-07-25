import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import LawyerRegistration from './Pages/LawyerRegistration';
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
          <Route path='' element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/call" element={<Call />} />
            <Route path="/chat-bot" element={<ChatBot />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
      </CallProvider>
    </>
  );
}

export default App;
