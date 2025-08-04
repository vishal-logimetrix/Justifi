import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const LawyerCaseDetails = () => {
  const { caseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy case data - in real app this would come from API
  const caseData = {
    id: caseId || "CASE-1001",
    title: "Breach of Contract",
    status: "Active",
    type: "Civil",
    priority: "High",
    client: {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St, New York, NY 10001"
    },
    openedDate: "2025-06-15",
    lastUpdated: "2025-07-18",
    description: "The client alleges that the opposing party failed to fulfill contractual obligations regarding software development services.",
    documents: [
      { id: 1, name: "Contract Agreement.pdf", date: "2025-06-10", size: "2.4 MB" },
      { id: 2, name: "Email Correspondence.zip", date: "2025-06-18", size: "1.2 MB" },
      { id: 3, name: "Meeting Notes.docx", date: "2025-07-05", size: "0.5 MB" }
    ],
    timeline: [
      { id: 1, date: "2025-06-15", event: "Case Opened", description: "Initial consultation with client" },
      { id: 2, date: "2025-06-20", event: "Documents Submitted", description: "Client provided all required documents" },
      { id: 3, date: "2025-07-10", event: "Court Filing", description: "Filed complaint in district court" }
    ],
    notes: [
      { id: 1, author: "You", date: "2025-07-15", content: "Client confirmed receipt of initial documents. Waiting for additional evidence." },
      { id: 2, author: "John Smith", date: "2025-07-10", content: "Prepared court filing documents for review." }
    ]
  };

  const getStatusBadge = (status) => {
    const classes = {
      Active: "bg-primary",
      Closed: "bg-success",
      Pending: "bg-warning text-dark"
    };
    return <span className={`badge ${classes[status] || 'bg-secondary'} rounded-pill`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      High: "bg-danger",
      Medium: "bg-warning text-dark",
      Low: "bg-secondary"
    };
    return <span className={`badge ${classes[priority] || 'bg-light text-dark'} rounded-pill`}>{priority}</span>;
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Case Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/cases">Cases</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{caseData.id}</li>
            </ol>
          </nav>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-download me-1"></i> Export
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-pencil-square me-1"></i> Edit Case
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            <div className="flex-grow-1 mb-3 mb-md-0">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{caseData.title}</h3>
                {getStatusBadge(caseData.status)}
                <span className="ms-3">{getPriorityBadge(caseData.priority)}</span>
              </div>
              <div className="text-muted">
                <span className="me-3"><i className="bi bi-folder me-1"></i> {caseData.type} Case</span>
                <span className="me-3"><i className="bi bi-calendar me-1"></i> Opened: {caseData.openedDate}</span>
                <span><i className="bi bi-arrow-clockwise me-1"></i> Last Updated: {caseData.lastUpdated}</span>
              </div>
            </div>
            <div className="d-flex">
              <button className="btn btn-outline-danger me-2">
                <i className="bi bi-trash me-1"></i> Close Case
              </button>
              <button className="btn btn-success">
                <i className="bi bi-telephone me-1"></i> Call Client
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Client Information</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className="avatar avatar-xl bg-primary text-white rounded-circle me-3">
                  {caseData.client.name.charAt(0)}
                </div>
                <div>
                  <h5 className="mb-1">{caseData.client.name}</h5>
                  <p className="text-muted mb-0">{caseData.client.email}</p>
                </div>
              </div>
              
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span className="text-muted">Phone</span>
                  <span className="fw-medium">{caseData.client.phone}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span className="text-muted">Address</span>
                  <span className="fw-medium text-end">{caseData.client.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Case Documents</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {caseData.documents.map(doc => (
                  <div key={doc.id} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="bi bi-file-earmark-text me-2"></i>
                        <span className="fw-medium">{doc.name}</span>
                      </div>
                      <div className="text-muted small">{doc.size}</div>
                    </div>
                    <div className="text-muted small mt-1">{doc.date}</div>
                    <div className="mt-2">
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-primary w-100 mt-3">
                <i className="bi bi-plus me-1"></i> Add Document
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'timeline' ? 'active' : ''}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                  >
                    Notes
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === 'overview' && (
                <div>
                  <h5 className="mb-3">Case Description</h5>
                  <p className="mb-4">{caseData.description}</p>
                  
                  <h5 className="mb-3">Case Details</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th width="30%">Case Type</th>
                          <td>{caseData.type}</td>
                        </tr>
                        <tr>
                          <th>Case Status</th>
                          <td>{getStatusBadge(caseData.status)}</td>
                        </tr>
                        <tr>
                          <th>Priority</th>
                          <td>{getPriorityBadge(caseData.priority)}</td>
                        </tr>
                        <tr>
                          <th>Date Opened</th>
                          <td>{caseData.openedDate}</td>
                        </tr>
                        <tr>
                          <th>Last Updated</th>
                          <td>{caseData.lastUpdated}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="timeline">
                  {caseData.timeline.map(event => (
                    <div key={event.id} className="timeline-item">
                      <div className="timeline-badge bg-primary"></div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">{event.event}</h6>
                          <small className="text-muted">{event.date}</small>
                        </div>
                        <p className="mb-0">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <div className="mb-4">
                    <textarea 
                      className="form-control" 
                      rows="4" 
                      placeholder="Add new case note..."
                    ></textarea>
                    <div className="d-flex justify-content-end mt-2">
                      <button className="btn btn-primary">Save Note</button>
                    </div>
                  </div>
                  
                  {caseData.notes.map(note => (
                    <div key={note.id} className="card bg-light mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>{note.author}</strong>
                          <small className="text-muted">{note.date}</small>
                        </div>
                        <p className="mb-0">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCaseDetails;