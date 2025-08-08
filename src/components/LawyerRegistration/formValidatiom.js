// Form validation utilities

export const validateBasicInfo = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.lawyer_name || !formData.lawyer_name.trim()) {
    errors.lawyer_name = "Full name is required";
  }
  
  // Age validation
  if (!formData.age || formData.age <= 0 || formData.age > 100) {
    errors.age = "Valid age is required (1-100)";
  }
  
  // Address validation
  if (!formData.address || !formData.address.trim()) {
    errors.address = "Address is required";
  }
  
  // Contact number validation
  if (!formData.contact_no || !/^\d{10}$/.test(formData.contact_no)) {
    errors.contact_no = "Valid 10-digit contact number is required";
  }
  
  // Email validation
  if (!formData.email_id || !/^\S+@\S+\.\S+$/.test(formData.email_id)) {
    errors.email_id = "Valid email is required";
  }
  
  // Bar Council ID validation
  if (!formData.bar_council_reg_no || !formData.bar_council_reg_no.trim()) {
    errors.bar_council_reg_no = "Bar Council ID is required";
  }
  
  // State Council ID validation
  if (!formData.state_council_reg_no || !formData.state_council_reg_no.trim()) {
    errors.state_council_reg_no = "State Council ID is required";
  }
  
  // PAN number validation
  if (!formData.pan_number || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number.toUpperCase())) {
    errors.pan_number = "Valid 10-character PAN number is required (e.g., ABCDE1234F)";
  }
  
  // Aadhar number validation
  if (!formData.aadhar_number || !/^\d{4}\s\d{4}\s\d{4}$/.test(formData.aadhar_number)) {
    errors.aadhar_number = "Aadhar format: XXXX XXXX XXXX";
  }
  
  // Bank account number validation
  if (!formData.bank_account_number || !/^\d{9,18}$/.test(formData.bank_account_number)) {
    errors.bank_account_number = "Valid bank account number required (9-18 digits)";
  }
  
  // IFSC code validation
  if (!formData.ifsc_code || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code.toUpperCase())) {
    errors.ifsc_code = "Valid IFSC code required (e.g., SBIN0001234)";
  }
  
  // UPI ID validation
  if (!formData.upi_id || !formData.upi_id.trim()) {
    errors.upi_id = "UPI ID is required";
  }
  
  // Indian languages validation
  if (!formData.languages_known_indian || !formData.languages_known_indian.trim()) {
    errors.languages_known_indian = "Indian languages known is required";
  }
  
  // International languages validation
  if (!formData.languages_known_international || !formData.languages_known_international.trim()) {
    errors.languages_known_international = "International languages known is required";
  }
  
  // International litigation experience validation
  if (!formData.international_litigation_experience || !formData.international_litigation_experience.trim()) {
    errors.international_litigation_experience = "International litigation experience is required";
  }
  
  return errors;
};

export const validateDocuments = (files) => {
  const errors = {};
  const requiredDocs = [
    "bar_council_certificate",
    "state_council_certificate",
    "certificate_for_practice",
    "legal_undertaking",
  ];
  
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  requiredDocs.forEach((doc) => {
    if (!files[doc]) {
      errors[doc] = "This document is required";
    } else {
      // Check file type
      if (!allowedTypes.includes(files[doc].type)) {
        errors[doc] = "Only PDF, JPG, JPEG, and PNG files are allowed";
      }
      // Check file size
      else if (files[doc].size > maxSize) {
        errors[doc] = "File size must be less than 5MB";
      }
    }
  });
  
  return errors;
};

export const validatePayment = (formData) => {
  const errors = {};
  
  if (!formData.plan || !formData.plan.trim()) {
    errors.plan = "Please select a plan";
  }
  
  const validPlans = ["Annual", "Contributor"];
  if (formData.plan && !validPlans.includes(formData.plan)) {
    errors.plan = "Please select a valid plan";
  }
  
  return errors;
};

export const validateLocation = (formData) => {
  const errors = {};
  
  // State validation
  if (!formData.state_ids || formData.state_ids.length === 0) {
    errors.state_ids = "Please select at least one state";
  }
  
  // District validation
  if (!formData.district_ids || formData.district_ids.length === 0) {
    errors.district_ids = "Please select at least one district";
  }
  
  // Complex validation
  if (!formData.complex_ids || formData.complex_ids.length === 0) {
    errors.complex_ids = "Please select at least one complex";
  }
  
  return errors;
};

// Utility functions for form field checking
export const isBasicInfoComplete = (formData) => {
  const requiredFields = [
    'lawyer_name', 'age', 'address', 'contact_no', 'email_id',
    'bar_council_reg_no', 'state_council_reg_no', 'pan_number',
    'aadhar_number', 'bank_account_number', 'ifsc_code', 'upi_id',
    'languages_known_indian', 'languages_known_international',
    'international_litigation_experience'
  ];
  
  return requiredFields.every(field => 
    formData[field] && formData[field].toString().trim() !== ''
  );
};

export const isDocumentsComplete = (files) => {
  const requiredDocs = [
    "bar_council_certificate",
    "state_council_certificate", 
    "certificate_for_practice",
    "legal_undertaking",
  ];
  
  return requiredDocs.every(doc => files[doc]);
};

export const isPaymentComplete = (formData) => {
  return formData.plan && formData.plan.trim() !== '';
};

export const isLocationComplete = (formData) => {
  return (
    formData.state_ids &&
    formData.state_ids.length > 0 &&
    formData.district_ids &&
    formData.district_ids.length > 0 &&
    formData.complex_ids &&
    formData.complex_ids.length > 0
  );
};

// Format helper functions
export const formatAadharNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Add spaces every 4 digits
  if (digits.length <= 4) {
    return digits;
  } else if (digits.length <= 8) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  } else {
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
  }
};

export const formatPANNumber = (value) => {
  return value.toUpperCase();
};

export const formatIFSCCode = (value) => {
  return value.toUpperCase();
};

export const formatContactNumber = (value) => {
  // Remove all non-digits
  return value.replace(/\D/g, '').slice(0, 10);
};