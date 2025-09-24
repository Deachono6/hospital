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
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import backgroundImage from "../assets/hospitallogo.png";
const pages = [
  { label: "หน้าแรก", path: "/" },
  { label: "แดชบอร์ด", path: "/Checkin" },
  { label: "หน้าคะแนน", path: "/Point" },
];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout } = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
  };
  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Profile":
        console.log("ไปที่หน้าโปรไฟล์");
        break;
      case "Logout":
        logout(null);
        window.location.href = "/Login"; // เปลี่ยนหน้าเป็น Login
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
          <Box
            component="img"
            src={backgroundImage} // 👉 ใส่ path โลโก้ของคุณ
            alt="Logo"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: 40,
              height: 40,
            }}
          ></Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            โรงพยาบาลอุตรดิตถ์
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages?.map((page, i) => (
                <Button
                  key={i}
                  component={Link}
                  to={page?.path}
                  sx={{ color: "black", textTransform: "none", mx: 1 }}
                >
                  {page?.label}
                </Button>

                //   <Link key={i} to={page?.path} className="hover:underline">{page?.label}</Link>
                // <MenuItem key={i} onClick={handleCloseNavMenu}>
                //   <Typography sx={{ textAlign: "center" }}>{page?.label}</Typography>
                // </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column", // แนวตั้ง โลโก้บน ชื่อด้านล่าง
              alignItems: "center", // จัดกลางแนวนอน
              justifyContent: "center", // จัดกลางแนวตั้งถ้าต้องการเต็มพื้นที่ parent
              width: "100%",
              py: 1,
            }}
          >
            <Box
              component="img"
              src={backgroundImage}
              alt="Logo"
              sx={{
                width: { xs: 30, sm: 40, md: 50 }, // ปรับขนาดตามหน้าจอ
                height: "auto",
                mb: 0.5,
              }}
            />
            <Typography
              variant="h6"
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: { xs: 10, sm: 12, md: 14 }, // ปรับขนาดตามหน้าจอ
                color: "inherit",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              โรงพยาบาลอุตรดิตถ์
            </Typography>{" "}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                component={Link}
                to={page?.path}
                sx={{ color: "white", textTransform: "none", mx: 1 }}
              >
                {page?.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuClick(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
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
