import { useEffect, useState } from "react";
import { User, Search, Plus, ChevronDown, Scale } from "lucide-react";
import LawyerRegistration from "./LawyerRegistration";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../api/httpService";

const Dashboard = () => {
  const [lawyers, setLawyers] = useState([]);

  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getLawyerData();
  }, []);

  const getLawyerData = async () => {
    try {
      const data = await getRequest("/lawyers/get-lawyers");
      setLawyers(data);
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

  const onProfile = () => {};

  const onLogout = () => {
    navigate("/login");
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

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            {/* Logo & Title */}
            <div className="d-flex align-items-center">
              <div className="bg-primary p-2 rounded-circle me-3">
                <Scale size={24} className="text-white" />
              </div>
              <h1 className="h4 fw-bold mb-0">
                JUSTIFI <span className="text-primary">Dashboard</span>
              </h1>
            </div>

            {/* Search & Admin */}
            <div className="d-flex align-items-center">
              {/* Search */}
              <div className="position-relative me-4">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by name, email or bar ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={18}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                />
              </div>

              {/* Admin Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-light d-flex align-items-center"
                  type="button"
                  id="adminDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                    <User size={18} className="text-primary" />
                  </div>
                  <span className="me-2">Admin</span>
                  <ChevronDown size={16} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="adminDropdown"
                >
                  <li>
                    <button className="dropdown-item" onClick={onProfile}>
                      Profile
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-4">
        <div className="">
          {/* Main Content */}
          <div className="">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h4 fw-bold mb-0">Lawyer Management</h2>
                <p className="text-muted mb-0">
                  Manage all registered lawyers in your system
                </p>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowAddLawyer(true)}
              >
                <Plus size={18} className="me-2" />
                Add New Lawyer
              </button>
            </div>

            {/* Lawyers Table */}
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
                        <th>Verified</th>
                        <th>Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLawyers.length > 0 ? (
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
                                {lawyer.is_verified ? (
                                  <span className="badge bg-success">
                                    Verified
                                  </span>
                                ) : (
                                  <span className="badge bg-warning text-dark">
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td>
                                {lawyer.documents_uploaded ? (
                                  <span className="badge bg-primary">
                                    Uploaded
                                  </span>
                                ) : (
                                  <span className="badge bg-secondary">
                                    Not Uploaded
                                  </span>
                                )}
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

                {filteredLawyers.length === 0 && (
                  <div className="text-center py-5">
                    <div className="bg-light rounded-circle p-4 d-inline-block mb-3">
                      <Search size={32} className="text-muted" />
                    </div>
                    <h5 className="mb-1">No lawyers found</h5>
                    <p className="text-muted mb-0">
                      Try adjusting your search or filter
                    </p>
                  </div>
                )}
              </div>

              <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                <div className="small text-muted">
                  Showing {paginatedLawyers.length} of {filteredLawyers.length}{" "}
                  lawyers
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
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
        </div>
      </div>

      {showAddLawyer && (
        <div
          className="modal fade show"
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
    </div>
  );
};

export default Dashboard;
