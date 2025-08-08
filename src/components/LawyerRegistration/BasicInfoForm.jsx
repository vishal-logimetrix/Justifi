import React from "react";
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
} from "lucide-react";
import { BASIC_INFO_FIELDS, INTERNATIONAL_LITIGATION_OPTIONS } from "./registrationConstant";
import { formatAadharNumber, formatContactNumber, formatIFSCCode, formatPANNumber, isBasicInfoComplete } from "./formValidatiom";

const BasicInfoForm = ({ formData, errors, onChange, onSubmit, loading }) => {
  
  const iconMap = {
    User: <User />,
    Calendar: <Calendar />,
    MapPin: <MapPin />,
    Phone: <Phone />,
    Mail: <Mail />,
    Briefcase: <Briefcase />,
    CreditCard: <CreditCard />,
    Landmark: <Landmark />,
    Banknote: <Banknote />,
    Languages: <Languages />,
    Globe: <Globe />
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Apply formatting based on field type
    switch (name) {
      case 'aadhar_number':
        formattedValue = formatAadharNumber(value);
        break;
      case 'pan_number':
        formattedValue = formatPANNumber(value);
        break;
      case 'ifsc_code':
        formattedValue = formatIFSCCode(value);
        break;
      case 'contact_no':
        formattedValue = formatContactNumber(value);
        break;
      default:
        formattedValue = value;
    }
    
    onChange(name, formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // Check if all required fields are filled
  const isFormValid = isBasicInfoComplete(formData);

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary">
        Personal & Professional Information
      </h3>
      <p className="text-muted mb-4">
        Please fill in all the required information accurately. Fields marked with * are mandatory.
      </p>
      
      <div className="row g-3">
        {BASIC_INFO_FIELDS.map((field, index) => {
          const Icon = iconMap[field.icon];
          return (
            <div className={field.colSize} key={index}>
              <label className="form-label fw-semibold">
                {field.label} {field.required && <span className="text-danger">*</span>}
              </label>
              <div className="input-group mb-1">
                <span className="input-group-text bg-white">
                  {React.cloneElement(Icon, {
                    size: 18,
                    className: "text-muted",
                  })}
                </span>
                <input
                  name={field.name}
                  type={field.type}
                  className={`form-control ${
                    errors[field.name] ? "is-invalid" : ""
                  }`}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  maxLength={field.name === 'contact_no' ? 10 : 
                           field.name === 'pan_number' ? 10 :
                           field.name === 'aadhar_number' ? 14 :
                           field.name === 'ifsc_code' ? 11 : undefined}
                />
              </div>
              {errors[field.name] && (
                <div className="text-danger small mt-1">
                  {errors[field.name]}
                </div>
              )}
            </div>
          );
        })}

        {/* International Litigation Experience Dropdown */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            International Litigation Experience <span className="text-danger">*</span>
          </label>
          <div className="input-group mb-1">
            <span className="input-group-text bg-white">
              <Globe size={18} className="text-muted" />
            </span>
            <select
              name="international_litigation_experience"
              value={formData.international_litigation_experience || ""}
              onChange={handleChange}
              className={`form-select ${
                errors.international_litigation_experience ? "is-invalid" : ""
              }`}
              required
            >
              {INTERNATIONAL_LITIGATION_OPTIONS.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {errors.international_litigation_experience && (
            <div className="text-danger small mt-1">
              {errors.international_litigation_experience}
            </div>
          )}
        </div>
      </div>

      {/* Form completion status */}
      {!isFormValid && (
        <div className="alert alert-info mt-4">
          <i className="bi bi-info-circle me-2"></i>
          Please fill in all required fields to proceed.
        </div>
      )}

      <div className="d-flex justify-content-end mt-5">
        <button
          type="submit"
          className="btn btn-primary px-4"
          disabled={loading || !isFormValid}
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
  );
};

export default BasicInfoForm;