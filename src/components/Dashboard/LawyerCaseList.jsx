import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosState } from "../../api/axios";

const LawyerCasesList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date_of_decision");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch cases from API
  useEffect(() => {
    const localstorageData = localStorage.getItem("user");
    if (localstorageData) {
      const userData = JSON.parse(localstorageData);
      // console.log("User Data:", userData);
      fetchCases(userData?.districts || []);
    }
  }, []);

  const fetchCases = async (districts) => {
    setLoading(true);
    try {
      const districtIds = districts.map((d) => d.id).join(",");
      console.log("----------", districtIds)
      const res = await axiosState.get(`${import.meta.env.VITE_API_URL_STATE}/api/get-districts-cases?districtId=${districtIds}`);
      console.log("----------", res)
      if (res.data?.status) {
        setCases(res.data.data); 
      } else {
        setCases([]);
      }
    } catch (err) {
      console.error("Error fetching cases:", err);
      setError("Failed to load cases.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Badge helpers
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
          classes[status] || "bg-light text-dark"
        } rounded-pill`}
      >
        {status}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const classes = {
      "Bail Application": "bg-warning text-dark",
      "Cr. Revision": "bg-info text-dark",
      Civil: "bg-primary",
      Criminal: "bg-danger",
    };
    return (
      <span className={`badge ${classes[type] || "bg-secondary"} rounded-pill`}>
        {type}
      </span>
    );
  };

  // ✅ Filtering, Searching & Sorting
  const filteredCases = cases
    .filter((c) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        c.title?.toLowerCase().includes(searchLower) ||
        c.cnr?.toLowerCase().includes(searchLower) ||
        c.case_number?.toLowerCase().includes(searchLower) ||
        c.advocate_name?.toLowerCase().includes(searchLower)
      );
    })
    .filter((c) =>
      statusFilter === "All"
        ? true
        : c["case_details.case_status"] === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "date_of_decision")
        return new Date(b.date_of_decision) - new Date(a.date_of_decision);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "advocate_name")
        return a.advocate_name.localeCompare(b.advocate_name);
      return 0;
    });

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container-fluid py-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Cases</h2>
        {/* <Link to="/cases/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> New Case
        </Link> */}
      </div>

      {/* 🔹 Filters & Search */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Title, CNR, Advocate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Win">Win</option>
                <option value="Lost">Lost</option>
                <option value="Pending">Pending</option>
              </select>
            </div> */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date_of_decision">Sort by Decision Date</option>
                <option value="title">Sort by Title</option>
                <option value="advocate_name">Sort by Advocate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Cases Table */}
      <div
        className="shadow-sm "
        style={{ width: "100%", overflowX: "scroll" }}
      >
        <div className=" p-0">
          {loading ? (
            <div className="p-5 text-center text-muted">Loading cases...</div>
          ) : error ? (
            <div className="p-5 text-center text-danger">{error}</div>
          ) : (
            <div
              className="table-responsive"
              style={{
                width: "100%",
              }}
            >
              <table
                className="table "
                style={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "scroll",
                }}
              >
                <thead
                  className="table-light"
                  style={{ position: "sticky", top: 0, zIndex: 2 }}
                >
                  <tr>
                    <th className="ps-2">ID</th>
                    <th style={{ width: "250px" }}>CNR</th>
                    {/* <th style={{width: '200px'}}>Case No.</th> */}
                    <th style={{ width: "200px" }}>Title</th>
                    {/* ✅ Expanded Title */}
                    <th style={{ width: "200px" }}>Advocate</th>
                    <th style={{ width: "200px" }}>Type</th>
                    {/* <th style={{width: '200px'}}>Status</th> */}
                    <th style={{ width: "200px" }}>Filing No.</th>
                    {/* <th style={{ width: "140px" }}>Filing Year</th> */}
                    {/* <th style={{ width: "180px" }}>District</th> */}
                    <th style={{ width: "200px" }}>Created</th>
                    <th style={{ width: "200px" }}>Decision Date</th>
                    <th style={{ width: "200px" }}>Actions</th>
                    {/* ✅ More space for actions */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedCases.length > 0 ? (
                    paginatedCases.map((caseItem, index) => {
                      const globalIndex =
                        (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={caseItem.id}>
                          <td className="fw-medium ps-2">{globalIndex}</td>
                          <td>{caseItem.cnr}</td>
                          {/* <td>{caseItem.case_number}</td> */}
                          <td>
                            <Link
                              to={`/cases/${caseItem.id}`}
                              className="text-decoration-none text-muted"
                            >
                              {caseItem.title}
                            </Link>
                          </td>
                          <td>{caseItem.advocate_name || "N/A"}</td>
                          <td>{getTypeBadge(caseItem.type)}</td>
                          {/* <td>
            {getStatusBadge(caseItem["case_details.case_status"])}
          </td> */}
                          <td>{caseItem.filing_number}</td>
                          {/* <td>{caseItem.filing_year}</td> */}
                          {/* <td>{caseItem.district_id}</td> */}
                          <td>
                            {new Date(caseItem.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(
                              caseItem.date_of_decision
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex flex-nowrap gap-2">
                              <Link
                                to={`/cases/${caseItem.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <i className="bi bi-eye"></i> View
                              </Link>
                              {/* <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-three-dots-vertical"></i>
              </button> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="13" className="text-center py-4 text-muted">
                        No cases found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Pagination */}
      {filteredCases.length > itemsPerPage && (
        <div className="d-flex justify-content-end my-4">
          {" "}
          {/* ✅ Right-aligned pagination */}
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(i + 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LawyerCasesList;
