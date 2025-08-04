import { useState } from 'react';
import { format } from 'date-fns';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Call = () => {
  const receivedCalls = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      time: "2025-07-18T14:32:00",
      duration: 125,
      caseReference: "CASE-1001",
      status: "Completed"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      time: "2025-07-17T10:12:00",
      duration: 235,
      caseReference: "CASE-1002",
      status: "Missed"
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "5551234567",
      time: "2025-07-16T16:45:00",
      duration: 80,
      caseReference: "CASE-1003",
      status: "Completed"
    },
  ];

  const [selectedCall, setSelectedCall] = useState(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusBadge = (status) => {
    const classes = {
      Completed: "bg-success",
      Missed: "bg-danger",
      Scheduled: "bg-warning text-dark"
    };
    return <span className={`badge ${classes[status] || 'bg-secondary'} rounded-pill`}>{status}</span>;
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Call History</h2>
        <div className="d-flex">
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-filter me-1"></i> Filter
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-download me-1"></i> Export
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th width="180px">Call Time</th>
                  <th>Client</th>
                  <th>Case Reference</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th width="100px" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receivedCalls.map((call) => (
                  <tr key={call.id}>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">{format(new Date(call.time), 'MMM d, yyyy')}</span>
                        <small className="text-muted">{format(new Date(call.time), 'h:mm a')}</small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="me-2 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                          style={{ width: '32px', height: '32px', fontSize: '14px' }}
                        >
                          {call.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-medium">{call.name}</div>
                          <small className="text-muted">{call.phone}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-primary">{call.caseReference}</td>
                    <td>{formatTime(call.duration)}</td>
                    <td>{getStatusBadge(call.status)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedCall(call)}
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MUI Modal */}
      <Modal
        open={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        aria-labelledby="call-details-modal"
      >
        <Box
          sx={{
            maxWidth: 500,
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            mt: '10%',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {selectedCall && (
            <>
              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{ width: '64px', height: '64px', fontSize: '24px' }}
                >
                  {selectedCall.name.charAt(0)}
                </div>
                <h5 className="mb-1">{selectedCall.name}</h5>
                <p className="text-muted mb-3">{selectedCall.email}</p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Phone</span>
                  <span className="fw-medium">{selectedCall.phone}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Call Time</span>
                  <span className="fw-medium">
                    {format(new Date(selectedCall.time), 'MMM d, yyyy h:mm a')}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Duration</span>
                  <span className="fw-medium">{formatTime(selectedCall.duration)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Case Reference</span>
                  <span className="fw-medium text-primary">{selectedCall.caseReference}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Status</span>
                  {getStatusBadge(selectedCall.status)}
                </li>
              </ul>

              <div className="mt-4 d-flex justify-content-end gap-2">
                <Button variant="outlined" onClick={() => setSelectedCall(null)}>Close</Button>
                <Button variant="contained" startIcon={<i className="bi bi-telephone"></i>}>
                  Call Back
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Call;
