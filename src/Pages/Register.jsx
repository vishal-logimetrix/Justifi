import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Scale,
  ChevronRight,
  Shield,
  BookOpen,
  Users,
  Briefcase,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();

  const registrationOptions = [
    {
      id: "user",
      name: "General User",
      description:
        "Access legal services, track cases, find professionals, and manage documents",
      icon: <User size={48} className="text-primary" />,
      color: "bg-primary",
      route: "/register/user",
      features: [
        "Case status tracking",
        "Document templates",
        "Legal professional directory",
        "Resource library access",
      ],
      buttonText: "Register as User",
    },
    {
      id: "lawyer",
      name: "Legal Professional",
      description:
        "Access case management tools, legal resources, and professional networking",
      icon: <Scale size={48} className="text-primary" />,
      color: "bg-info",
      route: "/register/lawyer-options",
      features: [
        "Case management dashboard",
        "Legal research tools",
        "Document automation",
        "Client management",
      ],
      buttonText: "Proceed as Lawyer",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-light min-vh-100" style={{ marginTop: "100px" }}>
        <section
          className="hero-section py-5"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80') no-repeat center center / cover",
            color: "white",
            marginTop: "80px",
          }}
        >
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="display-4 fw-bold mb-4">Register</h1>
                <p className="lead mb-5">
                  Transforming access to justice in India through innovation,
                  technology, and a nationwide network of legal professionals.
                </p>
                {/* <a href="#our-story" className="btn btn-success btn-lg me-2">Our Story</a>
              <a href="#our-team" className="btn btn-outline-light btn-lg">Meet Our Team</a> */}
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <div className="py-6 py-md-8 bg-white mt-5 mb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
                <h1 className="display-5 fw-bold mb-3">
                  Join Our Legal Network
                </h1>
                <p className="lead text-muted mb-4">
                  Register as a legal professional or general user to access our
                  comprehensive legal platform designed for all participants in
                  the judicial system.
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <div className="d-flex align-items-center me-4">
                    <Shield className="text-primary me-2" size={20} />
                    <span>Secure Platform</span>
                  </div>
                  <div className="d-flex align-items-center me-4">
                    <BookOpen className="text-success me-2" size={20} />
                    <span>Legal Resources</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Users className="text-info me-2" size={20} />
                    <span>Professional Network</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="bg-primary text-white rounded-3 p-4 p-lg-5 shadow mt-3 mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-white p-3 rounded-circle me-3">
                      <Scale size={32} className="text-primary" />
                    </div>
                    <h2 className="mb-0">Account Registration</h2>
                  </div>
                  <p className="mb-4">
                    Select your registration type to begin. Each registration
                    provides access to specialized tools and resources designed
                    for your specific needs within the legal ecosystem.
                  </p>
                  <div className="bg-white bg-opacity-25 p-3 rounded">
                    <div className="d-flex align-items-center mb-2">
                      <Briefcase className="me-2" size={20} />
                      <strong>Already registered?</strong>
                    </div>
                    <Link
                      to="/login"
                      className="text-white d-flex align-items-center"
                    >
                      Sign in to your account{" "}
                      <ChevronRight className="ms-1" size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Options */}
        <div className="py-5 py-md-7">
          <div className="container">
            <div className="text-center mb-5">
              <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 mb-3">
                Registration Portal
              </span>
              <h2 className="fw-bold mb-3">How Would You Like to Register?</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                Choose the registration path that matches your relationship with
                India's legal system
              </p>
            </div>

            <div className="row justify-content-center g-4">
              {registrationOptions.map((option) => (
                <div key={option.id} className="col-lg-5 col-md-8">
                  <div className="card h-100 border-0 shadow-sm">
                    <div
                      className={`${option.color} text-white py-4 px-4 text-center`}
                    >
                      <div className="bg-white bg-opacity-25 p-3 rounded-circle d-inline-flex">
                        {option.icon}
                      </div>
                      <h3 className="mt-3 mb-0">{option.name}</h3>
                    </div>
                    <div className="card-body">
                      <p className="text-muted mb-4">{option.description}</p>

                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">Key Features:</h6>
                        <ul className="list-unstyled">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="d-flex mb-2">
                              <span
                                className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                                style={{ width: "24px", height: "24px" }}
                              >
                                <ChevronRight size={14} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => navigate(option.route)}
                        className={`btn ${option.color} text-white w-100 d-flex align-items-center justify-content-center`}
                      >
                        {option.buttonText}{" "}
                        <ChevronRight className="ms-2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
