import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import backgroundImage from "../assets/hospitallogo.png";

/* =======================
   เมนูตามสิทธิ์
======================= */
const commonPages = [{ label: "หน้าแรก", path: "/" }];

const adminPages = [
  { label: "รายงานระบบ", path: "/admin/reports" },
  { label: "จัดการการประชุม", path: "/admin/sessions/create" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  /* =======================
     Auth
  ======================= */
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const pages = isAdmin ? [...commonPages, ...adminPages] : commonPages;

  const settings = isAdmin
    ? ["Profile",  "Logout"]
    : ["Profile", "Logout"];

  /* =======================
     Handlers
  ======================= */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();

    switch (setting) {
      case "Profile":
       window.location.href = "/profile";
        break;

      case "Admin Panel":
        window.location.href = "/admin";
        break;

      case "Logout":
        logout(null);
        window.location.href = "/Login";
        break;

      default:
        console.log("เลือก:", setting);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ width: "100%", backgroundColor: "#3c7962" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ===== Logo Desktop ===== */}
          <Box
            component="img"
            src={backgroundImage}
            alt="Logo"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: 40,
              height: 40,
            }}
          />

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
            }}
          >
            โรงพยาบาลอุตรดิตถ์
          </Typography>

          {/* ===== Mobile Menu ===== */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page, i) => (
                <MenuItem
                  key={i}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* ===== Logo Mobile ===== */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={backgroundImage}
              alt="Logo"
              sx={{ width: 30, mb: 0.5 }}
            />
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              โรงพยาบาลอุตรดิตถ์
            </Typography>
          </Box>

          {/* ===== Desktop Menu ===== */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                component={Link}
                to={page.path}
                sx={{ color: "white", textTransform: "none", mx: 1 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* ===== Avatar Menu ===== */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ mt: "45px" }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuClick(setting)}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
