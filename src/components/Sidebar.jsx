import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  AddCircleOutline as AddIcon,
  PersonAdd as UserAddIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
  Gavel as CaseIcon, // You can use any icon here
} from "@mui/icons-material";

import logo from "../assets/images/logo_t.png";
import { useEffect, useState } from "react";

const Sidebar = ({ open }) => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "admin" || storedRole === "lawyer") {
      setRole(storedRole);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon className="me-2" />,
      path: "/dashboard",
      roles: ["admin", "lawyer"],
    },
    {
      text: "Call History",
      icon: <HistoryIcon className="me-2" />,
      path: "/call",
      roles: ["lawyer"],
    },
    {
      text: "Payments",
      icon: <UserAddIcon className="me-2" />,
      path: "/dashboard/payments",
      roles: ["admin"],
    },
    {
      text: "Case Details",
      icon: <CaseIcon className="me-2" />,
      path: "/dashboard/cases",
      roles: ["lawyer"],
    },
    {
      text: "Profile",
      icon: <AddIcon className="me-2" />,
      path: "/profile",
      roles: ["admin", "lawyer"],
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`bg-white border-end position-fixed top-0 start-0 h-100 shadow-sm`}
      style={{
        width: open ? 260 : 0,
        overflowX: "hidden",
        transition: "width 0.3s ease",
        zIndex: 1200,
      }}
    >
      {open && (
        <div className="d-flex flex-column h-100">
          {/* Logo Section */}
          <div className="d-flex align-items-center justify-content-center border-bottom px-3 py-4">
            <img src={logo} alt="Logo" style={{ width: 160, height: 60 }} />
          </div>

          {/* Menu */}
          <div className="flex-grow-1 px-3 py-2">
            <ul className="list-unstyled mb-2">
              {menuItems
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <li key={item.text} className="mb-1 p-1">
                    <Link
                      to={item.path}
                      className={`d-flex align-items-center p-3 rounded text-decoration-none ${
                        location.pathname === item.path
                          ? "active fw-semibold text-dark"
                          : "text-dark"
                      }`}
                      style={{
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                          e.currentTarget.style.paddingLeft = "1.25rem";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.paddingLeft = "1rem";
                        }
                      }}
                    >
                      {item.icon}
                      {item.text}
                    </Link>
                  </li>
                ))}
            </ul>

            <hr />

            {/* Logout */}
            <ul className="list-unstyled">
              <li>
                <div
                  onClick={handleLogout}
                  className="d-flex align-items-center p-3 rounded text-danger text-decoration-none"
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8d7da")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <LogoutIcon className="me-2" />
                  Logout
                </div>
              </li>
            </ul>
          </div>

          {/* Footer Info */}
          <div className="border-top p-3 d-flex align-items-center">
            <div
              className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: 40, height: 40 }}
            >
              U
            </div>
            <div>
              <div className="fw-semibold text-capitalize">
                {role === "admin" ? "Admin" : "Lawyer"}
              </div>
              <small className="text-muted">{role}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
