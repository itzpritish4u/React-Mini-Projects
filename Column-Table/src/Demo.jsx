import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  const totalItems = rows * columns;
  const gridItems = [];
  for (let i = 0; i < totalItems; i++) {
    gridItems.push(i + 1);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Column Table</h2>

      <div className="controls">
        <label>
          Rows: <span>{rows}</span>
          <input
            type="range"
            min="2"
            max="8"
            value={rows}
            onChange={(event) => setRows(Number(event.target.value))}
          />
        </label>

        <label>
          Columns: <span>{columns}</span>
          <input
            type="range"
            min="2"
            max="8"
            value={columns}
            onChange={(event) => setColumns(Number(event.target.value))}
          />
        </label>
      </div>

      <div
        className="grid-container"
        style={{
          gridTemplateRows: `repeat(${rows}, 50px)`,
          gridTemplateColumns: `repeat(${columns}, 50px)`,
        }}
      >
        {gridItems.map((item) => (
          <div key={item} className="grid-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
