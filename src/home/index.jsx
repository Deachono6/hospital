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

const centerLat = 17.000683277249934;
const centerLng = 99.81573968846453;
const radius = 0.05; // 0.05 km = 50 เมตร

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

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      alert("❌ เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const distance = getDistance(userLat, userLng, centerLat, centerLng);

        if (distance <= radius) {
          alert(`✅ เช็คชื่อสำเร็จ! (ระยะ ${distance.toFixed(3)} km)`);
        } else {
          alert(`❌ อยู่นอกพื้นที่ (${distance.toFixed(3)} km จากจุดกลาง)`);
        }
        setLoading(false);
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

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

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
        <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
          <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
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
                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Buttoncheckin
                  onClick={handleCheckIn}
                  disabled={loading}
                  sx={{
                    color: "white",
                    "&:hover": { color: "darkgreen" },
                    "&:active": { color: "#2e7d32" },
                  }}
                  size="small"
                >
                  {loading ? "กำลังตรวจสอบตำแหน่ง..." : "ลงชื่อเข้ารับการอบรม"}
                </Buttoncheckin>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Boxcenter>
    </Box>
  );
}

export default Home;
