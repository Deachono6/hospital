import { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function AttendanceReport() {
  const [report, setReport] = useState([]);
  const [filteredReport, setFilteredReport] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [selectedRoom, selectedDate, report]);

  const fetchReport = async () => {
    const res = await api.get("/reports/attendance");
    const data = res.data.report || [];

    setReport(data);
    setFilteredReport(data);
    setRooms([...new Set(data.map((r) => r.room))]);
    setLoading(false);
  };

  const applyFilter = () => {
    let data = [...report];

    if (selectedRoom !== "ALL") {
      data = data.filter((r) => r.room === selectedRoom);
    }

    if (selectedDate) {
      data = data.filter(
        (r) =>
          new Date(r.startTime).toISOString().slice(0, 10) === selectedDate
      );
    }

    setFilteredReport(data);
  };

  const exportCSV = () => {
    if (filteredReport.length === 0) return alert("ไม่มีข้อมูลให้ Export");

    let csv = "\ufeffห้อง,หัวข้อ,ชื่อ-สกุล,เบอร์โทร,หน่วยงาน,เวลาเข้า\n";

    filteredReport.forEach((room) => {
      room.attendees.forEach((a) => {
        csv += `"${room.room}","${room.title}","${a.name}","${a.phoneNumber}","${
          a.institute || ""
        }","${new Date(a.checkinTime).toLocaleTimeString("th-TH")}"\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance.csv";
    link.click();
  };

  if (loading) return <Typography>⏳ กำลังโหลด...</Typography>;

  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "#f1f8f6" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#2e7d32", fontWeight: 700 }}>
        📋 รายงานการเข้าอบรม
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3, bgcolor: "#e8f5e9" }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>ห้อง</InputLabel>
            <Select
              value={selectedRoom}
              label="ห้อง"
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <MenuItem value="ALL">ทั้งหมด</MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room} value={room}>
                  {room}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            type="date"
            label="วันที่"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ bgcolor: "#2e7d32" }}
            onClick={exportCSV}
          >
            📤 Export CSV
          </Button>
        </CardContent>
      </Card>

      {/* Report */}
      {filteredReport.map((room, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              🏫 {room.room} — {room.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ⏰ {new Date(room.startTime).toLocaleString("th-TH")}
            </Typography>

            <Table size="small">
              <TableHead sx={{ bgcolor: "#e8f5e9" }}>
                <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>ชื่อ-สกุล</TableCell>
                  <TableCell>เบอร์โทร</TableCell>
                  <TableCell>หน่วยงาน</TableCell>
                  <TableCell>เวลาเข้า</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {room.attendees.map((a) => (
                  <TableRow key={a.no}>
                    <TableCell>{a.no}</TableCell>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.phoneNumber}</TableCell>
                    <TableCell>{a.institute || "-"}</TableCell>
                    <TableCell>
                      {new Date(a.checkinTime).toLocaleTimeString("th-TH")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
