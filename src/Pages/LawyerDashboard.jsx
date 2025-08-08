import { useEffect, useState } from "react";
import {
  Gavel,
  TaskAlt,
  PendingActions,
  Lock,
  Circle,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Skeleton,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CaseStatusChart from "../components/Dashboard/CaseStatusChart";
import CaseTypeChart from "../components/Dashboard/CaseTypeChart";
import { useCallContext } from "../Context/CallContext";
import IndiaStateMap from "../components/IndiaStateMap";

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
  const { isConnected } = useCallContext();

  const [stateData, setStateData] = useState({});

  const user = JSON.parse(localStorage.getItem("user")) || {
    fullname: "John Doe",
  };
  const greeting = `${getGreeting()}`;

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    const dummyData = [
      { state_name: "Maharashtra", active_cases: 12, closed_cases: 30 },
      { state_name: "Karnataka", active_cases: 7, closed_cases: 20 },
      { state_name: "Andhra Pradesh", active_cases: 15, closed_cases: 25 },
    ];

    const mapped = {};
    dummyData.forEach((item) => {
      mapped[item.state_name] = {
        active: item.active_cases,
        closed: item.closed_cases,
      };
    });

    setStateData(mapped);
  }, []);

  const handleStateClick = (name, data) => {
    alert(`Clicked state: ${name}`);
    console.log("Clicked State:", name, data);
  };

  const fetchCases = async () => {
    setLoading(true);
    setChartLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
            client: {
              name: "Acme Corp",
              mobile: "8272374673",
              email: "Acme@gmail.com",
            },
          },
          {
            _id: "2",
            caseId: "CASE-002",
            title: "Personal Injury Claim",
            status: "pending",
            type: "civil",
            createdAt: "2023-11-01",
            updatedAt: "2023-11-18",
            client: {
              name: "Jane Smith",
              mobile: "7652374673",
              email: "Jane@gmail.com",
            },
          },
          {
            _id: "3",
            caseId: "CASE-003",
            title: "Criminal Defense",
            status: "closed",
            type: "criminal",
            createdAt: "2023-09-10",
            updatedAt: "2023-11-15",
            client: {
              name: "John Doe",
              mobile: "9862374673",
              email: "John@gmail.com",
            },
          },
          {
            _id: "4",
            caseId: "CASE-004",
            title: "Divorce Settlement",
            status: "active",
            type: "family",
            createdAt: "2023-11-05",
            updatedAt: "2023-11-17",
            client: {
              name: "Robert Johnson",
              mobile: "5672374673",
              email: "robert@gmail.com",
            },
          },
          {
            _id: "5",
            caseId: "CASE-005",
            title: "Intellectual Property",
            status: "pending",
            type: "civil",
            createdAt: "2023-10-25",
            updatedAt: "2023-11-16",
            client: {
              name: "Tech Innovations Ltd",
              mobile: "7864374673",
              email: "techInnovation@gmail.com",
            },
          },
        ],
        totalCases: 24,
        active: 8,
        pending: 10,
        closed: 6,
        civil: 12,
        criminal: 7,
        family: 5,
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

  const CardSkeleton = () => (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="ms-3">
          <Skeleton variant="text" width={100} height={24} />
          <Skeleton variant="text" width={60} height={32} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Legal Case Management</h2>
          <p className="text-muted mb-0">
            {greeting}, <span className="text-primary">{user?.fullname?.split(" ")[0] || "Counsel"}</span>
          </p>
        </div>
        <div className="d-flex align-items-center">
          {/* <Tooltip
            title={
              isConnected
                ? "Connected to real-time service"
                : "Disconnected from real-time service"
            }
          >
            <IconButton className="me-3">
              <Circle style={{ color: isConnected ? "#28a745" : "#dc3545" }} />
            </IconButton>
          </Tooltip> */}
          <Button
            variant="contained"
            color="primary"
            onClick={fetchCases}
            disabled={loading}
            size="small"
            className="shadow-sm"
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <Gavel className="text-primary" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Cases</h6>
                  <h3 className="mb-0">{totalCases}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6 col-lg-3">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <TaskAlt className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Active Cases</h6>
                  <h3 className="mb-0">{active}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6 col-lg-3">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                  <PendingActions className="text-warning" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Pending Cases</h6>
                  <h3 className="mb-0">{pending}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6 col-lg-3">
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                  <Lock className="text-danger" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Closed Cases</h6>
                  <h3 className="mb-0">{closed}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0">Case Distribution by State</h5>
            </div>
            <div className="card-body">
              {chartLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                  <CircularProgress />
                </div>
              ) : (
                <div style={{ height: '400px' }}>
                  <IndiaStateMap
                    districtData={stateData}
                    onDistrictClick={handleStateClick}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0">Case Type Distribution</h5>
            </div>
            <div className="card-body">
              {chartLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                  <CircularProgress />
                </div>
              ) : (
                <div style={{ height: '400px' }}>
                  <CaseTypeChart
                    civil={caseTypes.civil}
                    criminal={caseTypes.criminal}
                    family={caseTypes.family}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      {/* <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Cases</h5>
            <span className="text-muted small">
              {loading ? <CircularProgress size={20} /> : `Showing ${cases.length} records`}
            </span>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Client</th>
                  <th>Opened</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <CircularProgress />
                      <p className="mt-2 text-muted">Loading cases...</p>
                    </td>
                  </tr>
                ) : cases.length > 0 ? (
                  cases.map((caseItem) => (
                    <tr key={caseItem._id}>
                      <td className="fw-medium">{caseItem.caseId}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-medium">{caseItem.title}</span>
                          <small className="text-muted">{caseItem.client?.email}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${
                          caseItem.status === "closed" ? "bg-success" :
                          caseItem.status === "pending" ? "bg-warning" :
                          "bg-primary"
                        }`}>
                          {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info rounded-pill">
                          {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span>{caseItem.client?.name || "Unassigned"}</span>
                          <small className="text-muted">{caseItem.client?.mobile}</small>
                        </div>
                      </td>
                      <td>
                        {new Date(caseItem.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No cases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LawyerDashboard;