import { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Menu, MenuItem, Typography, ButtonBase, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky"
      sx={{
        bgcolor: "#fff",
        color: "#000",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Search Box on large screens */}
        <Box className="d-none d-lg-block">
          <InputBase
            placeholder="Ctrl + K"
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            sx={{
              bgcolor: "#f1f1f1",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 14,
              width: 250,
            }}
          />
        </Box>

        {/* Spacer to push profile section to the right */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Profile Section */}
        <Box>
          <ButtonBase onClick={handleMenuOpen}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 0.5,
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: 14,
                  mr: 1,
                  bgcolor: "secondary.main",
                }}
              >
                {/* {user?.fullname?.[0]?.toUpperCase() || "U"} */}
                U
              </Avatar>
              <Typography variant="body2" fontWeight={500} sx={{ mr: 0.5 }} className="text-capitalize">
                {/* {user?.fullname || "User"} */}
                User
              </Typography>
              <ExpandMoreIcon
                fontSize="small"
                sx={{
                  transition: "transform 0.2s",
                  transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Box>
          </ButtonBase>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: 200,
                maxHeight: "50vh",
                borderRadius: 1,
                mt: 1,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                py: 1,
              },
            }}
            disableScrollLock={true}
            keepMounted
          >
            <MenuItem disabled>
              <Typography variant="body1" noWrap className="text-capitalize">
                {/* {user?.fullname || "User"} */}
                User
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
