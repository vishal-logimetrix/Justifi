import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Clock, MapPin, FileText, Check, Home, Search } from "lucide-react"; // Importing Lucide icons
import { Link } from "react-router-dom";

const AskQuery = () => {
  const [formData, setFormData] = useState({
    queryDetails: "",
    legalArea: "",
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [suggestionStatus, setSuggestionStatus] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const legalAreas = [
    "Consumer Protection",
    "Family Law",
    "Property Law",
    "Criminal Law",
    "Corporate Law",
    "Cyber Law",
    "Taxation",
    "Intellectual Property",
    "Employment Law",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.consent) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (formData.queryDetails.length < 30) {
      alert("Please provide more details about your legal issue");
      return;
    }

    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({
        queryDetails: "",
        legalArea: "",
        fullName: "",
        email: "",
        phone: "",
        consent: false,
      });
    }, 1500);
  };

  const suggestLegalArea = async () => {
    if (formData.queryDetails.length < 20) {
      setSuggestionStatus({
        type: "error",
        message: "Please provide more details to get a suggestion",
      });
      return;
    }

    setIsLoading(true);
    setSuggestionStatus(null);

    try {
      // Simulate API call to LLM
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // In a real implementation, this would call the Gemini API
      // For demo purposes, we'll simulate a response
      const legalKeywords = [
        "consumer",
        "family",
        "property",
        "criminal",
        "corporate",
        "cyber",
        "tax",
        "ip",
        "employment",
      ];

      // Find which keyword appears in the query
      const foundArea = legalKeywords.find((keyword) =>
        formData.queryDetails.toLowerCase().includes(keyword)
      );

      let suggestedArea;
      if (foundArea) {
        // Map keyword to legal area
        const areaMap = {
          consumer: "Consumer Protection",
          family: "Family Law",
          property: "Property Law",
          criminal: "Criminal Law",
          corporate: "Corporate Law",
          cyber: "Cyber Law",
          tax: "Taxation",
          ip: "Intellectual Property",
          employment: "Employment Law",
        };
        suggestedArea = areaMap[foundArea] || "Other";
      } else {
        // If no keyword found, choose a random area
        const randomIndex = Math.floor(Math.random() * (legalAreas.length - 1));
        suggestedArea = legalAreas[randomIndex];
      }

      setFormData((prev) => ({
        ...prev,
        legalArea: suggestedArea,
      }));

      setSuggestionStatus({
        type: "success",
        message: `Suggested legal area: ${suggestedArea}`,
      });
    } catch (error) {
      setSuggestionStatus({
        type: "error",
        message: "Failed to suggest legal area. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="query-page">
        <Header />
        {/* Hero Section */}
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
                <h1 className="display-4 fw-bold mb-4">Ask your Query</h1>
                <p className="lead mb-5">
                  Have a legal question? Fill out the form below, and our team
                  will connect you with an expert advocate who can provide
                  guidance. It's fast, confidential, and cashless.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="query-section py-5">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="success-icon mb-4">
                  <div
                    className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <Check className="text-white fs-1" />
                  </div>
                </div>
                <h1 className="fw-bold mb-3" style={{ color: "#000080" }}>
                  Query Submitted Successfully!
                </h1>
                <p className="lead mb-4">
                  Your legal query has been received by our team. We'll connect
                  you with an expert advocate shortly.
                </p>
                <div className="next-steps bg-light p-4 rounded mb-5">
                  <h4 className="mb-3" style={{ color: "#008000" }}>
                    What happens next?
                  </h4>
                  <ul className="text-start">
                    <li>
                      Our system is matching your query with the most suitable
                      advocate
                    </li>
                    <li>
                      You'll receive an email confirmation with your query
                      details
                    </li>
                    <li>A legal expert will contact you within 24 hours</li>
                    <li>You can track your query status in your dashboard</li>
                  </ul>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/home" className="btn btn-primary btn-lg px-4">
                    <Home className="me-2" />
                    Return Home
                  </Link>
                  <Link
                    to="/find-lawyer"
                    className="btn btn-outline-success btn-lg px-4"
                  >
                    <Search className="me-2" />
                    Browse Lawyers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="query-page">
      <Header />

      {/* Hero Section */}
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
              <h1 className="display-4 fw-bold mb-4">Ask your Query</h1>
              <p className="lead mb-5">
                Have a legal question? Fill out the form below, and our team
                will connect you with an expert advocate who can provide
                guidance. It's fast, confidential, and cashless.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="query-section">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="fw-bold mb-3" style={{ color: "#000080" }}>
                Ask Your Legal Query
              </h1>
              <p
                className="lead mb-4"
                style={{ maxWidth: "700px", margin: "0 auto 40px" }}
              >
                Have a legal question? Fill out the form below, and our team
                will connect you with an expert advocate who can provide
                guidance. It's fast, confidential, and cashless.
              </p>

              <div
                className="query-form bg-light p-4 p-md-5 rounded shadow-sm"
                style={{ maxWidth: "700px", margin: "0 auto" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="queryDetails"
                      className="form-label fw-bold"
                      style={{ color: "#000080" }}
                    >
                      Your Legal Query Details:
                    </label>
                    <textarea
                      id="queryDetails"
                      name="queryDetails"
                      className="form-control"
                      rows={6}
                      placeholder="Please describe your legal issue in detail. The more information you provide, the better we can assist you."
                      value={formData.queryDetails}
                      onChange={handleChange}
                      required
                      style={{ minHeight: "150px" }}
                    ></textarea>

                    {suggestionStatus && (
                      <div
                        className={`alert mt-3 mb-0 ${
                          suggestionStatus.type === "success"
                            ? "alert-success"
                            : "alert-danger"
                        }`}
                      >
                        {suggestionStatus.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="legalArea"
                      className="form-label fw-bold"
                      style={{ color: "#000080" }}
                    >
                      Select Legal Area:
                    </label>
                    <select
                      id="legalArea"
                      name="legalArea"
                      className="form-select"
                      value={formData.legalArea}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Choose an area --</option>
                      {legalAreas.map((area, index) => (
                        <option key={index} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label
                        htmlFor="fullName"
                        className="form-label fw-bold"
                        style={{ color: "#000080" }}
                      >
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="email"
                        className="form-label fw-bold"
                        style={{ color: "#000080" }}
                      >
                        Your Email Address:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="e.g., yourname@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="form-label fw-bold"
                      style={{ color: "#000080" }}
                    >
                      Your Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="e.g., +91-9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      className="form-check-input"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="consent" className="form-check-label ms-2">
                      I agree to Justifi's{" "}
                      <a
                        href="/terms"
                        style={{
                          color: "#000080",
                          textDecoration: "underline",
                        }}
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        style={{
                          color: "#000080",
                          textDecoration: "underline",
                        }}
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn w-100 ${
                      isLoading ? "btn-secondary" : "btn-success"
                    }`}
                    disabled={isLoading}
                    style={{ padding: "12px", fontSize: "1.1rem" }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting Your Query...
                      </>
                    ) : (
                      "Submit Query"
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-5">
                <h4 className="fw-bold mb-3" style={{ color: "#000080" }}>
                  What to include in your query
                </h4>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 h-100">
                      <div className="card-body text-center">
                        <div className="icon-lg rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{background:'linear-gradient(135deg, #007bff 0%, #00c6ff 100%)'}}
                        >
                          <Clock className="text-white fs-4" />
                        </div>
                        <h6 className="fw-bold">Timeline</h6>
                        <p className="mb-0">When did the issue occur?</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 h-100">
                      <div className="card-body text-center">
                        <div className="icon-lg rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{background:'linear-gradient(135deg, #007bff 0%, #00c6ff 100%)'}}
                        >
                          <MapPin className="text-white fs-4" />
                        </div>
                        <h6 className="fw-bold">Location</h6>
                        <p className="mb-0">
                          Where is the legal issue located?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-0 h-100">
                      <div className="card-body text-center">
                        <div className="icon-lg rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{background:'linear-gradient(135deg, #007bff 0%, #00c6ff 100%)'}}
                        >
                          <FileText className="text-white fs-4" />
                        </div>
                        <h6 className="fw-bold">Documents</h6>
                        <p className="mb-0">
                          Any relevant documents or evidence?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AskQuery;
