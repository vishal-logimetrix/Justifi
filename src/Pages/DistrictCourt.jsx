import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowLeft, Scale, ShieldCheck, Lock, HelpCircle } from "lucide-react";
import Header from "../components/Header";
import BasicInfoForm from "../components/LawyerRegistration/BasicInfoForm";
import DocumentUploadForm from "../components/LawyerRegistration/DocumentUploadForm";
import PaymentForm from "../components/LawyerRegistration/PaymentForm";
import LocationSelectionForm from "../components/LawyerRegistration/LocationSelectionForm";

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

const DistrictCourt = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [lawyerId, setLawyerId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Loading states for dropdowns
  const [statesLoading, setStatesLoading] = useState(false);
  const [sendingRegistration, setSendingRegistration] = useState(false);

  // Dropdown data states
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]); // Stores all districts from API
  const [legalAreas, setLegalAreas] = useState([]);

  // Form states - Updated structure
  const [formData, setFormData] = useState({
    court_type: "district court",
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
    // Changed to support multiple states
    legalArea: [],
    state_ids: [],
    district_ids: [],
  });

  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  // Fetch states and districts on component mount
  useEffect(() => {
    const fetchData = async () => {
      setStatesLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_STATE}/api/get-state-district`
        );
        const statesData = response.data.data || [];

        // Use state_id instead of id
        const mappedStates = statesData.map((state) => ({
          state_id: state.state_id,
          name: state.name,
          districts: state.districts || [],
        }));
        setStates(mappedStates);

        // Extract all districts with district_id and own_state_id
        const districtsData = [];
        statesData.forEach((state) => {
          (state.districts || []).forEach((district) => {
            districtsData.push({
              district_id: district.district_id,
              name: district.name,
              own_state_id: district.own_state_id, // numeric ref to state
              state_id: state.state_id, // keep reference to state_id string
            });
          });
        });
        setAllDistricts(districtsData);
      } catch (error) {
        console.error("Error fetching states with districts:", error);
      } finally {
        setStatesLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update districts when selected states change
  useEffect(() => {
    if (formData.state_ids && formData.state_ids.length > 0) {
      const filteredDistricts = allDistricts.filter((district) =>
        formData.state_ids.includes(district.state_id)
      );
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
  }, [formData.state_ids, allDistricts]);

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

  // Send registration data to Bar Council
  const sendRegistrationToBarCouncil = async (
    barCouncilId,
    districtIds,
    userId
  ) => {
    setSendingRegistration(true);
    try {
      console.log("user id for bar council id", userId);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_STATE}/fetch/cases-barcouncil`,
        {
          BarCouncil: barCouncilId,
          districtIds: districtIds,
          adv_id: userId,
        }
      );

      if (response.data) {
        toast.success("Registration sent to Bar Council successfully!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sending registration to Bar Council:", error);
      toast.error("Failed to send registration to Bar Council");
      return false;
    } finally {
      setSendingRegistration(false);
    }
  };

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

  // Form validation functions
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
     // Add validation for legalArea
    if (!formData.legalArea || formData.legalArea.length === 0) {
      newErrors.legalArea = "At least one legal area is required";
    }

 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;

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

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.state_ids || formData.state_ids.length === 0)
      newErrors.state_ids = "Please select at least one state";
    if (!formData.district_ids || formData.district_ids.length === 0)
      newErrors.district_ids = "Please select at least one district";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const handleFormDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStateChange = (selectedOptions) => {
    const selectedStates = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prev) => ({
      ...prev,
      state_ids: selectedStates,
      district_ids: [],
    }));
    setErrors((prev) => ({
      ...prev,
      state_ids: "",
      district_ids: "",
    }));
  };

  const handleDistrictChange = (selectedOptions) => {
    const selectedDistricts = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prev) => ({
      ...prev,
      district_ids: selectedDistricts,
    }));
    setErrors((prev) => ({ ...prev, district_ids: "" }));
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
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Step 1: Submit basic info
  const handleBasicInfoSubmit = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        // Don't include location data in basic info
        state_ids: null,
        district_ids: null,
      };

      const res = await api.post("lawyers/basic", payload);
      if (res.data.status === "pending_docs") {
        toast.success("Basic info submitted. Please upload documents.");
        setLawyerId(res.data.lawyer_id);
        nextStep();
      }
    } catch (error) {
      console.error("Basic info submission error:", error);
      toast.error("Failed to submit basic information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit documents
  const handleDocumentUpload = async () => {
    if (!validateStep2() || !lawyerId) return;

    setLoading(true);
    try {
      const formDataPayload = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        formDataPayload.append(key, file);
      });

      const response = await fileApi.post(
        `lawyers/docs/${lawyerId}`,
        formDataPayload
      );

      if (response.data) {
        toast.success("Documents uploaded successfully!");
        nextStep(); // Move to payment step
      }
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Process payment (now mandatory)
  const handlePayment = async () => {
    if (!formData.plan) {
      toast.error("Please select a plan to proceed.");
      return;
    }

    setLoading(true);
    try {
      const options = {
        key: "rzp_test_izVHe3ku4lNpzX",
        amount: formData.plan === "Annual" ? 499900 : 299900,
        currency: "INR",
        name: "JUSTIFI",
        image:
          "https://t3.ftcdn.net/jpg/01/36/27/72/360_F_136277252_Ki5FGt3CY0RpTQT4m0kFaL2czE22juVu.jpg",
        description: "District Court Lawyer Registration Fee",
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (response) => {
          try {
            toast.success("Payment processed successfully!");
            nextStep(); // Move to location selection
          } catch (error) {
            toast.error(
              "Payment succeeded but there was an error. Contact support."
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

  // Step 4: Update location, send to Bar Council, and complete registration
  const handleLocationUpdate = async () => {
    if (!validateStep4() || !lawyerId) return;

    setLoading(true);
    try {
      // Update location data using PUT API
      const Payload = {
        state_ids: formData.state_ids,
        district_ids: formData.district_ids,
        lawyer_id: lawyerId,
      };

      const updateResponse = await api.post(`lawyers/basic`, Payload);

      if (updateResponse.data) {
        // Send registration to Bar Council after location is set
        const barCouncilSuccess = await sendRegistrationToBarCouncil(
          formData.bar_council_reg_no,
          formData.district_ids,
          lawyerId
        );

        if (barCouncilSuccess) {
          // const completeResponse = await api.post(`lawyers/complete/${lawyerId}`);

          // if (completeResponse.data.success) {
          toast.success("Registration completed successfully!");
          nextStep();
          // alert("succces, will move on login page");
          // setTimeout(() => {
          //   navigate("/login");
          // }, 20000);

          // }
        }
      }
    } catch (error) {
      console.error("Location update error:", error);
      toast.error("Failed to update location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step progress
  const getProgressWidth = () => {
    if (step === 1) return "20%";
    if (step === 2) return "40%";
    if (step === 3) return "60%";
    if (step === 4) return "80%";
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
                      District Court Lawyer Registration
                    </h1>
                    <p className="text-muted mb-0">
                      Register to access exclusive District Court resources
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
                        Location
                      </div>
                      <div
                        className={`text-center ${
                          step >= 5 ? "text-primary fw-bold" : "text-muted"
                        }`}
                      >
                        <div
                          className={`mx-auto rounded-circle ${
                            step >= 5
                              ? "bg-primary text-white"
                              : "bg-light border"
                          } d-flex align-items-center justify-content-center mb-1`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          5
                        </div>
                        Complete
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <BasicInfoForm
                      formData={formData}
                      errors={errors}
                      onChange={handleFormDataChange}
                      onSubmit={handleBasicInfoSubmit}
                      loading={loading}
                      legalAreas={legalAreas}
                    />
                  )}

                  {/* Step 2: Document Upload */}
                  {step === 2 && (
                    <DocumentUploadForm
                      files={files}
                      errors={errors}
                      onFileChange={handleFileChange}
                      onSubmit={handleDocumentUpload}
                      onPrev={prevStep}
                      loading={loading}
                    />
                  )}

                  {/* Step 3: Payment (Mandatory) */}
                  {step === 3 && (
                    <PaymentForm
                      formData={formData}
                      onPlanSelect={handlePlanSelect}
                      onPayment={handlePayment}
                      onPrev={prevStep}
                      loading={loading}
                    />
                  )}

                  {/* Step 4: Location Selection */}
                  {step === 4 && (
                    <LocationSelectionForm
                      formData={formData}
                      states={states}
                      districts={districts}
                      errors={errors}
                      statesLoading={statesLoading}
                      onStateChange={handleStateChange}
                      onDistrictChange={handleDistrictChange}
                      onSubmit={handleLocationUpdate}
                      onPrev={prevStep}
                      loading={loading}
                      sendingRegistration={sendingRegistration}
                    />
                  )}

                  {/* Step 5: Confirmation */}
                  {step === 5 && (
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
                            Thank you for registering as a District Court
                            Lawyer. Your account has been successfully created
                            and verified.
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
                                    <th className="text-end pe-3">States:</th>
                                    <td>
                                      {formData.state_ids
                                        ?.map((stateId) => {
                                          const state = states.find(
                                            (s) =>
                                              String(s.state_id) ===
                                              String(stateId)
                                          );
                                          return state?.name || stateId;
                                        })
                                        .join(", ")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end pe-3">
                                      Districts:
                                    </th>
                                    <td>
                                      {formData.district_ids
                                        ?.map((districtId) => {
                                          const district = districts.find(
                                            (d) =>
                                              String(d.district_id) ===
                                              String(districtId)
                                          );
                                          return district?.name || districtId;
                                        })
                                        .join(", ")}
                                    </td>
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
                                      <span className="badge bg-success">
                                        Active
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

export default DistrictCourt;
