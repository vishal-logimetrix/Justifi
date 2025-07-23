// src/pages/LawyerDashboard.jsx
import { useEffect, useState } from "react";
import { Gavel, TaskAlt, PendingActions, Lock, Circle } from "@mui/icons-material";
import { Box, Button, Typography, CircularProgress, Skeleton, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CaseStatusChart from "../components/Dashboard/CaseStatusChart";
import CaseTypeChart from "../components/Dashboard/CaseTypeChart";
import { connectSocket, getSocket, disconnectSocket } from "../Socket/socket";


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const LawyerDashboard = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [totalCounts, setTotalCounts] = useState({
    totalCases: 0,
    active: 0,
    pending: 0,
    closed: 0,
  });
  const [caseTypes, setCaseTypes] = useState({
    civil: 0,
    criminal: 0,
    family: 0,
  });
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);


  const user = JSON.parse(localStorage.getItem("user")) || { 
    fullname: "John Doe" 
  };
  const greeting = `${getGreeting()}`;

  useEffect(() => {
    fetchCases();
    initSocket();
    
    return () => {
      // Clean up socket connection on unmount
      const socket = getSocket();
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
      }
    };
  }, []);


    const initSocket = () => {
    try {
      // Connect to socket with authentication token
      const token = localStorage.getItem('token');
      connectSocket(token);
      
      const socket = getSocket();
      
      if (socket) {
        // Set up connection status handlers
        socket.on('connect', () => {
          console.log('Socket connected');
          setSocketConnected(true);
        });
        
        socket.on('disconnect', () => {
          console.log('Socket disconnected');
          setSocketConnected(false);
        });
        
        // Set initial connection status
        setSocketConnected(socket.connected);
      }
    } catch (err) {
      console.error('Socket connection error:', err);
      toast.error('Failed to connect to real-time service');
    }
  };


  const fetchCases = async () => {
    setLoading(true);
    setChartLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy data - replace with actual API call when ready
      // const data = await getRequest("/cases/dashboard");
      
      const dummyData = {
        recentCases: [
          {
            _id: "1",
            caseId: "CASE-001",
            title: "Breach of Contract",
            status: "active",
            type: "civil",
            createdAt: "2023-10-15",
            updatedAt: "2023-11-20",
            client: { name: "Acme Corp", mobile: "8272374673", email: 'Acme@gmail.com' }
          },
          {
            _id: "2",
            caseId: "CASE-002",
            title: "Personal Injury Claim",
            status: "pending",
            type: "civil",
            createdAt: "2023-11-01",
            updatedAt: "2023-11-18",
            client: { name: "Jane Smith", mobile: "7652374673", email: 'Jane@gmail.com'  }
          },
          {
            _id: "3",
            caseId: "CASE-003",
            title: "Criminal Defense",
            status: "closed",
            type: "criminal",
            createdAt: "2023-09-10",
            updatedAt: "2023-11-15",
            client: { name: "John Doe", mobile: "9862374673", email: 'John@gmail.com'  }
          },
          {
            _id: "4",
            caseId: "CASE-004",
            title: "Divorce Settlement",
            status: "active",
            type: "family",
            createdAt: "2023-11-05",
            updatedAt: "2023-11-17",
            client: { name: "Robert Johnson", mobile: "5672374673", email: 'robert@gmail.com'  }
          },
          {
            _id: "5",
            caseId: "CASE-005",
            title: "Intellectual Property",
            status: "pending",
            type: "civil",
            createdAt: "2023-10-25",
            updatedAt: "2023-11-16",
            client: { name: "Tech Innovations Ltd", mobile: "7864374673", email: 'techInnovation@gmail.com'  }
          }
        ],
        totalCases: 24,
        active: 8,
        pending: 10,
        closed: 6,
        civil: 12,
        criminal: 7,
        family: 5
      };

      const sorted = [...dummyData.recentCases]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      setCases(sorted);
      setTotalCounts({
        totalCases: dummyData.totalCases,
        active: dummyData.active,
        pending: dummyData.pending,
        closed: dummyData.closed,
      });
      setCaseTypes({
        civil: dummyData.civil,
        criminal: dummyData.criminal,
        family: dummyData.family,
      });

      setLoading(false);
      setChartLoading(false);
    } catch (err) {
      toast.error("Failed to load case data");
      setLoading(false);
      setChartLoading(false);
    }
  };

  const { totalCases, active, pending, closed } = totalCounts;

  // Card skeleton loader
  const CardSkeleton = () => (
    <div className="custom-card flex-fill cursor-pointer">
      <div className="card-body">
        <Skeleton variant="circular" width={60} height={90} />
        <div className="flex-grow-1 ms-3">
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={50} />
          <Skeleton variant="text" width="80%" height={30} />
        </div>
      </div>
    </div>
  );

  
  // Reconnect socket if disconnected
  const handleReconnectSocket = () => {
    if (!socketConnected) {
      disconnectSocket();
      initSocket();
    }
  };


  return (
    <div className="container-fluid">
      {/* Welcome Banner */}
      <Box
        className="ps-3 mb-4"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background: "linear-gradient(135deg, #1976d2, #0d47a1)",
          borderRadius: "8px",
          px: 3,
          py: 2,
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
          fontSize: { xs: "1.1rem", md: "1.25rem" },
          fontWeight: 600,
          color: "white",
        }}
      >
        <div>
          {greeting}{" "}
          <span className="text-warning text-capitalize fs-5">
            {user?.fullname?.split(" ")[0] || "Counsel"} 👋
          </span>
        </div>

        <Tooltip 
          title={socketConnected 
            ? "Connected to real-time service" 
            : "Disconnected from real-time service"
          }
          placement="left"
        >
          <IconButton 
            onClick={handleReconnectSocket}
            size="small"
            sx={{ 
              color: socketConnected ? 'limegreen' : 'error.main',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <Circle fontSize="small" />
          </IconButton>
        </Tooltip>
        
      </Box>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h5" fontWeight={700}>
          Legal Case Management Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchCases}
          disabled={loading}
        >
          Refresh Data
        </Button>
      </div>

      <hr className="mb-4" />

      {/* Cards Row */}
      <div className="row g-4 mb-4">
        {/* Total Cases */}
        <div className="col-12 col-md-3 d-flex">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div
              className="custom-card bg-gradient-primary flex-fill cursor-pointer"
              style={{ minHeight: "150px" }}
            >
              <div className="card-body">
                <div
                  className="custom-card-icon"
                  style={{ color: "var(--bs-primary)" }}
                >
                  <Gavel fontSize="large" />
                </div>
                <div>
                  <p>Total Cases</p>
                  <h5>{totalCases}</h5>
                  <small className="text-muted">
                    Overall case portfolio.
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Cases */}
        <div className="col-12 col-md-3 d-flex">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="custom-card bg-gradient-success flex-fill cursor-pointer">
              <div className="card-body">
                <div
                  className="custom-card-icon"
                  style={{ color: "var(--bs-success)" }}
                >
                  <TaskAlt fontSize="large" />
                </div>
                <div>
                  <p>Active Cases</p>
                  <h5>{active}</h5>
                  <small className="text-muted">
                    Currently being litigated.
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pending Cases */}
        <div className="col-12 col-md-3 d-flex">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="custom-card bg-gradient-warning flex-fill cursor-pointer">
              <div className="card-body">
                <div
                  className="custom-card-icon"
                  style={{ color: "var(--bs-warning)" }}
                >
                  <PendingActions fontSize="large" />
                </div>
                <div>
                  <p>Pending Cases</p>
                  <h5>{pending}</h5>
                  <small className="text-muted">
                    Awaiting court action.
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Closed Cases */}
        <div className="col-12 col-md-3 d-flex">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="custom-card bg-gradient-danger flex-fill cursor-pointer">
              <div className="card-body">
                <div
                  className="custom-card-icon"
                  style={{ color: "var(--bs-danger)" }}
                >
                  <Lock fontSize="large" />
                </div>
                <div>
                  <p>Closed Cases</p>
                  <h5>{closed}</h5>
                  <small className="text-muted">
                    Resolved or dismissed.
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        {/* Case Status Chart */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-0 rounded-1">
            <div className="card-header bg-white border-bottom py-3">
              <h6 className="mb-0 fw-bold">Case Status Distribution</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center position-relative">
              {chartLoading ? (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <CircularProgress color="primary" />
                  <p className="mt-3 text-muted">Loading case data...</p>
                </div>
              ) : active > 0 || pending > 0 || closed > 0 ? (
                <CaseStatusChart
                  active={active}
                  pending={pending}
                  closed={closed}
                />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <p className="text-muted">No case data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Case Type Chart */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-0 rounded-1">
            <div className="card-header bg-white border-bottom py-3">
              <h6 className="mb-0 fw-bold">Case Type Distribution</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center position-relative">
              {chartLoading ? (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <CircularProgress color="primary" />
                  <p className="mt-3 text-muted">Loading case types...</p>
                </div>
              ) : caseTypes.civil > 0 || caseTypes.criminal > 0 || caseTypes.family > 0 ? (
                <CaseTypeChart
                  civil={caseTypes.civil}
                  criminal={caseTypes.criminal}
                  family={caseTypes.family}
                />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <p className="text-muted">No case type data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases Table */}
      <div className="card shadow border rounded-0">
        <div className="card-header d-flex justify-content-between align-items-center p-3 bg-white">
          <h6 className="mb-0 fw-bold">Recent Cases</h6>
          <div className="d-flex align-items-center">
            {loading && <CircularProgress size={20} className="me-2" />}
            <span className="text-muted small">Latest {cases.length} records</span>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4">Case ID</th>
                  <th>Case Title</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Open Date</th>
                  <th>Last Update</th>
                  <th>Client</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  {/* <th className="text-end px-4">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <CircularProgress color="primary" />
                      <p className="mt-2 text-muted">Loading cases...</p>
                    </td>
                  </tr>
                ) : (
                  cases.map((caseItem) => (
                    <tr key={caseItem._id} className="align-middle">
                      <td className="px-4 fw-medium">{caseItem.caseId}</td>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "250px" }}
                        title={caseItem.title}
                      >
                        {caseItem.title}
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            caseItem.status === "closed"
                              ? "bg-success"
                              : caseItem.status === "pending"
                              ? "bg-warning text-dark"
                              : "bg-primary"
                          }`}
                        >
                          {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info rounded-pill">
                          {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                        </span>
                      </td>
                      <td>
                        {new Date(caseItem.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                      <td>
                        {new Date(caseItem.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                      <td>{caseItem.client?.name || "Unassigned"}</td>
                      <td>{caseItem.client?.mobile || "Unassigned"}</td>
                      <td>{caseItem.client?.email || "Unassigned"}</td>
                      {/* <td>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            navigate(`/dashboard/case/${caseItem._id}`)
                          }
                          startIcon={<VisibilityIcon />}
                          className="shadow-sm"
                        >
                          View
                        </Button>
                      </td> */}
                    </tr>
                  ))
                )}
                {cases.length === 0 && !loading && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No cases found
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

export default LawyerDashboard;