import React, { useState } from "react";
import backgroundImage from "../assets/background.png";
import { Box, Button, TextField, Typography,MenuItem  } from "@mui/material";
import {
  Boxcenter,
  ButtonConfirm,
  ContentWrapper,
  Fildlogin,
  MenuItemStyle,
  TextColor,
} from "./Style";

import logo from "../assets/hospitallogo.png";
import api from "../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phoneNumber: "",
    name: "",
    lastname: "",
    departmentName: "",
    institute: "",
    role: "",
  });
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center", // รูปแบบการจัดตำแหน่งภาพพื้นหลัง
    backgroundRepeat: "no-repeat", // ไม่ให้ภาพพื้นหลังซ้ำ
    minhight: "100vh",
    width: "100%",

    top: 0,
    left: 0,
    zIndex: -1, // ทำให้อยู่ด้านหลังเนื้อหาอื่นๆ
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await api.post("/users/register", form);
      if (response.status === 200) {
        Swal.fire({
          title: "สมัครสมาชิกสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/Login"); // เปลี่ยนเส้นทางไปยังหน้า Login
          console.log(response);
        });
      } // สมมติ data คือข้อมูลที่ต้องการส่งไป
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <div style={backgroundStyle}>
      <Boxcenter>
        <ContentWrapper
          style={{
            textAlign: "center",
            marginBottom: 10,
            width: "100%",
            maxWidth: 800,
          }}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: "150px" }} />
          <TextColor sx={{ fontSize: "24px", fontWeight: "600" }}>
            ลงทะเบียน
          </TextColor>

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

            <Fildlogin
              label="ชื่อ"
              onChange={handleChange("name")}
              variant="outlined"
            />
            <Fildlogin
              label="นามสกุล"
              onChange={handleChange("lastname")}
              variant="outlined"
            />
            <Fildlogin
              select
              label="กลุ่มงาน"
              value={form.departmentName}
              onChange={handleChange("departmentName")}
              variant="outlined"
              fullWidth
            >
              <MenuItemStyle value="กลุ่มงานอายุรกรรม">กลุ่มงานอายุรกรรม</MenuItemStyle>
              <MenuItemStyle value="กลุ่มงานกุมารเวชกรรม">กลุ่มงานกุมารเวชกรรม</MenuItemStyle>
              <MenuItemStyle value="กลุ่มงานศัลยกรรมออร์โธปิดิกส์">กลุ่มงานศัลยกรรมออร์โธปิดิกส์</MenuItemStyle>
              <MenuItemStyle value="กลุ่มงานสูติ-นรีเวชกรรม">กลุ่มงานสูติ-นรีเวชกรรม</MenuItemStyle>
              <MenuItemStyle value="กลุ่มงานจักษุวิทยา">กลุ่มงานจักษุวิทยา</MenuItemStyle>
            </Fildlogin>
             <Fildlogin
              select
              label="หน่วยงาน"
              value={form.institute}
              onChange={handleChange("institute")}
              variant="outlined"
              fullWidth
            >
              <MenuItemStyle value="เจ้าพนักงานการเงินและบัญชี">เจ้าพนักงานการเงินและบัญชี</MenuItemStyle>
              <MenuItemStyle value="เจ้าพนักงานเครื่องคอมพิวเตอร์">เจ้าพนักงานเครื่องคอมพิวเตอร์</MenuItemStyle>
              <MenuItemStyle value="เจ้าพนักงานทันตสาธารณสุข">เจ้าพนักงานทันตสาธารณสุข</MenuItemStyle>
              <MenuItemStyle value="เจ้าพนักงานทันตสาธารณสุข (วุฒิผู้ช่วยทันตแพทย์)">เจ้าพนักงานทันตสาธารณสุข (วุฒิผู้ช่วยทันตแพทย์)</MenuItemStyle>
              <MenuItemStyle value="เจ้าพนักงานธุรการ">เจ้าพนักงานธุรการ</MenuItemStyle>
            </Fildlogin>
          </Box>

          <ButtonConfirm
            onClick={handleRegister}
            variant="contained"
            size="medium"
          >
            ยืนยัน
          </ButtonConfirm>
        </ContentWrapper>
      </Boxcenter>
    </div>
  );
}
