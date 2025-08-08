import React from "react";
import { ChevronLeft } from "lucide-react";

const PaymentForm = ({ 
  formData, 
  onPlanSelect, 
  onPayment, 
  onPrev, 
  loading 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.plan) {
      onPayment();
    }
  };

  // Check if plan is selected
  const isFormValid = () => {
    return formData.plan && formData.plan.trim() !== '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary">
        Select Your Plan & Complete Payment
      </h3>
      
      <div className="alert alert-warning mb-4">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Payment is required to complete your registration. Please select a plan below.
      </div>

      <div className="row g-3 mb-4">
        {["Annual", "Contributor"].map((plan) => (
          <div className="col-md-6" key={plan}>
            <div
              className={`card h-100 ${
                formData.plan === plan
                  ? "border-primary bg-primary bg-opacity-10"
                  : "border-light"
              }`}
              onClick={() => onPlanSelect(plan)}
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
                    ? "One-time payment for a full year of access to all District Court resources."
                    : "Includes 4 free consultations and premium features."}
                </p>
                <ul className="list-unstyled text-muted small">
                  <li>✓ Access to all court resources</li>
                  <li>✓ Document templates</li>
                  <li>✓ Case management tools</li>
                  {plan === "Annual" && <li>✓ Priority support</li>}
                  {plan === "Contributor" && <li>✓ 4 free consultations</li>}
                </ul>
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

      {formData.plan && (
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
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-5">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onPrev}
          disabled={loading}
        >
          <ChevronLeft size={18} className="me-1" />
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !isFormValid()}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
              Processing Payment...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;