import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
} from "@mui/material";
import api from "../api";
import { useAuth } from "../authContext";
import moment from "moment";

export default function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.phoneNumber) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // 🔹 ดึงข้อมูล user ล่าสุดจาก server (ถ้ามี endpoint)
      const profileRes = await api.get(`/users/by-phone/${user.phoneNumber}`);
      setProfile(profileRes.data.user);

      // 🔹 ดึงประวัติการเข้าอบรมของ user
      const historyRes = await api.get(
        `/users/${profileRes.data.user.id}/checkins`
      );
      setHistory(historyRes.data.history || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (!profile) return <Typography>ไม่พบข้อมูลผู้ใช้</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f1f8f4",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 720 }}>
        {/* ===== Profile Card ===== */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              👤 โปรไฟล์ของฉัน
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography>
              ชื่อ: {profile?.name} {profile.lastname}
            </Typography>
            <Typography>เบอร์โทร: {profile?.phoneNumber}</Typography>
            <Typography>หน่วยงาน: {profile?.institute || "-"}</Typography>
            <Typography>แผนก: {profile?.departmentName || "-"}</Typography>

            <Box sx={{ mt: 1 }}>
              <Chip
                label={profile?.role === "admin" ? "ADMIN" : "USER"}
                color={profile?.role === "admin" ? "error" : "success"}
                size="small"
              />
            </Box>
          </CardContent>
        </Card>

        {/* ===== History ===== */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              📚 ประวัติการเข้าอบรม
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {history?.length === 0 && (
              <Typography color="text.secondary">
                ยังไม่มีประวัติการเข้าอบรม
              </Typography>
            )}

            <List>
              {history?.map(
                (h, index) =>
                  h.session ? ( // ถ้า h.session มีค่า
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={`${h.session.title} (${h.session.room})`}
                        secondary={`🕒 ${moment(h.timestamp).format(
                          "DD/MM/YYYY HH:mm"
                        )}`}
                      />
                    </ListItem>
                  ) : null // ถ้าไม่มี session → ไม่ render
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
