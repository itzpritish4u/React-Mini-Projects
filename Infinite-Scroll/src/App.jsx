import React, { useState, useEffect } from "react";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

const App = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    addDivsContinuously();
  }, []);
  
  const addDivsContinuously = () => {
    let iterationCount = 0;
    while (iterationCount < 100) {
      setItems((prevItems) => [
        ...prevItems,
        { text: lorem.generateSentences(1), id: prevItems.length },
      ]);
      iterationCount++;
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addDivsContinuously();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            width: "90%",
            margin: "1rem auto",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default App;
