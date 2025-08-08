import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  PersonAdd as UserAddIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
  Gavel as CaseIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  SmartToy as BotIcon
} from "@mui/icons-material";
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, useTheme } from "@mui/material";
import logo from "../assets/images/logo_t.png";
import { useEffect, useState } from "react";
import { useCallContext } from "../Context/CallContext";

const Sidebar = ({ open }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { disconnectSocket } = useCallContext();
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedRole && ["admin", "lawyer", "business_owner"].includes(storedRole)) {
      setRole(storedRole);
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      roles: ["admin", "lawyer", "business_owner"],
    },
        {
      text: "Case Details",
      icon: <CaseIcon />,
      path: "/case-list",
      roles: ["lawyer"],
    },
    {
      text: "Call History",
      icon: <HistoryIcon />,
      path: "/call",
      roles: ["lawyer"],
    },
    {
      text: "Payments",
      icon: <UserAddIcon />,
      path: "/dashboard/payments",
      roles: ["admin"],
    },

    {
      text: "All Lawyers",
      icon: <PeopleIcon />,
      path: "/lawyer-list",
      roles: ["business_owner"],
    },
    {
      text: "Recent Chats",
      icon: <ChatIcon />,
      path: "/chat-history",
      roles: ["business_owner"],
    },
    // {
    //   text: "Chat With Rylaw",
    //   icon: <BotIcon />,
    //   path: "/chat-bot",
    //   roles: ["business_owner", "lawyer"],
    // },
    {
      text: "Profile",
      icon: <CaseIcon />,
      path: "/lawyer-profile",
      roles: ["lawyer"],
    },
  ];

  const handleLogout = () => {
    disconnectSocket();
    localStorage.clear();
    navigate("/login");
  };

  const getRoleName = (role) => {
    switch(role) {
      case "admin": return "Administrator";
      case "lawyer": return "Legal Counsel";
      case "business_owner": return "Business Owner";
      default: return "User";
    }
  };

  return (
    <Box
      sx={{
        width: open ? 260 : 0,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        height: '100vh',
        position: 'fixed',
        zIndex: 1200,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {open && (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Logo Section */}
          <Box 
            sx={{ 
              p: 3, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            {/* <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: '100%', 
                maxWidth: 160, 
                height: 'auto',
                filter: 'brightness(0) invert(1)'
              }} 
            /> */}
            <h1>JUSTIFI</h1>
          </Box>

          {/* Menu Items */}
          <List sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
            {menuItems
              .filter(item => item.roles.includes(role))
              .map((item) => (
                <ListItem 
                  key={item.text} 
                  disablePadding 
                  sx={{ 
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  <Tooltip title={item.text} placement="right" arrow>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      selected={location.pathname === item.path}
                      sx={{
                        minHeight: 48,
                        justifyContent: 'initial',
                        px: 2.5,
                        borderRadius: 1,
                        mx: 1,
                        '&.Mui-selected': {
                          bgcolor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          '&:hover': {
                            bgcolor: theme.palette.primary.light,
                          }
                        },
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          justifyContent: 'center',
                          color: 'inherit'
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                          fontSize: '0.9rem'
                        }} 
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
          </List>

          {/* Divider */}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* User Profile & Logout */}
          <Box sx={{ p: 2 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                p: 1,
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.1)'
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2,
                  bgcolor: theme.palette.secondary.main 
                }}
              >
                {user?.fullname?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {user?.fullname || 'User'}
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.7)">
                  {getRoleName(role)}
                </Typography>
              </Box>
            </Box>

            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
                borderRadius: 1,
                color: theme.palette.error.light,
                '&:hover': {
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: 'inherit'
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ fontWeight: 'bold' }} 
              />
            </ListItemButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;