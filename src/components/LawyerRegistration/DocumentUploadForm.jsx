import React from "react";
import {
  Upload,
  FileText,
  FileCheck2,
  FileSignature,
  ChevronLeft,
  Loader,
} from "lucide-react";

const DocumentUploadForm = ({ 
  files, 
  errors, 
  onFileChange, 
  onSubmit, 
  onPrev, 
  loading, 
  sendingRegistration 
}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // Check if all required documents are uploaded
  const isFormValid = () => {
    return documentTypes.every(doc => files[doc.name]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary">
        Upload Required Documents
      </h3>
      <p className="text-muted mb-4">
        Please upload the following documents in PDF, JPG, or
        PNG format (max 5MB each)
      </p>
      
      {/* Show Bar Council registration status */}
      {sendingRegistration && (
        <div className="alert alert-info d-flex align-items-center mb-4">
          <Loader className="animate-spin me-2" size={20} />
          Sending registration details to Bar Council...
        </div>
      )}
      
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
                  {label} *
                </h5>
                <div className="mt-3">
                  <input
                    type="file"
                    name={name}
                    className={`form-control ${
                      errors[name] ? "is-invalid" : ""
                    }`}
                    onChange={onFileChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {files[name] && (
                    <div className="text-success small mt-1">
                      ✓ {files[name].name}
                    </div>
                  )}
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
          onClick={onPrev}
          disabled={loading || sendingRegistration}
        >
          <ChevronLeft size={18} className="me-1" />
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || sendingRegistration || !isFormValid()}
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
  );
};

export default DocumentUploadForm;