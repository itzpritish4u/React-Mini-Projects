import React, { useState } from "react";

const questions = [
  {
    id: 1,
    title: "Do I have to allow the use of cookies?",
    info: "Unicorn vinyl poutine brooklyn, next level direct trade iceland.",
  },
  {
    id: 2,
    title: "How do I change my My Page password?",
    info: "Coloring book forage photo booth gentrify lumbersexual.",
  },
  {
    id: 3,
    title: "What is BankID?",
    info: "Enamel pin fam sustainable woke whatever venmo.",
  },
  {
    id: 4,
    title: "Whose birth number can I use?",
    info: "Edison bulb direct trade gentrify beard lo-fi seitan.",
  },
  {
    id: 5,
    title: "When do I receive a password ordered by letter?",
    info: "Locavore franzen fashion axe live-edge neutra irony synth.",
  },
];

function App() {
  const [multiple, setMultiple] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  const handleAccordionClick = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((currId) => currId !== id));
    } else {
      setExpandedIds(multiple ? [...expandedIds, id] : [id]);
    }
  };

  const handleToggleMultiple = () => {
    setMultiple((prev) => !prev);
    if (!multiple) setExpandedIds([]); // Close all if switching to single mode
  };

  return (
    <>
      <h1>Accordion</h1>
      <div>
        <label htmlFor="multiple-toggle">Allow multiple open sections?</label>
        <input
          type="checkbox"
          id="multiple-toggle"
          checked={multiple}
          onChange={handleToggleMultiple}
        />
      </div>

      <div>
        {questions.map(({ id, title, info }) => (
          <div key={id} style={{ border: "1px solid", margin: "4px 0" }}>
            <p>{title}</p>
            <button onClick={() => handleAccordionClick(id)}>
              {expandedIds.includes(id) ? "-" : "+"}
            </button>
            {expandedIds.includes(id) && <p>{info}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
