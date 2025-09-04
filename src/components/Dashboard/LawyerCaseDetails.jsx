import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosState } from "../../api/axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LawyerCaseDetails = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documentLoadError, setDocumentLoadError] = useState(false);
  const [documentHTML, setDocumentHTML] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [pdfTitle, setPdfTitle] = useState("PDF Preview");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosState.get(
          `${
            import.meta.env.VITE_API_URL_STATE
          }/api/get-districts-cases/${caseId}`
        );
        if (response.data?.status) {
          setCaseDetails(response.data.data);
        } else {
          setError("Case details not found");
        }
      } catch (err) {
        console.error("Error fetching case details:", err);
        setError("Failed to load case details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [caseId]);

  const getStatusBadge = (status) => {
    const classes = {
      Win: "bg-success",
      Lost: "bg-danger",
      Pending: "bg-warning text-dark",
      Active: "bg-primary",
      Closed: "bg-secondary",
    };
    return (
      <span
        className={`badge ${
          classes[status] || "bg-secondary"
        } rounded-pill px-3 py-2 fw-medium`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Create a new Date object from the string.
    // The 'T' in the string indicates it's an ISO 8601 format,
    // so JavaScript correctly parses it as UTC.
    const date = new Date(dateString);

    // Check if the date is valid.
    if (isNaN(date.getTime())) return "Invalid Date";

    // Format the date using UTC methods to prevent timezone conversion.
    const year = date.getUTCFullYear();
    const month = date.toLocaleString("en-IN", {
      month: "short",
      timeZone: "UTC",
    });
    const day = date.getUTCDate();

    return `${day} ${month} ${year}`;
  };

  const openDocumentModal = async (document) => {
    setCurrentDocument(document);
    setShowDocumentModal(true);
    setDocumentLoadError(false);
    setDocumentHTML(null);
    setPdfBlobUrl(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_STATE}/fetch/file-data`,
        { url: document.url },
        { responseType: "arraybuffer" }
      );

      const buffer = response.data;
      const uintArray = new Uint8Array(buffer);

      // Convert first 4–5 bytes to check for %PDF
      const firstFewBytes = String.fromCharCode(...uintArray.slice(0, 4));
      console.log("🧪 Magic header:", firstFewBytes);

      if (firstFewBytes === "%PDF") {
        // ✅ It's a PDF
        const blob = new Blob([buffer], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
      } else {
        // 🟡 Try decoding as text/html fallback
        const decodedText = new TextDecoder("utf-8").decode(buffer);

        // Optional: verify if it looks like HTML (starts with <!DOCTYPE or <html etc.)
        if (decodedText.trim().startsWith("<")) {
          setDocumentHTML(decodedText);
        } else {
          throw new Error("Unsupported file content");
        }
      }
    } catch (error) {
      console.error("❌ Error loading document:", error);
      setDocumentLoadError(true);
    }
  };

  const previewPdfBlob = async (document) => {
    setPdfLoading(true);
    setPdfBlobUrl(null);
    setPdfLoadError(false);
    setPdfTitle(document.name || "PDF Preview");
    setShowPdfModal(true);

    try {
      const response = await axios.get(document.url, {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"];
      if (contentType.includes("application/pdf")) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
      } else {
        setPdfLoadError(true);
      }
    } catch (error) {
      console.error("Error loading PDF:", error);
      setPdfLoadError(true);
    } finally {
      setPdfLoading(false);
    }
  };

  const closeDocumentModal = () => {
    setShowDocumentModal(false);
    setCurrentDocument(null);
    setDocumentLoadError(false);
  };

  const back_fun = () => {
    setShowDocumentModal(false);
    setCurrentDocument(null);
    setDocumentLoadError(false);
  };

  const handleDocumentLoadError = () => {
    setDocumentLoadError(true);
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="mt-3 fs-5">Loading case details...</span>
          <p className="text-muted mt-2">
            Please wait while we fetch the case information
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-3 fs-3"></i>
          <div>
            <h5 className="alert-heading">Error Loading Case Details</h5>
            <p className="mb-0">{error}</p>
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-repeat me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!caseDetails) {
    return (
      <div className="container-fluid py-5">
        <div
          className="alert alert-warning d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-circle-fill me-3 fs-3"></i>
          <div>
            <h5 className="alert-heading">Case Details Not Available</h5>
            <p className="mb-0">
              The requested case could not be found or is unavailable at this
              time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-0">Case Details</h1>
        </div>
      </div>

      {/* Case Summary Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            <div className="flex-grow-1 mb-3 mb-md-0">
              <div className="d-flex flex-wrap align-items-center mb-2">
                <h2 className="h3 mb-0 me-3">{caseDetails.title}</h2>
                {getStatusBadge(caseDetails.case_status)}
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="bi bi-folder me-1"></i>{" "}
                  {caseDetails.details?.type || "N/A"}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="bi bi-calendar me-1"></i> Filed:{" "}
                  {formatDate(caseDetails.details?.filingDate)}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="bi bi-arrow-clockwise me-1"></i> Updated:{" "}
                  {formatDate(caseDetails.updatedAt)}
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="bi bi-123 me-1"></i> CNR:{" "}
                  {caseDetails.cnr || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-bottom p-0">
          <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <i className="bi bi-info-circle me-2"></i>Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "parties" ? "active" : ""
                }`}
                onClick={() => setActiveTab("parties")}
              >
                <i className="bi bi-people me-2"></i>Parties
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "timeline" ? "active" : ""
                }`}
                onClick={() => setActiveTab("timeline")}
              >
                <i className="bi bi-clock-history me-2"></i>Timeline
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "documents" ? "active" : ""
                }`}
                onClick={() => setActiveTab("documents")}
              >
                <i className="bi bi-folder me-2"></i>Documents
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "status" ? "active" : ""}`}
                onClick={() => setActiveTab("status")}
              >
                <i className="bi bi-clipboard-data me-2"></i>Status
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="card-body p-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card h-100 border-0">
                  <div className="card-header bg-white border-bottom-0 pb-0">
                    <h5 className="card-title mb-0">Case Summary</h5>
                  </div>
                  <div className="card-body">
                    <dl className="row mb-0">
                      <dt className="col-sm-5 fw-normal text-muted">
                        CNR Number
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.cnr || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Case Type
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.details?.type || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Filing Number
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.details?.filingNumber || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Registration Number
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.details?.registrationNumber || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Filing Date
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {formatDate(caseDetails.details?.filingDate)}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Registration Date
                      </dt>
                      <dd className="col-sm-7 mb-0">
                        {formatDate(caseDetails.details?.registrationDate)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card h-100 border-0">
                  <div className="card-header bg-white border-bottom-0 pb-0">
                    <h5 className="card-title mb-0">Legal Framework</h5>
                  </div>
                  <div className="card-body">
                    <dl className="row mb-0">
                      <dt className="col-sm-5 fw-normal text-muted">Acts</dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.actsAndSections?.acts || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Sections
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.actsAndSections?.sections || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        FIR Details
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.firstInformationReport
                          ? `${caseDetails.firstInformationReport.firNumber}/${caseDetails.firstInformationReport.year} at ${caseDetails.firstInformationReport.policeStation}`
                          : "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Nature of Disposal
                      </dt>
                      <dd className="col-sm-7 mb-2">
                        {caseDetails.status?.natureOfDisposal || "N/A"}
                      </dd>

                      <dt className="col-sm-5 fw-normal text-muted">
                        Court & Judge
                      </dt>
                      <dd className="col-sm-7 mb-0">
                        {caseDetails.status?.courtNumberAndJudge || "N/A"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Parties Tab */}
          {activeTab === "parties" && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card border-0 h-100">
                  <div className="card-header bg-white border-bottom-0 pb-0">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-person-check me-2 text-primary"></i>
                      Petitioners
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {caseDetails.parties?.petitioners?.map(
                        (petitioner, index) => (
                          <div
                            key={index}
                            className="list-group-item border-0 px-0 py-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <div className="avatar-sm">
                                  <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                    <i className="bi bi-person"></i>
                                  </span>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{petitioner}</h6>
                                <p className="mb-0 text-muted small">
                                  Represented by:{" "}
                                  {caseDetails.parties.petitionerAdvocates[
                                    index
                                  ] || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card border-0 h-100">
                  <div className="card-header bg-white border-bottom-0 pb-0">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-person-x me-2 text-danger"></i>
                      Respondents
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {caseDetails.parties?.respondents?.map(
                        (respondent, index) => (
                          <div
                            key={index}
                            className="list-group-item border-0 px-0 py-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <div className="avatar-sm">
                                  <span className="avatar-title bg-danger-subtle text-danger rounded-circle">
                                    <i className="bi bi-person"></i>
                                  </span>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{respondent}</h6>
                                <p className="mb-0 text-muted small">
                                  Represented by:{" "}
                                  {caseDetails.parties.respondentAdvocates[
                                    index
                                  ] || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="timeline">
              {caseDetails.history?.map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-badge bg-success"></div>
                  <div className="timeline-content card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title mb-0">{event.purpose}</h6>
                        <small className="text-muted">
                          {formatDate(event.businessDate)}
                        </small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text mb-1 small">
                          Judge: {event.judge}
                        </p>
                        <p className="card-text small">
                          Next Date:{" "}
                          {event.nextDate ? formatDate(event.nextDate) : "N/A"}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() => openDocumentModal(event)}
                      >
                        <i className="bi bi-box-arrow-up-right me-1"></i>View
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {caseDetails.orders?.map((order, index) => (
                  <div key={index} className="col">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-start">
                          <div className="bg-light p-2 rounded me-3">
                            <i className="bi bi-file-earmark-pdf text-danger fs-4"></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="card-title">
                              {order.name} {order.number}
                            </h6>
                            <p className="card-text text-muted small mb-1">
                              <i className="bi bi-calendar me-1"></i>{" "}
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-0 pt-0">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => previewPdfBlob(order)}
                        >
                          <i className="bi bi-eye me-1"></i> Preview
                        </button>
                        {/* <a
                          href={order.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="bi bi-download me-1"></i> Download
                        </a> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(!caseDetails.orders || caseDetails.orders.length === 0) && (
                <div className="text-center py-5">
                  <i className="bi bi-folder-x text-muted fs-1"></i>
                  <p className="mt-3 fs-5">
                    No documents available for this case
                  </p>
                  <p className="text-muted">
                    Upload documents to keep track of all case-related files
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Status Tab */}
          {activeTab === "status" && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-bottom-0">
                    <h5 className="card-title mb-0">Case Status</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                      <span className="fw-medium">Current Stage:</span>
                      <span className="badge bg-success px-3 py-2">
                        {caseDetails.status?.caseStage || "N/A"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Decision Date:</span>
                      <span>
                        {formatDate(caseDetails.status?.decisionDate)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Next Hearing:</span>
                      <span>
                        {formatDate(caseDetails.status?.nextHearingDate)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">First Hearing:</span>
                      <span>
                        {formatDate(caseDetails.status?.firstHearingDate)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Nature of Disposal:</span>
                      <span>
                        {caseDetails.status?.natureOfDisposal || "N/A"}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Court & Judge:</span>
                      <span className="text-end">
                        {caseDetails.status?.courtNumberAndJudge || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-bottom-0">
                    <h5 className="card-title mb-0">Case Progress</h5>
                  </div>
                  <div className="card-body">
                    <div className="progress mb-4" style={{ height: "10px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "75%" }}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <div className="text-center">
                        <div className="icon-md bg-success text-white rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center">
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <p className="mb-0 small">Filed</p>
                        <small className="text-muted">
                          {formatDate(caseDetails.details?.filingDate)}
                        </small>
                      </div>

                      <div className="text-center">
                        <div className="icon-md bg-success text-white rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center">
                          <i className="bi bi-check-circle"></i>
                        </div>
                        <p className="mb-0 small">Registered</p>
                        <small className="text-muted">
                          {formatDate(caseDetails.details?.registrationDate)}
                        </small>
                      </div>

                      <div className="text-center">
                        <div className="icon-md bg-success text-white rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center">
                          <i className="bi bi-calendar-event"></i>
                        </div>
                        <p className="mb-0 small">First Hearing</p>
                        <small className="text-muted">
                          {formatDate(caseDetails.status?.firstHearingDate)}
                        </small>
                      </div>

                      <div className="text-center">
                        <div className="icon-md bg-light border text-dark rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center">
                          <i className="bi bi-hourglass-split"></i>
                        </div>
                        <p className="mb-0 small">Next Hearing</p>
                        <small className="text-muted">
                          {formatDate(caseDetails.status?.nextHearingDate)}
                        </small>
                      </div>
                    </div>

                    <div className="alert alert-info mb-0">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-info-circle me-2 fs-4"></i>
                        <div>
                          <h6 className="alert-heading mb-1">Case Progress</h6>
                          <p className="mb-0">
                            This case is 75% complete. Next hearing scheduled
                            for{" "}
                            {formatDate(caseDetails.status?.nextHearingDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Backdrop */}
      <Dialog
        open={showDocumentModal}
        onClose={closeDocumentModal}
        fullWidth
        // maxWidth="md" // Medium size
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Document Preview
          <IconButton onClick={closeDocumentModal} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          {documentLoadError ? (
            <Typography color="error" align="center" sx={{ p: 4 }}>
              Failed to load document. Please try again later.
            </Typography>
          ) : pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              title="PDF Preview"
              style={{ width: "100%", height: "70vh", border: "none" }}
            />
          ) : documentHTML ? (
            <div
              style={{
                padding: "1rem",
                overflowY: "auto",
                maxHeight: "70vh",
              }}
              dangerouslySetInnerHTML={{ __html: documentHTML }}
            />
          ) : (
            <div className="text-center py-5">
              <CircularProgress color="primary" />
              <Typography sx={{ mt: 2 }}>Loading Document...</Typography>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeDocumentModal}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
          {pdfBlobUrl && (
            <Button
              href={pdfBlobUrl}
              download="document.pdf"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="contained"
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* pdf model  */}
      <Dialog
        open={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        fullWidth
        // maxWidth="xl"
        // PaperProps={{
        //   sx: { minHeight: "500px" },
        // }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {pdfTitle}
          <IconButton
            onClick={() => setShowPdfModal(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Body */}
        <DialogContent dividers sx={{ p: 0 }}>
          {pdfLoadError ? (
            <Typography color="error" align="center" sx={{ p: 4 }}>
              Failed to load PDF. Please try again later.
            </Typography>
          ) : pdfLoading ? (
            <div className="text-center py-5">
              <CircularProgress color="primary" />
              <Typography sx={{ mt: 2 }}>Loading PDF...</Typography>
            </div>
          ) : pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              title="PDF Viewer"
              style={{ width: "100%", height: "70vh", border: "none" }}
            />
          ) : null}
        </DialogContent>

        {/* Footer */}
        <DialogActions>
          <Button
            onClick={() => setShowPdfModal(false)}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
          {pdfBlobUrl && (
            <Button
              href={pdfBlobUrl}
              download={`${pdfTitle}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="contained"
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <style>{`
        .nav-tabs-custom .nav-link {
          padding: 1rem 1.5rem;
          font-weight: 500;
          border: none;
          border-bottom: 3px solid transparent;
          color: #6c757d;
        }
        
.nav-tabs-custom .nav-link.active {
  color: #28a745; /* green text */
  background: transparent;
  border-bottom: 3px solid #28a745; /* green border */
}
        
        .nav-tabs-custom .nav-link i {
          margin-right: 8px;
        }
        
        .timeline {
          position: relative;
          padding-left: 40px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e9ecef;
          left: 20px;
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        
        .timeline-badge {
          position: absolute;
          left: 10px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          z-index: 1;
        }
        
        .timeline-content {
          margin-left: 40px;
        }
        
        .avatar-sm {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .avatar-title {
          font-size: 1rem;
        }
        
        .icon-md {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-backdrop {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default LawyerCaseDetails;
