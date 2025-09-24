import React from "react";

const centerLat = 17.000683277249934;
const centerLng = 99.81573968846453;
const radius = 0.50; // 50 เมตร

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
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

export default function CheckIn() {
  const handleCheckIn = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const distance = getDistance(userLat, userLng, centerLat, centerLng);

      if (distance <= radius) {
        alert("✅ อยู่ในพื้นที่ เช็คชื่อสำเร็จ!");
      } else {
        alert("❌ อยู่นอกพื้นที่ ไม่สามารถเช็คชื่อได้");
      }
    });
  };

  return (
    <div>
      <h2>เช็คชื่อด้วย GPS + Firebase</h2>
      <button onClick={handleCheckIn}>เช็คชื่อ</button>
    </div>
  );
}
