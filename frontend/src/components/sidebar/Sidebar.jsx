import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Logo from "../../assets/images/logos/logo.png";

const drawerWidth = 350;

export default function Sidebar(items) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index, link) => {
    navigate("/sehatchain/user/" + link);
    setSelectedIndex(index);
  };
  useEffect(() => {
    const index = items.sidebarItems.findIndex((item) =>
      location.pathname.includes(item.link)
    );
    setSelectedIndex(index);
  }, [location]);
  const drawer = (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "70%", maxHeight: "70%" }}
        />
      </Box>
      <List>
        {items.sidebarItems.map((text, index) => (
          <ListItem key={text.key} disablePadding sx={{ my: 1 }}>
            <ListItemButton
              onClick={(event) => handleListItemClick(event, index, text.link)}
              sx={{
                borderRadius: 2,
                mx: 2,
                ...(index === selectedIndex && {
                  backgroundColor: "#051322",
                }),
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <span
                    style={{
                      color: "#FFFF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {text.text}
                  </span>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#AFD8FF", mx: 4 }} />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          borderBottom: "2px solid #DBEDFF",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "#071B2F" }} />
          </IconButton>
          <Avatar sx={{ ml: "auto" }}>U</Avatar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#071B2F",
              borderRight: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#071B2F",
              borderRight: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
