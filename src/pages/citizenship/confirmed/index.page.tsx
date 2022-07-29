import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: 90,
  spread: 100,
  startVelocity: 34,
  elementCount: 81,
  dragFriction: 0.11,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  colors: ["#009ACF", "#00A0D1", "#44ADFF", "#4076CD", "#6A99FF"],
};

const CitizenshipConfirmed = () => {
  const [percentage, setPercentage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPercentage(100), 100);
    const t2 = setTimeout(() => setDone(true), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: "20rem", width: "20rem" }}>
        <p style={{ fontSize: 50 }}>{done ? "✅" : ""}</p>
        <Confetti active={done} config={confettiConfig} />
      </div>
    </div>
  );
};

export default CitizenshipConfirmed;
