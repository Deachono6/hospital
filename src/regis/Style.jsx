import { Box, Button, styled, TextField, Typography, MenuItem } from "@mui/material";

export const TextColor = styled(Typography)({
  color: "#3c7962",
  padding: 1,
  margin: 4,
});

export const Boxcenter = styled(Box)({
  minHeight: "100vh", // ให้เต็มความสูงหน้าจอ
  display: "flex", // ใช้ flexbox
  flexDirection: "column", // แนวตั้ง
  justifyContent: "center", // กึ่งกลางแนวตั้ง
  alignItems: "center", // กึ่งกลางแนวนอน
  padding: 2,
  boxSizing: "border-box",
  overflowY: "auto",
});
export const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // กึ่งกลาง
  alignItems: "center",
  flexGrow: 1, // ขยายเต็มพื้นที่
});
export const Fildlogin = styled(TextField)({
  width: "100%",
  maxWidth: 300,
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    "&.Mui-focused fieldset": {
      borderColor: "#3c7962", // สีเมื่อ focus
    },
    "& fieldset": {
      borderColor: "#549c80ff", // สีปกติ
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#3c7962", // สีเมื่อ hover
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3c7962", // สี label เมื่อ focus
    },
  },
  "& .MuiInputLabel-root": {
    color: "#555", // สี label ปกติ
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3c7962", // สี label เมื่อ focus
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f", // สี label เมื่อมี error
  },
});
export const MenuItemStyle = styled(MenuItem)({
  width: "100%",
  maxWidth: 300,
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    "&.Mui-focused fieldset": {
      borderColor: "#3c7962", // สีเมื่อ focus
    },
    "& fieldset": {
      borderColor: "#549c80ff", // สีปกติ
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#3c7962", // สีเมื่อ hover
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3c7962", // สี label เมื่อ focus
    },
  },
  "& .MuiInputLabel-root": {
    color: "#555", // สี label ปกติ
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3c7962", // สี label เมื่อ focus
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f", // สี label เมื่อมี error
  },
});

export const ButtonConfirm = styled(Button)({
  width: "100%",
  maxWidth: 300,
  padding: "10px",
  borderRadius: 10,
  backgroundColor: "#77bba2",
  ":hover": {
    backgroundColor: {
      backgroundColor: "#3c7962",
    },
  },
});
