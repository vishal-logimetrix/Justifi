
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import LawyerRegistration from './Pages/LawyerRegistration';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Home from './Pages/Home';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PageNotFound from './Pages/PageNotFound';
import Call from './components/Dashboard/Call';
import AboutUs from './Pages/About-us';
import AskQuery from './Pages/AskQuery';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
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
      </Route>
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App
