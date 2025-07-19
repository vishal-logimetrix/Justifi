import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import LawyerDashboard from './LawyerDashboard';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'lawyer') {
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
    </>
  );
};

export default Dashboard;
