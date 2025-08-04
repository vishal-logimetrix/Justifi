import { useState } from 'react';
import { Link } from 'react-router-dom';

const LawyerCasesList = () => {
  // Dummy cases data
  const cases = [
    {
      id: "CASE-1001",
      title: "Breach of Contract",
      status: "Active",
      type: "Civil",
      client: "John Doe",
      openedDate: "2025-06-15",
      priority: "High"
    },
    {
      id: "CASE-1002",
      title: "Personal Injury Claim",
      status: "Pending",
      type: "Tort",
      client: "Jane Smith",
      openedDate: "2025-05-22",
      priority: "Medium"
    },
    {
      id: "CASE-1003",
      title: "Divorce Settlement",
      status: "Active",
      type: "Family",
      client: "Robert Johnson",
      openedDate: "2025-07-01",
      priority: "High"
    },
    {
      id: "CASE-1004",
      title: "Intellectual Property",
      status: "Closed",
      type: "Commercial",
      client: "Tech Innovations Ltd",
      openedDate: "2025-04-10",
      priority: "Low"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('openedDate');

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

  const filteredCases = cases
    .filter(caseItem => 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(caseItem => statusFilter === 'All' || caseItem.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'openedDate') return new Date(b.openedDate) - new Date(a.openedDate);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'client') return a.client.localeCompare(b.client);
      return 0;
    });

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Cases</h2>
        <Link to="/cases/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> New Case
        </Link>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="openedDate">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="client">Sort by Client</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Opened</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className="fw-medium">{caseItem.id}</td>
                    <td>
                      <Link to={`/cases/${caseItem.id}`} className="text-decoration-none">
                        {caseItem.title}
                      </Link>
                    </td>
                    <td>{caseItem.client}</td>
                    <td>{caseItem.type}</td>
                    <td>{getStatusBadge(caseItem.status)}</td>
                    <td>{getPriorityBadge(caseItem.priority)}</td>
                    <td>{new Date(caseItem.openedDate).toLocaleDateString()}</td>
                    <td>
                      <Link 
                        to={`/cases/${caseItem.id}`} 
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-eye"></i> View
                      </Link>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCases.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No cases found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCasesList;