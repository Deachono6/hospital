import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../api";

const hospitalTheme = {
  primary: "#2e7d32",
  background: "#f1f8f4",
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapClickHandler({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

export default function CreateSession() {
  const [form, setForm] = useState({
    room: "",
    title: "",
  });

  const [position, setPosition] = useState(null);
  const [loadingGPS, setLoadingGPS] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  function FlyToPosition({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo([position.lat, position.lng], 17, {
          animate: true,
        });
      }
    }, [position, map]);

    return null;
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("อุปกรณ์นี้ไม่รองรับ GPS");
      return;
    }

    setLoadingGPS(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoadingGPS(false);
      },
      () => {
        alert("ไม่สามารถดึงตำแหน่งได้");
        setLoadingGPS(false);
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      alert("กรุณาเลือกตำแหน่งบนแผนที่");
      return;
    }

    try {
      const payload = {
        room: form.room,
        title: form.title,
        startTime: form.startTime,
        endTime: form.endTime,
        latitude: position.lat,
        longitude: position.lng,
      };

      await api.post("/sessions", payload);

      alert("✅ สร้าง Session สำเร็จ");

      setForm({
        room: "",
        title: "",
        startTime: "",
        endTime: "",
      });
      setPosition(null);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "❌ ไม่สามารถสร้าง Session ได้");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: hospitalTheme.background,
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 680,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ color: hospitalTheme.primary, fontWeight: 700 }}
          gutterBottom
        >
          สร้าง Session อบรม
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="หัวข้อ"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            fullWidth
            label="ห้อง"
            name="room"
            value={form.room}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="A101">A101</MenuItem>
            <MenuItem value="A102">A102</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="datetime-local"
            label="เวลาเริ่ม"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="เวลาสิ้นสุด"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* ปุ่ม GPS */}
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button
              size="small"
              startIcon={<MyLocationIcon />}
              onClick={handleGetCurrentLocation}
              disabled={loadingGPS}
              sx={{ color: hospitalTheme.primary }}
            >
              ใช้ตำแหน่งปัจจุบัน
            </Button>
          </Stack>

          {/* แผนที่ */}
          <Box sx={{ height: 350, width: "100%", my: 2 }}>
            <MapContainer
              center={
                position ? [position.lat, position.lng] : [13.7563, 100.5018]
              }
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <FlyToPosition position={position} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler position={position} setPosition={setPosition} />
            </MapContainer>
          </Box>

          <TextField
            label="Latitude"
            value={position?.lat || ""}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Longitude"
            value={position?.lng || ""}
            fullWidth
            margin="normal"
            disabled
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: hospitalTheme.primary,
              "&:hover": { bgcolor: "#1b5e20" },
            }}
          >
            บันทึก Session
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
