import React, { useState } from 'react';
import { Scale, User, Lock, Briefcase, ShieldCheck, BarChart2, FileText, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import logo from "../assets/images/logo_t.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, rememberMe });
    // In a real application, you would handle authentication here
    if (email === "admin@justifi.com" && password === "admin123") {
      navigate('/dashboard')
    }
    else{
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
    <Header />
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Left Side - Enhanced Lawyer Info */}
        <div className="col-lg-7 p-4 p-lg-5 d-flex flex-column justify-content-center text-white position-relative overflow-hidden"
        style={{
           background: 'linear-gradient(to right, #007bff, #0056b3)',
        }}
        >
          {/* Decorative elements */}
          <div className="position-absolute top-0 end-0 bg-warning opacity-10 rounded-circle" style={{ width: '300px', height: '300px', transform: 'translate(150px, -150px)' }}></div>
          <div className="position-absolute bottom-0 start-0 bg-success opacity-10 rounded-circle" style={{ width: '400px', height: '400px', transform: 'translate(-200px, 200px)' }}></div>
          <div className="position-absolute top-50 start-0 bg-info opacity-10" style={{ width: '150px', height: '150px', transform: 'translate(-50%, -50%) rotate(45deg)' }}></div>
          
          {/* Content */}
          <div className="position-relative z-1">
            <div className="d-flex align-items-center mb-4 mt-5">
              <div className="bg-primary p-3 rounded-circle d-flex align-items-center justify-content-center me-3">
                <Scale size={36} className="text-white" />
              </div>
              <h1 className="display-4 fw-bold mb-0">
                <img src={logo} alt="logo" />
              </h1>
              {/* <h1 className="display-4 fw-bold mb-0">
                JUSTIFI
              </h1> */}
            </div>
            
            <p className="lead mb-5 text-light opacity-75">
              The premier platform for legal professionals to manage cases, clients, and credentials with unparalleled efficiency.
            </p>
            
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1">
                    <Briefcase size={20} className="text-white" />
                  </div>
                  <div>
                    <h5 className="fw-bold">Case Management</h5>
                    <p className="small mb-0">Organize and track all your cases with intuitive tools designed for legal workflows.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h5 className="fw-bold">Document Automation</h5>
                    <p className="small mb-0">Generate legal documents in seconds with our AI-powered templates.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <h5 className="fw-bold">Calendar & Docketing</h5>
                    <p className="small mb-0">Never miss a deadline with automated court date tracking and reminders.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1">
                    <BarChart2 size={20} className="text-white" />
                  </div>
                  <div>
                    <h5 className="fw-bold">Billing & Accounting</h5>
                    <p className="small mb-0">Streamline time tracking, invoicing, and financial reporting.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className=" border border-light border-opacity-10 p-4 rounded-3 shadow-lg">
              <div className="d-flex align-items-center mb-2">
                <ShieldCheck className="me-2 text-primary" size={20} />
                <h5 className="fw-bold mb-0">Bar Association Verified</h5>
              </div>
              <p className="mb-0 small opacity-75">
                Trusted by over 25,000 legal professionals across 42 states. Compliant with ABA standards and state bar requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="col-lg-5 d-flex align-items-center justify-content-center p-4 p-md-5 bg-light">
          <div className="w-100" style={{ maxWidth: '450px' }}>
            <div className="text-center mb-5 mt-5">
              <div className="d-flex justify-content-center mb-3">
                <div className="bg-primary p-3 rounded-circle d-flex align-items-center justify-content-center">
                  <Scale size={32} className="text-white" />
                </div>
              </div>
              <h2 className="fw-bold text-dark">JUSTIFI</h2>
              <p className="text-muted">Justice... Simplified.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-medium text-dark">
                  <div className="d-flex align-items-center">
                    <User className="me-2 text-primary" size={18} />
                    Email
                  </div>
                </label>
                <input 
                  type="email" 
                  className="form-control form-control-lg border-1 border-dark border-opacity-10" 
                  id="email"
                  placeholder="john.doe@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-medium text-dark">
                  <div className="d-flex align-items-center">
                    <Lock className="me-2 text-primary" size={18} />
                    Password
                  </div>
                </label>
                <input 
                  type="password" 
                  className="form-control form-control-lg border-1 border-dark border-opacity-10" 
                  id="password" 
                  placeholder="********"
                  // placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 mb-3 fw-bold shadow"
              >
                Login
              </button>
              <div className="text-center mt-4 pt-3 border-top border-dark border-opacity-10">
                <p className="text-dark mb-2">
                  New to JUSTIFI? 
                </p>
                <Link to="/register" className="btn btn-outline-dark btn-lg w-100">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;