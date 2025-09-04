import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Clock,
  MapPin,
  FileText,
  Check,
  Home,
  Search,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL_USER;

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
  const [legalAreas, setLegalAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLegalAreas();
  }, []);

  const getLegalAreas = async () => {
    try {
      const { data } = await axios.get("/legal/legal-dropdown");
      if (data.success) {
        setLegalAreas(data.data); // array of {id, legal_area}
      }
    } catch (error) {
      console.error("Error fetching legal areas:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (formData.queryDetails.length < 10) {
      alert("Please provide more details about your legal issue");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post("/ask-query", formData);

      if (data) {
        // ✅ Query submitted successfully
        setFormSubmitted(true);
        setFormData({
          queryDetails: "",
          legalArea: "",
          fullName: "",
          email: "",
          phone: "",
          consent: false,
        });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("You need to register first to ask your legal query");
      setIsLoading(false);
      navigate("/register/user");
    } finally {
      setIsLoading(false);
    }
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
                  you with an expert advocate within 24 hours.
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
                  <Link
                    to="/partner-program"
                    className="btn btn-primary btn-lg px-4"
                  >
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

      {/* We're Here to Help Section */}
      <section className="help-section py-5 bg-light">
        <div className="container">
          {/* Heading Section */}
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="fw-bold mb-4 text-success">
                We're Here to Help You Find Legal Clarity
              </h2>
              <p className="lead mb-5">
                Navigating legal matters can feel overwhelming, but we want you
                to feel completely secure and confident. Our goal is to guide
                you on a safe and confidential path to legal support. Everything
                we do together is fully encrypted and private.
              </p>
            </div>
          </div>

          {/* Row with Two Side-by-Side Sections */}
          <div className="row justify-content-center mb-5">
            {/* Personal Consultation Path */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4">
                  Your Personal Consultation Path
                </h5>

                <div className="d-flex align-items-start mb-4">
                  <div>
                    <h6 className="fw-bold">
                      Start with a Free, Private Query
                    </h6>
                    <p className="mb-0 small text-muted">
                      You can submit your legal question to us at no cost, and
                      it will only be visible to specialized advocates in a
                      fully secure environment.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <div>
                    <h6 className="fw-bold">Receive Expert Responses</h6>
                    <p className="mb-0 small text-muted">
                      Specialized advocates will review your query and offer
                      initial guidance and suggestions within 48 hours. We’ll
                      make sure you see them as soon as they’re available.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div>
                    <h6 className="fw-bold">Choose Your Advocate & Connect</h6>
                    <p className="mb-0 small text-muted">
                      Once you feel comfortable, you can choose an advocate and
                      schedule a private 15-minute consultation call for just
                      ₹1500. All payments and scheduling are handled right here,
                      so you never have to leave this secure space.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Legal Assistant Section */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4">
                  RyLaw…Your Instant AI Legal Assistant
                </h5>

                <div className="mb-4">
                  <h6 className="fw-bold text-success">
                    Immediate Answers with Justifi AI
                  </h6>
                  <p className="small text-muted mb-0">
                    We have a powerful AI assistant named RyLaw who is trained
                    specifically on Indian laws. They can give you instant legal
                    references and basic guidance, all from the comfort of your
                    home.
                  </p>
                </div>

                <div>
                  <h6 className="fw-bold text-success">
                    A Simple Way to See Your Standing
                  </h6>
                  <p className="small text-muted">
                    Justifi AI also provides a simple color code to help you
                    understand your legal standing, so you can quickly see if
                    you need to take action.
                  </p>

                  <div className="d-flex gap-3">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: "green" }}
                    >
                      Green
                    </span>
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: "orange" }}
                    >
                      Amber
                    </span>
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: "red" }}
                    >
                      Red
                    </span>
                  </div>

                  <p className="small text-danger mt-2 mb-0">
                    Red means your situation is critical and needs immediate
                    legal support. We’re here to help you find it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card text-center shadow-sm border-0 rounded-4 p-4 bg-success text-white">
                <h5 className="fw-bold mb-3">
                  Let's Get Started on Your Legal Journey Today!
                </h5>
                <p className="mb-4">
                  You can register now for a monthly fee of just
                </p>
                <h2 className="fw-bold mb-3">₹99</h2>
                <p className="mb-0">
                  and we’ll add a One Time 5-minute Bonus extension to your
                  Legal consultation session!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-content-section py-5">
        <div className="container">
          <div className="row">
            {/* Left Column - Query Form */}
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="query-form bg-white p-4 p-md-5 rounded shadow-sm">
                <h3 className="fw-bold mb-4" style={{ color: "#000080" }}>
                  Ask Your Legal Query
                </h3>
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
                        <option key={index + 1} value={area.id}>
                          {area.legal_area}
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
                        <div
                          className="icon-lg bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                          style={{ width: "60px", height: "60px" }}
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
                        <div
                          className="icon-lg bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                          style={{ width: "60px", height: "60px" }}
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
                        <div
                          className="icon-lg bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                          style={{ width: "60px", height: "60px" }}
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

            {/* Right Column - Rylaw Legal Assistant */}
            <div className="col-lg-5">
              <div className="rylaw-assistant bg-white p-4 p-md-5 rounded shadow-sm h-100">
                <div className="mb-5">
                  <h4 className="fw-bold mb-3" style={{ color: "#000080" }}>
                    <Users className="me-2" size={24} />
                    Advocate Consultation Path
                  </h4>

                  <div className="consultation-step mb-3 p-3 bg-light rounded">
                    <div
                      className="step-number d-inline-block bg-warning text-white rounded-circle text-center me-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                    >
                      1
                    </div>
                    <h6 className="d-inline-block fw-bold">
                      Free Query Submission
                    </h6>
                    <p className="mt-2 mb-0">
                      Submit your legal query or issue at no cost. Your query
                      will be instantly visible to specialized advocates.
                    </p>
                  </div>

                  <div className="consultation-step mb-3 p-3 bg-light rounded">
                    <div
                      className="step-number d-inline-block bg-warning text-white rounded-circle text-center me-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                    >
                      2
                    </div>
                    <h6 className="d-inline-block fw-bold">
                      Advocate Responses
                    </h6>
                    <p className="mt-2 mb-0">
                      Advocates specializing in your area of law will respond
                      with initial guidance or suggestions within 48 hours.
                    </p>
                  </div>

                  <div className="consultation-step p-3 bg-light rounded">
                    <div
                      className="step-number d-inline-block bg-warning text-white rounded-circle text-center me-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                    >
                      3
                    </div>
                    <h6 className="d-inline-block fw-bold">Select & Consult</h6>
                    <p className="mt-2 mb-0">
                      Review the advocate responses and choose the one you want
                      to proceed with. Schedule a paid, 15-minute consultation
                      call for just ₹1500.
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="fw-bold mb-3" style={{ color: "#000080" }}>
                    <Zap className="me-2" size={24} />
                    Instant AI Legal Assistance
                  </h4>

                  <div className="ai-feature mb-3">
                    <h6 className="fw-bold">Immediate Answers with Rylaw</h6>
                    <p>
                      Rylaw is an AI trained specifically on Indian laws. They
                      provides instant legal references, basic guidance, and
                      answers to your legal questions.
                    </p>
                  </div>
                </div>

                <div className="bonus-section p-4 bg-success text-white rounded text-center">
                  <Shield size={32} className="mb-3" />
                  <h5 className="fw-bold">Bonus Chat Minutes</h5>
                  <p className="mb-3">
                    Users who opt for Rylaw's assistance receive an extra 5
                    bonus minutes added to their AI chat session.
                  </p>
                  <div className="secure-note bg-light text-dark p-2 rounded">
                    <small>
                      Secure payments and scheduling are handled directly on the
                      platform for a seamless experience.
                    </small>
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
