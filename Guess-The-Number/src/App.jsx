import React from "react";
import { useState } from "react";

const App = () => {
  const [randomNumber, setRandomNumer] = useState(
    Math.floor(Math.random() * 101)
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  let [attempts, setAttemps] = useState(0);

  const handleGuess = () => {
    setAttemps(attempts + 1);
    const userGuess = parseInt(guess);
    if (userGuess < randomNumber) {
      setMessage("Your guess is less than actual");
    } else if (userGuess > randomNumber) {
      setMessage("Your guess is more than actual");
    } else {
      setMessage(`Your guess is right in ${attempts} times`);
      setGameOver(true);
    }
  };

  const handleReset = () => {
    setRandomNumer(Math.floor(Math.random() * 101));
    setGameOver(false);
    setMessage("");
    setGuess("");
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <header
        className="header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 0 8px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
      <p className="head-text">Guess the Number</p>
      </header>
      <p className="instruction" style={{ fontSize: "2rem", margin: "2rem" }}>
        Guess a Number between 0 and 100
      </p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
        style={{ height: "2rem", width: "25rem" }}
      />
      <p>{message}</p>
      <div className="buttons">
        <button
          type="reset"
          onClick={handleReset}
          style={{ height: "2rem", width: "8rem", margin: "2rem" }}
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={handleGuess}
          style={{ height: "2rem", width: "8rem", margin: "2rem" }}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default App;
