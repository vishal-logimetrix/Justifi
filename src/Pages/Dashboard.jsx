import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import LawyerDashboard from './LawyerDashboard';
import { useCallContext } from '../Context/CallContext';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  // const { incomingCall } = useCallContext();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'lawyer' || storedRole === "user") {
      setRole(storedRole);
    } else {
      // If no role is found, redirect to login or an error page
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {role === 'admin' && <AdminDashboard />}
      {role === 'lawyer' && <LawyerDashboard />}
      {role === 'user' && <UserDashboard />}
    </>
  );
};

export default Dashboard;
