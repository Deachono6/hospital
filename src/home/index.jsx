import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import api from "../api";
import { useEffect } from "react";
import moment from "moment";
import { useAuth } from "../authContext";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

/* ===============================
   Theme โรงพยาบาล
================================ */
const hospitalTheme = {
  primary: "#2e7d32",
  background: "#f1f8f4",
};

/* ===== คำนวณระยะทาง ===== */
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Home() {
  const [loading, setLoading] = React.useState(false);
  const [dataSession, setDataSession] = React.useState([]);
  const { user } = useAuth();

  /* ===== เช็คอิน ===== */

  const handleCheckIn = async (data) => {
    if (!navigator.geolocation) {
      alert("❌ เบราว์เซอร์ไม่รองรับ GPS");
      return;
    }

    if (!user) {
      alert("❌ กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const distance = getDistance(
            userLat,
            userLng,
            data.latitude,
            data.longitude
          );

          const radius = 0.05; // 50 เมตร
          if (distance > radius) {
            alert(`❌ อยู่นอกพื้นที่ (${(distance * 1000).toFixed(0)} เมตร)`);
            setLoading(false);
            return;
          }

          await api.post(`/sessions/${data._id}/checkin`, {
            phoneNumber: user.phoneNumber,
            name: user.name,
            lastname: user.lastname,
            institute: user.institute,
            note: `Check-in ที่พิกัด ${userLat},${userLng}`,
          });

          alert("✅ เช็คชื่อสำเร็จ");
        } catch (err) {
          alert(err?.response?.data?.error || "❌ ไม่สามารถเช็คชื่อได้");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("❌ กรุณาอนุญาตการเข้าถึงตำแหน่ง");
        setLoading(false);
      }
    );
  };

  const fetchSessions = async () => {
    const res = await api.get("sessions");
    setDataSession(res.data.sessions || []);
  };

  const handleDleteSession = async (sessionId) => {
    try {
      await api.delete(`/sessions/${sessionId}`);
      alert("✅ ลบ Session สำเร็จ");
      fetchSessions(); // รีเฟรชรายการหลังลบ
    } catch (err) {
      alert(err?.response?.data?.error || "❌ ไม่สามารถลบ Session ได้");
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: hospitalTheme.background,
        py: 4,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: hospitalTheme.primary,
          fontWeight: 700,
          mb: 3,
        }}
      >
        รายการอบรม / ประชุม
      </Typography>

      <Box sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
        {dataSession.map((data) => (
          <Card
            key={data._id}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mb: 3,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: 250 },
                minHeight: 160,
                backgroundColor: "#e8f5e9", // เขียวอ่อน
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: { sm: "1px solid #c8e6c9" },
              }}
            >
              <EventAvailableIcon
                sx={{ fontSize: 56, color: "#2e7d32", mb: 1 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#2e7d32", fontWeight: 600 }}
              >
                กิจกรรมอบรม
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {data.title}
                </Typography>

                <Chip
                  label={`ห้อง ${data.room}`}
                  color="success"
                  size="small"
                  sx={{ my: 1 }}
                />

                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <EventIcon fontSize="small" />
                  {moment(data.startTime).format("DD/MM/YYYY")}{" "}
                  {moment(data.startTime).format("HH:mm")} –{" "}
                  {moment(data.endTime).format("HH:mm")} น.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  <LocationOnIcon fontSize="small" />
                  ตรวจสอบตำแหน่งก่อนเช็คอิน
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleCheckIn(data)}
                  disabled={loading}
                  sx={{
                    bgcolor: hospitalTheme.primary,
                    "&:hover": { bgcolor: "#1b5e20" },
                  }}
                >
                  {loading ? "กำลังตรวจสอบตำแหน่ง..." : "ลงชื่อเข้าร่วมอบรม"}
                </Button>
                {user?.role === "admin" && (
                  <>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => handleDleteSession(data._id)}
                    >
                      ลบ
                    </Button>
                  </>
                )}
              </CardActions>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Home;
