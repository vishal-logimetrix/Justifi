import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Upload, FileText, FileCheck2, FileSignature } from "lucide-react";

const LawyerDocsForm = ({ lawyerId, onSuccess }) => {
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const fileAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  fileAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong!";
      toast.error(msg);
      return Promise.reject(err);
    }
  );

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bar_council_certificate", files["bar_council_certificate"]);
      formData.append("state_council_certificate", files["state_council_certificate"]);
      formData.append("certificate_for_practice", files["certificate_for_practice"]);
      formData.append("legal_undertaking", files["legal_undertaking"]);

      await fileAxios.post(`lawyers/docs/${lawyerId}`, formData);
      toast.success("Documents uploaded successfully");
      formRef.current.reset();
      setFiles({});
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const documentTypes = [
    { label: "Bar Council Certificate", name: "bar_council_certificate", icon: <FileText /> },
    { label: "State Council Certificate", name: "state_council_certificate", icon: <FileText /> },
    { label: "Certificate for Practice", name: "certificate_for_practice", icon: <FileCheck2 /> },
    { label: "Legal Undertaking", name: "legal_undertaking", icon: <FileSignature /> },
  ];

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        {documentTypes.map(({ label, name, icon }, index) => (
          <div className="col-md-6" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center">
                  {React.cloneElement(icon, { className: "me-2 text-primary", size: 20 })}
                  {label}
                </h5>
                <div className="mt-3">
                  <input
                    type="file"
                    name={name}
                    className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {errors[name] && (
                    <div className="invalid-feedback d-block">{errors[name]}</div>
                  )}
                  <small className="text-muted">PDF, JPG, or PNG (Max 5MB)</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 mt-4 py-3 fw-semibold"
        disabled={loading || Object.keys(files).length < 4}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Uploading...
          </>
        ) : (
          <>
            <Upload className="me-2" size={18} />
            Upload All Documents
          </>
        )}
      </button>
    </form>
  );
};

export default LawyerDocsForm;
