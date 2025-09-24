import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Boxcenter, Buttoncheckin } from "./style";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Home() {
  return (
    <Box
  sx={{
    minHeight: "100vh",
    position: "relative", // สำหรับ overlay
    backgroundImage: `url("https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/484070977_949443837368105_604188418762555219_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFnC6XnoRbAGNqhoQcvymWs41oRCyaR2rDjWhELJpHasFS6tSsZ9fut3CR55fTtNl88H2BjBCwUsA-uYvYyhFX6&_nc_ohc=6sVgkGXrTqIQ7kNvwGYTWQK&_nc_oc=AdkoVUxtTQ_O7Cqir1GxlBvmB7Ob5awHm921-7euD7LjSxzyxZUFq4_GkK3uMJaMqrrwXLibw99RSD8EuLqt5Vmy&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=qRuONRrzDAuoLU8R6K7aFw&oh=00_Afb5diL9jxakIVxrr4yc-CMuWQoE26cgkzoEz3MfzAGNXQ&oe=68D5D3B4")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
>
  {/* Overlay สีจาง */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(165, 183, 178, 0.3)", // สีจาง (ปรับค่าตามต้องการ)
      zIndex: 0,
    }}
  />
      <Boxcenter sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
          <Card
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            <CardMedia
              component="img"
              image="https://th.bing.com/th/id/OIP.mr2hLqeNL5uNlAKQKMZHPAHaE8?w=258&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Random image"
              sx={{
                width: { xs: "100%", sm: 250 }, // มือถือเต็มจอ, จอใหญ่ fix ที่ 250px
                height: "auto",
                objectFit: "cover",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
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
                  sx={{
                    color: "white",
                    "&:hover": { color: "darkgreen" },
                    "&:active": { color: "#2e7d32" },
                  }}
                  size="small"
                >
                  ลงชื่อเข้ารับการอบรม
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
