

import "./App.css";
import ResponsiveAppBar from "./navbar";
import Box from "@mui/material/Box";
import Home from "./home";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import CheckIn from "./checkin";
import Login from "./login";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./protectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Register from "./regis";

const theme = createTheme({
  typography: {
    fontFamily: '"Prompt", "Noto Sans Thai", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
 
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/Login" ||
    location.pathname === "/Register" ||
    location.pathname === "/Forgetpassword"; // ถ้าอยู่หน้า Login → ไม่โชว์ Navbar
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <AuthProvider>
          {!hideNavbar && <ResponsiveAppBar />}
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Checkin"
              element={
                <ProtectedRoute>
                  <CheckIn />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
