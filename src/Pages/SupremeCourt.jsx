import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  CreditCard,
  Landmark,
  Banknote,
  Languages,
  Globe,
  Scale,
  Upload,
  FileText,
  FileCheck2,
  FileSignature,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import Header from "../components/Header";

const SupremeCourt = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [lawyerId, setLawyerId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    court_type: "suprem court",
    lawyer_name: "",
    age: "",
    address: "",
    contact_no: "",
    email_id: "",
    bar_council_reg_no: "",
    state_council_reg_no: "",
    pan_number: "",
    aadhar_number: "",
    bank_account_number: "",
    ifsc_code: "",
    upi_id: "",
    plan: "",
    languages_known_indian: "",
    languages_known_international: "",
    international_litigation_experience: "",
  });

  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  // API configuration
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fileApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Add response interceptors for error handling
  [api, fileApi].forEach((axiosInstance) => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong!";
        toast.error(errorMessage);
        return Promise.reject(error);
      }
    );
  });

  // Form validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.lawyer_name.trim())
      newErrors.lawyer_name = "Full name is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{10}$/.test(formData.contact_no))
      newErrors.contact_no = "Valid 10-digit contact number is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email_id))
      newErrors.email_id = "Valid email is required";
    if (!formData.bar_council_reg_no.trim())
      newErrors.bar_council_reg_no = "Bar Council ID is required";
    if (!formData.state_council_reg_no.trim())
      newErrors.state_council_reg_no = "State Council ID is required";
    if (!/^\w{10}$/.test(formData.pan_number))
      newErrors.pan_number = "Valid 10-character PAN number is required";
    if (!/^\d{4} \d{4} \d{4}$/.test(formData.aadhar_number))
      newErrors.aadhar_number = "Aadhar format: XXXX XXXX XXXX";
    if (!/^\d{9,18}$/.test(formData.bank_account_number))
      newErrors.bank_account_number = "Valid bank account number required";
    if (!/^\w{4}0\w{6}$/.test(formData.ifsc_code))
      newErrors.ifsc_code = "Valid IFSC code required";
    if (!formData.upi_id.trim()) newErrors.upi_id = "UPI ID is required";
    if (!formData.languages_known_indian.trim())
      newErrors.languages_known_indian = "Required";
    if (!formData.languages_known_international.trim())
      newErrors.languages_known_international = "Required";
    if (!formData.international_litigation_experience.trim())
      newErrors.international_litigation_experience = "Select a value";
    if (!formData.plan) newErrors.plan = "Please select a plan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const requiredDocs = [
      "bar_council_certificate",
      "state_council_certificate",
      "certificate_for_practice",
      "legal_undertaking",
    ];

    requiredDocs.forEach((doc) => {
      if (!files[doc]) {
        newErrors[doc] = "This document is required";
      } else if (files[doc].size > 5 * 1024 * 1024) {
        newErrors[doc] = "File size must be less than 5MB";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePlanSelect = (plan) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Step 1: Submit basic info
  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age), // Ensure age is a number
      };

      const res = await api.post("lawyers/basic", payload);
      if (res.data.status === "pending_docs") {
        toast.success("Basic info submitted. Please upload documents.");
        setLawyerId(res.data.lawyer_id);
        setStep(2); // Move to document upload step
      }
    } catch (error) {
      console.error("Basic info submission error:", error);
      toast.error("Failed to submit basic information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit documents
  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    if (!validateStep2() || !lawyerId) return;

    setLoading(true);
    try {
      const formDataPayload = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        formDataPayload.append(key, file);
      });

      const { data } = await fileApi.post(
        `lawyers/docs/${lawyerId}`,
        formDataPayload
      );
      console.log(data);
      if (data.status === "success") {
        toast.success("Documents uploaded successfully!");
        setStep(3); // Move to payment step
      }
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Process payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const options = {
        key: "rzp_test_izVHe3ku4lNpzX",
        amount: formData.plan === "Annual" ? 499900 : 299900,
        currency: "INR",
        name: "JUSTIFI",
        image:
          "https://t3.ftcdn.net/jpg/01/36/27/72/360_F_136277252_Ki5FGt3CY0RpTQT4m0kFaL2czE22juVu.jpg",
        description: "Supreme Court Lawyer Registration Fee",
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (response) => {
          try {
            // Payment succeeded
            toast.success("Payment processed successfully!");
            // Complete registration
            const res = await api.post(`lawyers/complete/${lawyerId}`);
            if (res.data.success) {
              toast.success("Registration completed successfully!");
              setStep(4); // Move to success step
            }
          } catch (error) {
            toast.error(
              "Payment succeeded but registration completion failed. Contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.lawyer_name,
          email: formData.email_id,
          contact: formData.contact_no,
        },
        notes: { plan: formData.plan },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      toast.error("Error during payment process.");
      setLoading(false);
    }
  };

  // Form fields configuration
  const basicInfoFields = [
    ["Full Name", "lawyer_name", <User />, "text", "John Doe"],
    ["Age", "age", <Calendar />, "number", "30"],
    ["Address", "address", <MapPin />, "text", "Pune, Maharashtra"],
    ["Contact Number", "contact_no", <Phone />, "text", "9876543210"],
    ["Email", "email_id", <Mail />, "email", "john@example.com"],
    [
      "Bar Council ID",
      "bar_council_reg_no",
      <Briefcase />,
      "text",
      "MAH/123/2025",
    ],
    [
      "State Council ID",
      "state_council_reg_no",
      <Briefcase />,
      "text",
      "SCR54321",
    ],
    ["PAN Number", "pan_number", <CreditCard />, "text", "ABCDE1234F"],
    [
      "Aadhar Number",
      "aadhar_number",
      <CreditCard />,
      "text",
      "1234 5678 9012",
    ],
    [
      "Bank Account Number",
      "bank_account_number",
      <Landmark />,
      "text",
      "123456789012",
    ],
    ["IFSC Code", "ifsc_code", <Landmark />, "text", "SBIN0001234"],
    ["UPI ID", "upi_id", <Banknote />, "text", "john@upi"],
    [
      "Languages Known (Indian)",
      "languages_known_indian",
      <Languages />,
      "text",
      "Marathi, Tamil",
    ],
    [
      "Languages Known (International)",
      "languages_known_international",
      <Globe />,
      "text",
      "English, French",
    ],
  ];

  const documentTypes = [
    {
      label: "Bar Council Certificate",
      name: "bar_council_certificate",
      icon: <FileText />,
    },
    {
      label: "State Council Certificate",
      name: "state_council_certificate",
      icon: <FileText />,
    },
    {
      label: "Certificate for Practice",
      name: "certificate_for_practice",
      icon: <FileCheck2 />,
    },
    {
      label: "Legal Undertaking",
      name: "legal_undertaking",
      icon: <FileSignature />,
    },
  ];

  // Step progress
  const getProgressWidth = () => {
    if (step === 1) return "25%";
    if (step === 2) return "50%";
    if (step === 3) return "75%";
    return "100%";
  };

  return (
    <>
      <Header />
      <div className="min-vh-100 bg-light py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-white py-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-primary btn-sm mb-3 d-flex align-items-center"
                  >
                    <ArrowLeft size={18} className="me-1" /> Back
                  </button>
                  <div className="text-center">
                    <h1 className="h3 fw-bold text-primary">
                      Supreme Court Lawyer Registration
                    </h1>
                    <p className="text-muted mb-0">
                      Register to access exclusive Supreme Court resources
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="progress mb-3" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: getProgressWidth() }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div
                        className={`text-center ${
                          step >= 1 ? "text-primary fw-bold" : "text-muted"
                        }`}
                      >
                        <div
                          className={`mx-auto rounded-circle ${
                            step >= 1
                              ? "bg-primary text-white"
                              : "bg-light border"
                          } d-flex align-items-center justify-content-center mb-1`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          1
                        </div>
                        Basic Info
                      </div>
                      <div
                        className={`text-center ${
                          step >= 2 ? "text-primary fw-bold" : "text-muted"
                        }`}
                      >
                        <div
                          className={`mx-auto rounded-circle ${
                            step >= 2
                              ? "bg-primary text-white"
                              : "bg-light border"
                          } d-flex align-items-center justify-content-center mb-1`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          2
                        </div>
                        Documents
                      </div>
                      <div
                        className={`text-center ${
                          step >= 3 ? "text-primary fw-bold" : "text-muted"
                        }`}
                      >
                        <div
                          className={`mx-auto rounded-circle ${
                            step >= 3
                              ? "bg-primary text-white"
                              : "bg-light border"
                          } d-flex align-items-center justify-content-center mb-1`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          3
                        </div>
                        Payment
                      </div>
                      <div
                        className={`text-center ${
                          step >= 4 ? "text-primary fw-bold" : "text-muted"
                        }`}
                      >
                        <div
                          className={`mx-auto rounded-circle ${
                            step >= 4
                              ? "bg-primary text-white"
                              : "bg-light border"
                          } d-flex align-items-center justify-content-center mb-1`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          4
                        </div>
                        Complete
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <form onSubmit={handleBasicInfoSubmit}>
                      <h3 className="mb-4 text-primary">
                        Personal & Professional Information
                      </h3>
                      <div className="row g-3">
                        {basicInfoFields.map(
                          ([label, name, Icon, type, placeholder], i) => (
                            <div className="col-md-6" key={i}>
                              <label className="form-label fw-semibold">
                                {label}
                              </label>
                              <div className="input-group mb-1">
                                <span className="input-group-text bg-white">
                                  {React.cloneElement(Icon, {
                                    size: 18,
                                    className: "text-muted",
                                  })}
                                </span>
                                <input
                                  name={name}
                                  type={type}
                                  className={`form-control ${
                                    errors[name] ? "is-invalid" : ""
                                  }`}
                                  placeholder={placeholder}
                                  value={formData[name]}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors[name] && (
                                <div className="text-danger small mt-1">
                                  {errors[name]}
                                </div>
                              )}
                            </div>
                          )
                        )}

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            International Litigation Experience
                          </label>
                          <select
                            name="international_litigation_experience"
                            value={formData.international_litigation_experience}
                            onChange={handleChange}
                            className={`form-select ${
                              errors.international_litigation_experience
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="">Select Experience</option>
                            <option value="No">No</option>
                            <option value="Less than 10">Less than 10</option>
                            <option value="More than 10 but less than 50">
                              More than 10 but less than 50
                            </option>
                            <option value="More than 50">More than 50</option>
                          </select>
                          {errors.international_litigation_experience && (
                            <div className="text-danger small mt-1">
                              {errors.international_litigation_experience}
                            </div>
                          )}
                        </div>

                        <div className="col-12 mt-4">
                          <h5 className="fw-semibold mb-3">Choose Your Plan</h5>
                          <div className="row g-3">
                            {["Annual", "Contributor"].map((plan) => (
                              <div className="col-md-6" key={plan}>
                                <div
                                  className={`card h-100 ${
                                    formData.plan === plan
                                      ? "border-primary bg-primary bg-opacity-10"
                                      : "border-light"
                                  }`}
                                  onClick={() => handlePlanSelect(plan)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                      {plan === "Annual"
                                        ? "Annual Subscription"
                                        : "Contributor Plan"}
                                    </h5>
                                    <h4 className="text-primary">
                                      {plan === "Annual" ? "₹4999" : "₹2999"}
                                    </h4>
                                    <p className="card-text text-muted">
                                      {plan === "Annual"
                                        ? "One-time payment for a full year of access."
                                        : "4 free consultations included."}
                                    </p>
                                    {formData.plan === plan && (
                                      <div className="text-end text-primary">
                                        <i className="bi bi-check-circle-fill"></i>{" "}
                                        Selected
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {errors.plan && (
                            <div className="text-danger small mt-2">
                              {errors.plan}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading || !formData.plan}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              />
                              Submitting...
                            </>
                          ) : (
                            "Submit Basic Information"
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Document Upload */}
                  {step === 2 && (
                    <form onSubmit={handleDocumentUpload}>
                      <h3 className="mb-4 text-primary">
                        Upload Required Documents
                      </h3>
                      <p className="text-muted mb-4">
                        Please upload the following documents in PDF, JPG, or
                        PNG format (max 5MB each)
                      </p>
                      <div className="row g-3">
                        {documentTypes.map(({ label, name, icon }, index) => (
                          <div className="col-md-6" key={index}>
                            <div className="card h-100 border-0 shadow-sm">
                              <div className="card-body">
                                <h5 className="card-title d-flex align-items-center">
                                  {React.cloneElement(icon, {
                                    className: "me-2 text-primary",
                                    size: 20,
                                  })}
                                  {label}
                                </h5>
                                <div className="mt-3">
                                  <input
                                    type="file"
                                    name={name}
                                    className={`form-control ${
                                      errors[name] ? "is-invalid" : ""
                                    }`}
                                    onChange={handleFileChange}
                                    required
                                    accept=".pdf,.jpg,.jpeg,.png"
                                  />
                                  {errors[name] && (
                                    <div className="invalid-feedback d-block">
                                      {errors[name]}
                                    </div>
                                  )}
                                  <small className="text-muted">
                                    PDF, JPG, or PNG (Max 5MB)
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex justify-content-between mt-5">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={prevStep}
                          disabled={loading}
                        >
                          <ChevronLeft size={18} className="me-1" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading || Object.keys(files).length < 4}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="me-2" size={18} />
                              Submit Documents
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <div>
                      <h3 className="mb-4 text-primary">
                        Complete Your Registration
                      </h3>
                      <div className="card border-primary mb-4">
                        <div className="card-body">
                          <h5 className="card-title text-primary">
                            Payment Summary
                          </h5>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <p>
                                <strong>Plan:</strong> {formData.plan}
                              </p>
                              <p>
                                <strong>Amount:</strong>{" "}
                                {formData.plan === "Annual" ? "₹4999" : "₹2999"}
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p>
                                <strong>Name:</strong> {formData.lawyer_name}
                              </p>
                              <p>
                                <strong>Email:</strong> {formData.email_id}
                              </p>
                            </div>
                          </div>
                          <div className="alert alert-info mt-3">
                            <i className="bi bi-info-circle me-2"></i>
                            Please complete payment to finalize your
                            registration.
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mt-5">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={prevStep}
                          disabled={loading}
                        >
                          <ChevronLeft size={18} className="me-1" />
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              />
                              Processing...
                            </>
                          ) : (
                            "Proceed to Payment"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <div>
                      <h3 className="mb-4 text-primary">
                        Registration Complete
                      </h3>
                      <div className="card border-success mb-4">
                        <div className="card-body text-center py-5">
                          <div className="bg-success bg-opacity-10 text-success p-4 rounded-circle d-inline-flex mb-4">
                            <Scale size={48} />
                          </div>
                          <h4 className="text-success mb-3">
                            Registration Successful!
                          </h4>
                          <p className="lead">
                            Thank you for registering as a Supreme Court Lawyer.
                            Your account is being verified and you'll receive
                            confirmation shortly.
                          </p>
                          <div className="mt-4">
                            <h5>Registration Details</h5>
                            <div className="d-flex justify-content-center mt-3">
                              <table className="table table-borderless w-auto">
                                <tbody>
                                  <tr>
                                    <th className="text-end pe-3">Name:</th>
                                    <td>{formData.lawyer_name}</td>
                                  </tr>
                                  <tr>
                                    <th className="text-end pe-3">
                                      Bar Council ID:
                                    </th>
                                    <td>{formData.bar_council_reg_no}</td>
                                  </tr>
                                  <tr>
                                    <th className="text-end pe-3">Plan:</th>
                                    <td>
                                      {formData.plan} (
                                      {formData.plan === "Annual"
                                        ? "₹4999"
                                        : "₹2999"}
                                      )
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end pe-3">Status:</th>
                                    <td>
                                      <span className="badge bg-warning">
                                        Verification Pending
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mt-5">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => navigate("/login")}
                        >
                          Go to Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-footer bg-white py-3 text-center">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary fw-semibold">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-2">
                      <ShieldCheck size={20} />
                    </div>
                    <small>Secure Registration</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-2">
                      <Lock size={20} />
                    </div>
                    <small>256-bit Encryption</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-2">
                      <HelpCircle size={20} />
                    </div>
                    <small>24/7 Support</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupremeCourt;
