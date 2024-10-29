import { useState } from "react";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (number) => {
    if (number.length >= 4) {
      return `+(${number.substring(0, 3)}) - ${number.substring(3)}`;
    }
  }

  const handlePhoneNumber = (e) => {
    const number = e.target.value.replace(/\D/g, '');
    setPhoneNumber(formatPhoneNumber(number))
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header
        className="header"
        style={{
          height: "4rem",
          justifySelf: "center",
          width: "100%",
          padding: "2rem",
          fontSize: "3rem",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="text">Telephone Formatter</div>
      </header>

      <input
        type="tel"
        placeholder="Enter 10-digit number"
        maxLength={16}
        value={phoneNumber}
        onChange={handlePhoneNumber}
        style={{
          height: "3rem",
          width: "20rem",
          fontSize: "1.5rem",
          marginTop: "2rem",
        }}
      />
      <p style={{ fontSize: "1.5rem" }}>+(123) - 4567890</p>
    </div>
  );
};

export default App;
