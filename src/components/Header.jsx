import { useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo2.jpeg";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { pathname } = useLocation();

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const navLinks = [
    { to: "/partner-program", label: "Partner Program" },
    { to: "/About", label: "About" },
    { to: "/ask-query", label: "Ask Query" },
    // { to: "/our-vision", label: "Our Vision" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/home">
              {/* <div className="bg-primary p-2 rounded-circle me-2">
                <Scale size={32} className="text-white" />
              </div> */}
              <span className="fw-bold">
                <img src={logo} alt="logo" style={{ height: "50px" }} />
              </span>
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleOffcanvas}
            >
              <Menu size={24} />
            </button>
            <div className="collapse navbar-collapse d-none d-lg-flex">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {navLinks.map((link) => (
                  <li className="nav-item mx-2" key={link.to}>
                    <Link
                      className={`nav-link fw-medium ${pathname === link.to ? "active-link" : ""}`}
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`offcanvas-backdrop-custom ${showOffcanvas ? "show" : ""}`}
        onClick={toggleOffcanvas}
      />

      {/* Offcanvas Panel */}
      <div className={`custom-offcanvas ${showOffcanvas ? "show" : ""}`}>
        <div className="offcanvas-header border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <div className="bg-success p-2 rounded-circle me-2">
              <Scale size={32} className="text-white" />
            </div>
            <span className="fw-bold">
              <img src={logo} alt="logo" style={{ height: "50px" }} />
            </span>
          </Link>
          <button
            type="button"
            className="btn"
            onClick={toggleOffcanvas}
            style={{
              border: "1px solid gray",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <X size={24} />
          </button>
        </div>
        <div className="offcanvas-body px-4 pt-3">
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li className="nav-item mb-3" key={link.to}>
                <Link
                  className={`nav-link offcanvas-link ${pathname === link.to ? "active-link" : ""}`}
                  to={link.to}
                  onClick={toggleOffcanvas}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Offcanvas & Active Link CSS */}
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
        .active-link {
          position: relative;
          color: green !important;
        }
        .active-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: green;
        }
      `}</style>
    </>
  );
};

export default Header;
