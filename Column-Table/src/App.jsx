import { useState } from "react";

const App = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  const gridItems = [];
  for (let item = 1; item <= rows * cols; ++item) {
    gridItems.push(item);
  }

  return (
    <div 
      style={{ marginTop: "2rem", display: "flex", justifyContent: "center", alignItems:'center', flexDirection: 'column'}}
    >
      <div className="controls" style={{ display: "flex", margin: '1rem'}}>
        <label style={{margin: '1rem'}}>
          Rows: {rows}
          <input
            type="range"
            min="2"
            max="8"
            value={rows}
            onChange={(event) => setRows(parseInt(event.target.value))}
          />
        </label>
        <label style={{margin: '1rem'}}>
          Columns: {cols}
          <input
            type="range"
            min="2"
            max="8"
            value={cols}
            onChange={(event) => setCols(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 50px)`,
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          margin: '1rem'
        }}
      >
        {gridItems.map((item, index) => (
          <div className="cell" id={index} style={{ fontSize: "1rem" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
