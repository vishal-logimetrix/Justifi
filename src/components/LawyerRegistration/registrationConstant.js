// Registration form constants

export const REGISTRATION_STEPS = {
  BASIC_INFO: 1,
  DOCUMENTS: 2,
  PAYMENT: 3,
  LOCATION: 4,
  COMPLETE: 5
};

export const STEP_LABELS = {
  [REGISTRATION_STEPS.BASIC_INFO]: "Basic Info",
  [REGISTRATION_STEPS.DOCUMENTS]: "Documents",
  [REGISTRATION_STEPS.PAYMENT]: "Payment",
  [REGISTRATION_STEPS.LOCATION]: "Location",
  [REGISTRATION_STEPS.COMPLETE]: "Complete"
};

export const PLANS = {
  ANNUAL: {
    id: "Annual",
    name: "Annual Subscription",
    price: 4999,
    priceInPaise: 499900,
    description: "One-time payment for a full year of access to all District Court resources.",
    features: [
      "Access to all court resources",
      "Document templates", 
      "Case management tools",
      "Priority support"
    ]
  },
  CONTRIBUTOR: {
    id: "Contributor",
    name: "Contributor Plan",
    price: 2999,
    priceInPaise: 299900,
    description: "Includes 4 free consultations and premium features.",
    features: [
      "Access to all court resources",
      "Document templates",
      "Case management tools", 
      "4 free consultations"
    ]
  }
};

export const DOCUMENT_TYPES = [
  {
    label: "Bar Council Certificate",
    name: "bar_council_certificate",
    icon: "FileText",
    required: true
  },
  {
    label: "State Council Certificate", 
    name: "state_council_certificate",
    icon: "FileText",
    required: true
  },
  {
    label: "Certificate for Practice",
    name: "certificate_for_practice", 
    icon: "FileCheck2",
    required: true
  },
  {
    label: "Legal Undertaking",
    name: "legal_undertaking",
    icon: "FileSignature", 
    required: true
  }
];

export const BASIC_INFO_FIELDS = [
  {
    label: "Full Name",
    name: "lawyer_name",
    icon: "User",
    type: "text",
    placeholder: "John Doe",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Age", 
    name: "age",
    icon: "Calendar",
    type: "number",
    placeholder: "30",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Address",
    name: "address", 
    icon: "MapPin",
    type: "text",
    placeholder: "Pune, Maharashtra",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Contact Number",
    name: "contact_no",
    icon: "Phone", 
    type: "tel",
    placeholder: "9876543210",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Email",
    name: "email_id",
    icon: "Mail",
    type: "email", 
    placeholder: "john@example.com",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Bar Council ID",
    name: "bar_council_reg_no",
    icon: "Briefcase",
    type: "text",
    placeholder: "MAH/123/2025",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "State Council ID", 
    name: "state_council_reg_no",
    icon: "Briefcase",
    type: "text",
    placeholder: "SCR54321",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "PAN Number",
    name: "pan_number",
    icon: "CreditCard",
    type: "text", 
    placeholder: "ABCDE1234F",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Aadhar Number",
    name: "aadhar_number",
    icon: "CreditCard",
    type: "text",
    placeholder: "1234 5678 9012", 
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Bank Account Number",
    name: "bank_account_number", 
    icon: "Landmark",
    type: "text",
    placeholder: "123456789012",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "IFSC Code",
    name: "ifsc_code",
    icon: "Landmark",
    type: "text",
    placeholder: "SBIN0001234",
    required: true, 
    colSize: "col-md-6"
  },
  {
    label: "UPI ID",
    name: "upi_id",
    icon: "Banknote",
    type: "text",
    placeholder: "john@upi",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Languages Known (Indian)",
    name: "languages_known_indian",
    icon: "Languages", 
    type: "text",
    placeholder: "Marathi, Tamil",
    required: true,
    colSize: "col-md-6"
  },
  {
    label: "Languages Known (International)",
    name: "languages_known_international",
    icon: "Globe",
    type: "text",
    placeholder: "English, French",
    required: true,
    colSize: "col-md-6"
  }
];

export const INTERNATIONAL_LITIGATION_OPTIONS = [
  { value: "", label: "Select Experience" },
  { value: "No", label: "No" },
  { value: "Less than 10", label: "Less than 10 cases" },
  { value: "More than 10 but less than 50", label: "More than 10 but less than 50 cases" },
  { value: "More than 50", label: "More than 50 cases" }
];

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'application/pdf',
    'image/jpeg', 
    'image/jpg',
    'image/png'
  ],
  allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png']
};

export const RAZORPAY_CONFIG = {
  key: "rzp_test_izVHe3ku4lNpzX",
  currency: "INR",
  name: "JUSTIFI",
  image: "https://t3.ftcdn.net/jpg/01/36/27/72/360_F_136277252_Ki5FGt3CY0RpTQT4m0kFaL2czE22juVu.jpg",
  description: "District Court Lawyer Registration Fee",
  theme: { color: "#3399cc" }
};

export const API_ENDPOINTS = {
  STATES: "/api/states",
  DISTRICTS_MULTIPLE: "/api/districts/multiple", 
  COMPLEXES: "/api/complexes",
  LAWYERS_BASIC: "lawyers/basic",
  LAWYERS_DOCS: "lawyers/docs",
  LAWYERS_LOCATION: "lawyers/location",
  LAWYERS_COMPLETE: "lawyers/complete",
  BAR_COUNCIL_REGISTER: "/fetch/cases-barcouncil"
};

export const FORM_DATA_INITIAL_STATE = {
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
  state_ids: [],
  district_ids: [],
  complex_ids: []
};

export const SECURITY_FEATURES = [
  {
    icon: "ShieldCheck",
    text: "Secure Registration"
  },
  {
    icon: "Lock", 
    text: "256-bit Encryption"
  },
  {
    icon: "HelpCircle",
    text: "24/7 Support"
  }
];