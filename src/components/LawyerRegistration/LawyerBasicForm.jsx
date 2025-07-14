import React, { useRef, useState } from "react";
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
} from "lucide-react";
import { toast } from "react-toastify";
import { postRequest } from "../../api/httpService";

const initialForm = {
  fullName: "",
  age: "",
  address: "",
  contact: "",
  email: "",
  barCouncilId: "",
  stateCouncilId: "",
  pan: "",
  aadhar: "",
  accountNo: "",
  ifsc: "",
  upi: "",
  plan: "",
  languagesIndian: "",
  languagesInternational: "",
  internationalLitigation: "",
};

const LawyerBasicForm = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Valid 10-digit contact number is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.barCouncilId.trim())
      newErrors.barCouncilId = "Bar Council ID is required";
    if (!formData.stateCouncilId.trim())
      newErrors.stateCouncilId = "State Council ID is required";
    if (!/^\w{10}$/.test(formData.pan))
      newErrors.pan = "Valid 10-character PAN number is required";
    if (!/^\d{4} \d{4} \d{4}$/.test(formData.aadhar))
      newErrors.aadhar = "Aadhar format: XXXX XXXX XXXX";
    if (!/^\d{9,18}$/.test(formData.accountNo))
      newErrors.accountNo = "Valid bank account number required";
    if (!/^\w{4}0\w{6}$/.test(formData.ifsc))
      newErrors.ifsc = "Valid IFSC code required";
    if (!formData.upi.trim()) newErrors.upi = "UPI ID is required";
    if (!formData.languagesIndian.trim())
      newErrors.languagesIndian = "Required";
    if (!formData.languagesInternational.trim())
      newErrors.languagesInternational = "Required";
    if (!formData.internationalLitigation.trim())
      newErrors.internationalLitigation = "Select a value";
    if (!formData.plan) newErrors.plan = "Please select a plan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePlanSelect = (plan) => setFormData({ ...formData, plan });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      lawyer_name: formData.fullName,
      age: formData.age,
      address: formData.address,
      email_id: formData.email,
      contact_no: formData.contact,
      bar_council_reg_no: formData.barCouncilId,
      state_council_reg_no: formData.stateCouncilId,
      pan_number: formData.pan,
      aadhar_number: formData.aadhar,
      bank_account_number: formData.accountNo,
      ifsc_code: formData.ifsc,
      upi_id: formData.upi,
      plan: formData.plan,
      languages_known_indian: formData.languagesIndian,
      languages_known_international: formData.languagesInternational,
      international_litigation_experience: formData.internationalLitigation,
    };

    console.log("payload--", payload);

    setLoading(true);

    try {
      const options = {
        key: "rzp_test_izVHe3ku4lNpzX",
        amount: 50000,
        currency: "INR",
        name: "JUSTIFI",
        image:
          "https://t3.ftcdn.net/jpg/01/36/27/72/360_F_136277252_Ki5FGt3CY0RpTQT4m0kFaL2czE22juVu.jpg",
        description: "Lawyer Registration Fee",
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        handler: async function () {
          try {
            const res = await postRequest("lawyers/basic", payload);
            if (res.status === "pending_docs") {
              toast.success(
                "Basic info submitted. Proceed to document upload."
              );
              onSuccess(res.lawyer_id);
            }
          } catch (err) {
            toast.error(
              "Payment succeeded, but registration failed. Contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.contact,
        },
        notes: { plan: formData.plan },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        toast.error("Payment failed. Try again.");
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      toast.error("Error during payment process.");
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        {[
          ["Full Name", "fullName", <User />, "text", "John Doe"],
          ["Age", "age", <Calendar />, "number", "30"],
          ["Address", "address", <MapPin />, "text", "Pune, Maharashtra"],
          ["Contact Number", "contact", <Phone />, "text", "9876543210"],
          ["Email", "email", <Mail />, "email", "john@example.com"],
          [
            "Bar Council ID",
            "barCouncilId",
            <Briefcase />,
            "text",
            "MAH/123/2025",
          ],
          [
            "State Council ID",
            "stateCouncilId",
            <Briefcase />,
            "text",
            "SCR54321",
          ],
          ["PAN Number", "pan", <CreditCard />, "text", "ABCDE1234F"],
          ["Aadhar Number", "aadhar", <CreditCard />, "text", "1234 5678 9012"],
          [
            "Bank Account Number",
            "accountNo",
            <Landmark />,
            "text",
            "123456789012",
          ],
          ["IFSC Code", "ifsc", <Landmark />, "text", "SBIN0001234"],
          ["UPI ID", "upi", <Banknote />, "text", "john@upi"],
          [
            "Languages Known (Indian)",
            "languagesIndian",
            <Languages />,
            "text",
            "Marathi, Tamil",
          ],
          [
            "Languages Known (International)",
            "languagesInternational",
            <Globe />,
            "text",
            "English, French",
          ],
        ].map(([label, name, Icon, type, placeholder], i) => (
          <div className="col-md-6" key={i}>
            <label className="form-label fw-semibold">{label}</label>
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
                className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
            {errors[name] && (
              <div className="text-danger small mt-1">{errors[name]}</div>
            )}
          </div>
        ))}

        {/* International Litigation Band */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            International Litigation Experience
          </label>
          <select
            name="internationalLitigation"
            value={formData.internationalLitigation}
            onChange={handleChange}
            className={`form-select ${
              errors.internationalLitigation ? "is-invalid" : ""
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
          {errors.internationalLitigation && (
            <div className="text-danger small mt-1">
              {errors.internationalLitigation}
            </div>
          )}
        </div>
      </div>

      {/* Plan selection and submit */}
      <div className="mt-4">
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
                      <i className="bi bi-check-circle-fill"></i> Selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.plan && (
          <div className="text-danger small mt-2">{errors.plan}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 mt-4 py-3 fw-semibold"
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
          "Proceed to pay and Submit Basic Info"
        )}
      </button>
    </form>
  );
};

export default LawyerBasicForm;
