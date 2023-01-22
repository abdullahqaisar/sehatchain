import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";
import { Container } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

import { NavbarItems } from "./Navbar.data";

import Logo from "../../../../assets/images/logos/logo.png";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const navigate = useNavigate();
  const handleClick = (link) => navigate(link);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {NavbarItems.map(({ text, id }, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <InfoIcon />}
                {index === 2 && <FlagIcon />}
                {index === 3 && <FlagIcon />}
                {index === 4 && <ContactsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(() => ({
    fontSize: "14px",
    color: "#fff",
    fontWeight: "400",
    cursor: "pointer",
    "&:hover": {
      color: "#217BF4",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    color: "#fff",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 10),
    margin: theme.spacing(0, 0, 0, 0),
    backgroundColor: "#071B2F",
    disableGutters: true,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
      maxWidth: false,
      disableGutters: true,
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    maxWidth: "150px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <Box>
      <NavbarContainer maxWidth={false} sx={{ px: { xs: 3, sm: 6, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomMenuIcon onClick={toggleDrawer("left", true)} />
            <Drawer
              anchor="left"
              open={mobileMenu["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
            <NavbarLogo
              src={Logo}
              alt="logo"
              onClick={() => {
                handleClick("../hospital/dashboard");
              }}
            />
          </Box>

          <NavbarLinksBox>
            {NavbarItems.map(({ text, key, link }, index) => (
              <NavLink
                key={key}
                onClick={() => {
                  handleClick("../hospital/" + link);
                }}
              >
                {text}
              </NavLink>
            ))}
          </NavbarLinksBox>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Avatar sx={{ width: 34, height: 34 }}>A</Avatar>
          <NavLink to="profile/hospital" variant="body2">
            Hospital Name
          </NavLink>
        </Box>
      </NavbarContainer>
    </Box>
  );
};

export default Navbar;
