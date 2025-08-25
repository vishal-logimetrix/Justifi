import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import LawyerDashboard from "./LawyerDashboard";
import UserDashboard from "./UserDashboard";
import { useCallContext } from "../Context/CallContext";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { initializeSocket, isConnected } = useCallContext();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    
    if (storedRole) {
      setRole(storedRole);
      
      // Only initialize socket if not already connected
      if (!isConnected && 
          (storedRole === "lawyer" || storedRole === "individual") && 
          token) {
        console.log("🔌 Initializing socket in Dashboard");
        initializeSocket(token);
      }
    } else {
      navigate("/login");
    }
  }, [navigate, initializeSocket, isConnected]); // Add isConnected to dependencies

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "lawyer" && <LawyerDashboard />}
      {role === "individual" && <UserDashboard />}
    </>
  );
};

export default Dashboard;