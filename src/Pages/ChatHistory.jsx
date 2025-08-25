import { useEffect, useState } from "react";
import { User, Search, Plus, ChevronDown, Scale, Phone } from "lucide-react";
import LawyerRegistration from "./LawyerRegistration";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../api/httpService";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  CircularProgress,
  // Tooltip,
} from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
// import { connectSocket, getSocket } from "../Socket/socket";
// import { Circle } from "@mui/icons-material";
import { useCallContext } from "../Context/CallContext";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const ChatHistory = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isConnected,
    initializeSocket,
    callLawyer,
    currentCall,
    incomingCall,
    acceptCall,
    rejectCall,
    endCall,
  } = useCallContext();

  const userRole = localStorage.getItem("userRole");
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullname: "John Doe",
  };

  const greeting = `${getGreeting()}`;

  useEffect(() => {
    getLawyerData();
  }, []);

  const getLawyerData = async () => {
    try {
      setIsLoading(true);
      const data = await getRequest("/lawyers/get-lawyers");
      setLawyers(data);
      setIsLoading(false);
    } catch (err) {
      // toast.error(err.message || "Failed to load lawyers");
    }
  };

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      (lawyer.lawyer_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (lawyer.email_id || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (lawyer.bar_council_reg_no || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const onLawyerRegister = () => {
    setShowAddLawyer(false);
    getLawyerData();
  };

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedLawyers = filteredLawyers.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleViewDetails = (lawyer) => {
    setSelectedLawyer(lawyer);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedLawyer(null);
  };

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 fw-bold mb-0">Chat History</h2>
            <p className="text-muted mb-0">
              Recent chats history registered in your system
            </p>
          </div>
          {userRole === "admin" && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowAddLawyer(true)}
            >
              <Plus size={18} className="me-2" />
              Add New Lawyer
            </button>
          )}
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Registered Lawyers</h6>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th className="ps-2">Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Bar Council ID</th>
                    <th>Contact</th>
                    <th>Adhar</th>
                    <th>PAN</th>
                    <th>Call</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : paginatedLawyers.length > 0 ? (
                    paginatedLawyers.map((lawyer, index) => {
                      const maskedAadhar = lawyer.aadhar_number
                        ?.replace(/\s/g, "")
                        .replace(/^(\d{4})(\d{4})(\d{4})$/, "**** **** $3");
                      const maskedPan = lawyer.pan_number
                        ? `*****${lawyer.pan_number.slice(-5)}`
                        : "";

                      return (
                        <tr key={lawyer.id}>
                          <td className="ps-3">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{lawyer.lawyer_name}</td>
                          <td>{lawyer.email_id}</td>
                          <td>{lawyer.bar_council_reg_no}</td>
                          <td>{lawyer.contact_no}</td>
                          <td>{maskedAadhar}</td>
                          <td>{maskedPan}</td>
                          <td>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                console.log(
                                  "📞 Calling lawyer:",
                                  lawyer.lawyer_name,
                                  "ID:",
                                  lawyer.id
                                );
                                callLawyer(lawyer.id, "audio");
                                handleViewDetails(lawyer);
                              }}
                              disabled={currentCall}
                            >
                              <Phone />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No lawyers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer bg-white d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              Showing {paginatedLawyers.length} of {filteredLawyers.length}{" "}
              lawyers
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => changePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Add Lawyer Modal */}
      {showAddLawyer && (
        <div
          className="modal fade show custom-modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <Plus size={20} className="me-2 text-primary" />
                  Register New Lawyer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddLawyer(false)}
                ></button>
              </div>
              <div className="modal-body">
                <LawyerRegistration onDocsSuccess={onLawyerRegister} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 400,
            p: 3,
            textAlign: "center",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {currentCall ? "Ongoing Call" : "Calling Lawyer..."}
        </DialogTitle>

        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {currentCall ? (
              <>
                <Avatar sx={{ bgcolor: "green", width: 72, height: 72 }}>
                  <PhoneInTalkIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Call Connected
                </Typography>
                <Typography>With: {selectedLawyer?.lawyer_name}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    console.log(
                      "📴 Ending call with",
                      selectedLawyer.lawyer_name
                    );
                    endCall();
                    handleClose();
                  }}
                >
                  End Call
                </Button>
              </>
            ) : (
              <>
                <CircularProgress color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Calling {selectedLawyer?.lawyer_name}
                </Typography>
                <Typography>Connecting to lawyer...</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    console.log(
                      "❌ Canceling call to",
                      selectedLawyer.lawyer_name
                    );
                    handleClose();
                  }}
                >
                  Cancel Call
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHistory;
