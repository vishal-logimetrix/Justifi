import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Landmark,
  Gavel,
  Building,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LawyerOptions = () => {
  const navigate = useNavigate();

  const lawyerOptions = [
    // {
    //   id: "supreme",
    //   name: "Supreme Court",
    //   description:
    //     "Practice at India's highest judicial authority and constitutional court",
    //   icon: <Landmark size={48} className="text-primary" />,
    //   color: "bg-primary",
    //   route: "/register/supreme-court",
    //   jurisdiction: "National Jurisdiction",
    //   cases: "Constitutional Matters, Civil & Criminal Appeals",
    // },
    {
      id: "high",
      name: "High Court",
      description: "Practice at state-level high courts across India",
      icon: <Gavel size={48} className="text-success" />,
      color: "bg-success",
      route: "/register/high-court",
      jurisdiction: "State Jurisdiction",
      cases: "Appellate Cases, Writ Petitions, Original Jurisdiction",
    },
    {
      id: "district",
      name: "District Court",
      description: "Practice at district and session courts throughout India",
      icon: <Building size={48} className="text-warning" />,
      color: "bg-warning",
      route: "/register/district-court",
      jurisdiction: "District Jurisdiction",
      cases: "Civil Suits, Criminal Cases, Family Disputes",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-light min-vh-100 mt-5">
        
        <div className="container py-5 py-md-7">
          <div className="text-center mb-5">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-primary btn-sm mb-3 d-flex align-items-center"
            >
              <ArrowLeft size={18} className="me-1" /> Back to selection
            </button>

            <span className="badge bg-info bg-opacity-10 text-info py-2 px-3 mb-3">
              Legal Professional Registration
            </span>
            <h2 className="fw-bold mb-3">Select Your Court of Practice</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Register according to the Indian court system where you primarily
              practice law to access specialized tools and resources
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {lawyerOptions.map((option) => (
              <div key={option.id} className="col-lg-4 col-md-8">
                <div className="card h-100 border-0 shadow-sm">
                  <div
                    className={`${option.color} text-white py-4 px-4 text-center`}
                  >
                    <div className="bg-white bg-opacity-25 p-3 rounded-circle d-inline-flex">
                      {option.icon}
                    </div>
                    <h3 className="mt-3 mb-1">{option.name}</h3>
                    <div className="text-white text-opacity-75">
                      {option.jurisdiction}
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-4">{option.description}</p>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Common Case Types:</h6>
                      <div className="bg-light p-3 rounded">
                        <ul className="mb-0">
                          {option.cases.split(", ").map((caseType, idx) => (
                            <li key={idx} className="d-flex mb-2">
                              <span className="text-primary me-2">•</span>
                              <span>{caseType}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(option.route)}
                      className={`btn ${option.color} text-white w-100 d-flex align-items-center justify-content-center`}
                    >
                      Register for {option.name.split(" ")[0]}
                      <ChevronRight className="ms-2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 pt-4">
            <div className="d-inline-flex align-items-center bg-light px-4 py-2 rounded-pill">
              <span className="text-muted">
                Need help determining your appropriate court?
                <a href="#" className="text-primary fw-medium ms-1">
                  Consult our guide
                </a>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LawyerOptions;
