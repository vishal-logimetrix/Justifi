import { Box } from "@mui/material";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const UserDashboard = () => {
  const userRole = localStorage.getItem("userRole");
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullname: "John Doe",
  };

  const greeting = getGreeting();
  const firstName = user?.fullname?.split(" ")[0] || "Counsel";

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <marquee
        behavior="scroll"
        direction="left"
        scrollamount="7"
        style={{ backgroundColor: "#f0f0f0", padding: "10px", fontWeight: 500 }}
      >
        We're here to support you 24/7. For assistance, please call our toll-free number: <strong>1800 470 180</strong>.
      </marquee>

      <Box
        className="ps-3"
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
          mt: 2,
        }}
      >
        {greeting},{" "}
        <span className="text-warning text-capitalize fs-5">
          {firstName} 👋
        </span>
      </Box>
    </div>
  );
};

export default UserDashboard;
