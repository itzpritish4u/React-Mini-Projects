import React, { useState } from "react";

const Accordion = ({
  id,
  title,
  info,
  questionId,
  setQuestionId,
  multiple,
}) => {
  const [showInfo, setShowInfo] = useState(null);
  function expendInfo() {
    if (!showInfo) {
      if (!multiple) {
        questionId.map((curr) => {
          curr((prev) => !prev);
        });
        setQuestionId([setShowInfo]);
      } else {
        setQuestionId([...questionId, setShowInfo]);
      }
    } else {
      setQuestionId((prev) => {
        return prev.filter((curr) => curr != setShowInfo);
      });
    }
    setShowInfo((prev) => !prev);
  }

  return (
    <div style={{ border: "1px solid", margin: "2px 2px" }} key={id}>
      <p>{title}</p>
      <button onClick={expendInfo}>{showInfo ? "-" : "+"}</button>
      <div>{showInfo && <p>{info}</p>}</div>
    </div>
  );
};

export default Accordion;
