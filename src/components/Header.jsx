import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo2.jpeg"
// import logo from "../assets/images/logo.jpeg"
const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/home">
              <div className="bg-primary p-2 rounded-circle me-2">
                <Scale size={32} className="text-white" />
              </div>
              <span className="fw-bold">
                <img src={logo} alt="logo" style={{height: '50px'}} />
              </span>
              {/* <span className="fw-bold">JUSTIFI</span> */}
            </Link>
            <button className="navbar-toggler d-lg-none" type="button" onClick={toggleOffcanvas}>
              <Menu size={24} />
            </button>
            <div className="collapse navbar-collapse d-none d-lg-flex">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/home">Home</Link></li>
                {/* <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/ask-query">Ask Query</Link></li>
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/find-lawyer">Find Lawyer</Link></li>
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/for-advocates">For Advocates</Link></li>
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/about">About</Link></li> */}
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/login">Login</Link></li>
                <li className="nav-item mx-2"><Link className="nav-link fw-medium" to="/register">Register</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`offcanvas-backdrop-custom ${showOffcanvas ? 'show' : ''}`}
        onClick={toggleOffcanvas}
      />

      {/* Offcanvas Panel */}
      <div className={`custom-offcanvas ${showOffcanvas ? 'show' : ''}`}>
        <div className="offcanvas-header border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <h5 className="offcanvas-title mb-0 fw-bold">JUSTIFI</h5>
          <button type="button" className="btn" onClick={toggleOffcanvas}>
            <X size={24} />
          </button>
        </div>
        <div className="offcanvas-body px-4 pt-3">
          <ul className="navbar-nav">
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/home" onClick={toggleOffcanvas}>Home</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/ask-query" onClick={toggleOffcanvas}>Ask Query</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/find-lawyer" onClick={toggleOffcanvas}>Find Lawyer</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/for-advocates" onClick={toggleOffcanvas}>For Advocates</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/about" onClick={toggleOffcanvas}>About</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/login" onClick={toggleOffcanvas}>Login</Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link offcanvas-link" to="/register" onClick={toggleOffcanvas}>Register</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Offcanvas CSS */}
      <style>{`
        .custom-offcanvas {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100%;
          background: #fff;
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          z-index: 1050;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }
        .custom-offcanvas.show {
          transform: translateX(0);
        }
        .offcanvas-backdrop-custom {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 1040;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out;
        }
        .offcanvas-backdrop-custom.show {
          opacity: 1;
          visibility: visible;
        }
        .offcanvas-link {
          display: block;
          padding: 10px 16px;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
        }
        .offcanvas-link:hover {
          background: #f8f9fa;
          color: #0d6efd;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Header;
