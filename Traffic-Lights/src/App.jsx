import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    const changeLight = () => {
      if (color === "red") {
        setColor("green");
        setTimer(3);
      } else if (color === "green") {
        setColor("yellow");
        setTimer(2);
      } else if (color === "yellow") {
        setColor("red");
        setTimer(4);
      }
    };

    const countdown = setTimeout(() => {
      setTimer((prev) => (prev > 1 ? prev - 1 : prev));
    }, 1000);

    const lightChange = setTimeout(changeLight, timer * 1000);

    return () => {
      clearTimeout(lightChange);
      clearTimeout(countdown);
    };
  }, [color, timer]);

  return (
    <div style={styles.container}>
      <div style={styles.trafficLight}>
        <div
          style={{
            ...styles.circle,
            backgroundColor: color === "red" ? "red" : "gray",
          }}
        ></div>
        <div
          style={{
            ...styles.circle,
            backgroundColor: color === "yellow" ? "yellow" : "gray",
          }}
        ></div>
        <div
          style={{
            ...styles.circle,
            backgroundColor: color === "green" ? "green" : "gray",
          }}
        ></div>
      </div>
      <div style={styles.timer}>{timer} Seconds</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  trafficLight: {
    width: "80px",
    height: "200px",
    backgroundColor: "black",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  circle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  timer: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default TrafficLight;
