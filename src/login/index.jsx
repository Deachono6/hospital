import React from "react";
import backgroundImage from "../assets/background.png";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Boxcenter, ButtonLogin, Fildlogin, TextColor } from "./Style";

import logo from "../assets/hospitallogo.png";
import { useAuth } from "../authContext";
import Swal from "sweetalert2";
import api from "../api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [form, setForm] = React.useState({
    phoneNumber: ""
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center", // รูปแบบการจัดตำแหน่งภาพพื้นหลัง
    backgroundRepeat: "no-repeat", // ไม่ให้ภาพพื้นหลังซ้ำ
    height: "100vh",
    width: "100vw",

    position: "fixed", // ตั้งค่าให้ภาพพื้นหลังอยู่ติดกับหน้าจอ
    top: 0,
    left: 0,
    zIndex: -1, // ทำให้อยู่ด้านหลังเนื้อหาอื่นๆ
  };
  // ฟังก์ชันจัดการการเปลี่ยนแปลงของฟิลด์
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", form); // เรียก API login
      const userData = res.data.user; // สมมติ backend ส่ง user object กลับมา

      login(userData); // บันทึก user ลง Context

      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/"); // เปลี่ยนหน้าเป็น Dashboard หรือหน้า Home
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.res?.data?.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  };

  return (
    <div style={backgroundStyle}>
      <Boxcenter>
        <Box
          style={{
            textAlign: "center",
            marginBottom: 10,
            width: "100%",
            maxWidth: 800,
          }}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "150px" }} />
          <TextColor sx={{ fontSize: "24px", fontWeight: "600" }}>
            ระบบเช็คอิน
          </TextColor>
          <TextColor>โรงพยาบาลอุตรดิตถ์</TextColor>

          <Box
            sx={{
              width: "100%",
              maxWidth: 800,
              justifyContent: "center",
              display: "flex",

              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              mb: 3,
              mt: 3,
            }}
          >
            <Fildlogin
              label="เบอร์โทรศัพท์"
              variant="outlined"
              inputProps={{
                maxLength: 10, // จำกัดความยาว
                inputMode: "numeric", // แสดง numpad บนมือถือ
              }}
              onChange={(e) => {
                const value = e.target.value;
                // ลบทุกตัวอักษรที่ไม่ใช่เลข
                e.target.value = value.replace(/\D/g, "");
                handleChange("phoneNumber")(e);
              }}
            />
          </Box>

          <ButtonLogin onClick={handleLogin} variant="contained" size="medium">
            ล็อคอิน
          </ButtonLogin>
          <Box sx={{ mt: 2 }}>
            <TextColor
              component="a"
              href="/Register"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              ลงทะเบียน
            </TextColor>
          </Box>
        </Box>
      </Boxcenter>
    </div>
  );
}
