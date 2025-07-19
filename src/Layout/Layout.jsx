import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery, ClickAwayListener, Backdrop, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  // Custom transition
  const sidebarTransition = "width 0.3s ease-in-out, margin 0.3s ease-in-out";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderSidebar = () => {
    if (isSmallScreen && sidebarOpen) {
      return (
        <ClickAwayListener onClickAway={() => setSidebarOpen(false)}>
          <Box>
            <Sidebar open={true} />
            <Backdrop
              open={true}
              sx={{
                zIndex: 1100,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => setSidebarOpen(false)}
            />
          </Box>
        </ClickAwayListener>
      );
    }

    return <Sidebar open={sidebarOpen} />;
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        transition: sidebarTransition,
      }}
    >
      {renderSidebar()}

      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen && !isSmallScreen ? "260px" : 0,
          transition: sidebarTransition,
          width: "100%",
        }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            backgroundColor: theme.palette.background.default,
            minHeight: "calc(100vh - 64px)",
          }}
          className="bg-light"
        >
          <Outlet />
        </Box>
        {/* Footer */}
        <Box
          component="footer"
          height={'50px'}
          sx={{
            textAlign: "center",
            py: 5,
            backgroundColor: theme.palette.grey[200],
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Justifi System. All rights reserved.
            <br />
            <i className="text-secondary">India's fastest-growing legal assistance platform</i>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
