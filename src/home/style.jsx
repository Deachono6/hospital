import { Box, Button, styled } from "@mui/material";

export const Boxcenter = styled(Box)({
  minHeight: "100vh", // เต็มหน้าจอ
  padding: "16px", // ระยะห่างจากขอบ
  boxSizing: "border-box",
  
  maxWidth: "1200px", // ความกว้างสูงสุด (เหมือน container)
  margin: "0 auto", // จัดให้อยู่กึ่งกลางตามแนวนอน
});
export const Buttoncheckin = styled(Button)({
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
