import React, { useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  let [formedText, setFormedText] = useState("");

  const changeToLowerCase = () => {
    setFormedText(userInput.toLowerCase());
  };

  const changeToUpperCase = () => {
    setFormedText(userInput.toUpperCase());
  };

  const words = userInput.trim().split(" ");

  const changeToCamelCase = () => {
    let formed = words[0].toLowerCase();
    for (let i = 1; i < words.length; ++i) {
      formed +=
        words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
    }
    setFormedText(formed);
  };

  const changeToPascalCase = () => {
    let formed = "";
    for (let word of words) {
      formed += word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }
    setFormedText(formed);
  };

  const changeToSnakeCase = () => {
    let formed = words.reduce((acc, word) => {
      acc += word.toLowerCase() + "_";
      return acc;
    }, "");
    setFormedText(formed.substring(0, formed.length - 1));
  };

  const changeToKebabCase = () => {
    let formed = words.reduce((acc, word) => {
      acc += word.toLowerCase() + "-";
      return acc;
    }, "");
    setFormedText(formed.substring(0, formed.length - 1));
  };

  const trimInput = () => {
    let formed = words.reduce((acc, word) => {
      acc += word.toLowerCase() + " ";
      return acc;
    }, "");
    setFormedText(formed.substring(0, formed.length - 1));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "2.5rem",
        justifyContent: "center",
      }}
    >
      <header
        className="header"
        style={{
          width: "100%",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        String Transformers
      </header>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: "40rem", height: "5rem", fontSize: "1.2rem" }}
      />
      <div
        className="buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "40rem",
          gap: "2rem",
          margin: "2rem 0",
        }}
      >
        <button
          onClick={changeToLowerCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Lower Case
        </button>
        <button
          onClick={changeToUpperCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Upper Case
        </button>
        <button
          onClick={changeToCamelCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Camel Case
        </button>
        <button
          onClick={changeToPascalCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Pascal Case
        </button>
        <button
          onClick={changeToSnakeCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Snake Case
        </button>
        <button
          onClick={changeToKebabCase}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Kebab Case
        </button>
        <button
          onClick={trimInput}
          style={{ height: "2.6rem", fontSize: "1.2rem" }}
        >
          Trim
        </button>
      </div>
      <div className="text">
        {" "}
        <b style={{ fontSize: "1.5rem" }}>Transformed String:</b>{" "}
      </div>
      <div className="output">{formedText}</div>
    </div>
  );
};

export default App;
