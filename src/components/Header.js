import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { defaultContent as content } from "../content";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    subItems: [
      { label: "MINING", path: "/services/mining" },
      { label: "SURVEY", path: "/services/survey" },
      { label: "ENVIRONMENT", path: "/services/environment" },
      { label: "LABORATORY", path: "/services/laboratory" },
      { label: "GEOLOGY", path: "/services/geology" }
    ]
  },
  { label: "Accreditations", path: "/accreditations" },
  { label: "Gallery", path: "/gallery" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" }
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentTabIndex = navItems.findIndex(item => item.path === location.pathname);
    setSelectedTab(currentTabIndex);
  }, [location.pathname]);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleServicesClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      navigate("/services");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", backgroundColor: "#0000003d", zIndex: 1000 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={require('../logo.jpg')}
              alt="Company Logo"
              style={{ height: 40, marginRight: 12 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
            >
              {content.header.title || "Loading..."}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Tabs
              value={selectedTab}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  color: "white !important",
                  opacity: 1 // Ensure all tabs are fully opaque
                },
                "& .Mui-selected": {
                  color: "white !important",
                  opacity: 1
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "white"
                }
              }}
            >
              {navItems.map((item, index) =>
                item.subItems ? (
                  <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Tab
                      label={item.label}
                      component={Link}
                      to={item.path}
                      sx={{ minWidth: 100, color: 'white !important' }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleServicesHover}
                      sx={{ color: 'white', ml: -2 }} // margin-left to bring closer to tab
                      aria-owns={anchorEl ? 'services-menu' : undefined}
                      aria-haspopup="true"
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Tab
                    key={item.label}
                    label={item.label}
                    component={Link}
                    to={item.path}
                  />
                )
              )}
            </Tabs>
          )}

          {/* Hamburger Icon */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleDrawer} edge="end" color="inherit">
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Services Hover Menu for Desktop */}
      <Menu
        id="services-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
          autoFocusItem: false // Prevent auto-focus on first item
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ style: { backgroundColor: "white" } }}
      >
        {navItems[1].subItems.map(sub => (
          <MenuItem
            key={sub.label}
            component={Link}
            to={sub.path}
            onClick={handleMenuClose}
            sx={{ color: "black" }}
          >
            {sub.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem
                button
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ style: { color: "black" } }}
                />
              </ListItem>
              {item.subItems &&
                item.subItems.map((subItem) => (
                  <ListItem
                    key={subItem.label}
                    button
                    component={Link}
                    to={subItem.path}
                    sx={{ pl: 4 }}
                    onClick={toggleDrawer}
                  >
                    <ListItemText
                      primary={subItem.label}
                      primaryTypographyProps={{ style: { color: "black" } }}
                    />
                  </ListItem>
                ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;

