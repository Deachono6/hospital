import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Boxcenter, Buttoncheckin } from "./style";
import api from "../api";
import { useEffect } from "react";
import moment from "moment";
import { useAuth } from "../authContext";

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // รัศมีโลก (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function Home() {
  const [loading, setLoading] = React.useState(false);
  const [dataSession, setdataSession] = React.useState();
  const { user } = useAuth();

  const handleCheckIn = async (data) => {
    if (!navigator.geolocation) {
      alert("❌ เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง");
      return;
    }

    if (!user) {
      alert("❌ ไม่พบข้อมูลผู้ใช้งาน");
      return;
    }

    if (!data?._id || data.latitude == null || data.longitude == null) {
      alert("❌ ข้อมูล session ไม่สมบูรณ์");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // คำนวณระยะทางจากจุดกลาง
          const distance = getDistance(
            userLat,
            userLng,
            data.latitude,
            data.longitude
          );

          // ตัวอย่างกำหนดรัศมีตรวจสอบเป็น 0.5 km
          const radius = 0.5;  // 0.05 km = 50 เมตร
          if (distance != null && distance > radius) {
            alert(`❌ อยู่นอกพื้นที่ (${distance.toFixed(3)} km จากจุดกลาง)`);
            setLoading(false);
            return;
          }

          // เรียก API เช็คชื่อ
          const response = await api.post(`/sessions/${data?._id}/checkin`, {
            identity: user?.identity,
            name: user?.name,
            lastname: user?.lastname,
            institute: user?.institute, // แก้ typo
            latitude: userLat,
            longitude: userLng,
            note: `Check-in ที่พิกัด ${userLat},${userLng}`,
          });

          
            console.log(response.data);
            alert("✅ เช็คชื่อสำเร็จ");
        } catch (err) {
          console.error(err);
          alert("⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          alert("⚠️ กรุณาอนุญาตให้เข้าถึงตำแหน่งก่อนใช้งาน");
        } else {
          alert("เกิดข้อผิดพลาดในการหาตำแหน่ง");
        }
      }
    );
  };

  const fetch = async () => {
    try {
      const respon = await api.get("sessions");
    
      setdataSession(respon?.data?.sessions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: `url("https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/484070977_949443837368105_604188418762555219_n.jpg?...")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(165, 183, 178, 0.3)",
          zIndex: 0,
        }}
      />
      <Boxcenter sx={{ position: "relative", zIndex: 1 }}>
        {" "}
        {dataSession?.map((data, index) => (
          <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
            <Card
              key={index}
              sx={{
                display: "flex",
                mb: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <CardMedia
                component="img"
                image="https://th.bing.com/th/id/OIP.mr2hLqeNL5uNlAKQKMZHPAHaE8?w=258&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                alt="Random image"
                sx={{
                  width: { xs: "100%", sm: 250 },
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {data?.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {data?.room}
                  </Typography>
                  <Typography variant="body2">
                    เริ่มการประชุมตั้งแต่{" "}
                    {data?.startTime && moment(data?.startTime).format("HH:mm")}{" "}
                    - {data?.startTime && moment(data?.endTime).format("HH:mm")}{" "}
                    นาฬิกา
                  </Typography>
                </CardContent>
                <CardActions>
                  <Buttoncheckin
                    onClick={() => handleCheckIn(data)}
                    disabled={loading}
                    sx={{
                      color: "white",
                      "&:hover": { color: "darkgreen" },
                      "&:active": { color: "#2e7d32" },
                    }}
                    size="small"
                  >
                    {loading
                      ? "กำลังตรวจสอบตำแหน่ง..."
                      : "ลงชื่อเข้ารับการอบรม"}
                  </Buttoncheckin>
                </CardActions>
              </Box>
            </Card>
          </Box>
        ))}
      </Boxcenter>
    </Box>
  );
}

export default Home;
