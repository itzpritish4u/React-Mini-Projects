import React, { useState } from "react";

const App = () => {
  const [leftCountries, setLeftCountries] = useState([
    { id: "usa", country: "USA", checked: false },
    { id: "uae", country: "UAE", checked: false },
    { id: "india", country: "India", checked: false },
    { id: "australia", country: "Australia", checked: false },
    { id: "canada", country: "Canada", checked: false },
  ]);

  const [rightCountries, setRightCountries] = useState([]);

  const toggleCheckbox = (id, list, setList) => {
    const updatedList = [];
    for (let item of list) {
      if (item.id === id) {
        updatedList.push({ ...item, checked: !item.checked });
      } else {
        updatedList.push(item);
      }
    }
    setList(updatedList);
  };

  const moveAllRight = () => {
    const newRightCountries = [...rightCountries];
    for (let country of leftCountries) {
      newRightCountries.push({ ...country, checked: false });
    }
    setRightCountries(newRightCountries);
    setLeftCountries([]);
  };

  const moveSelectedRight = () => {
    const newRightCountries = [...rightCountries];
    const newLeftCountries = [];

    for (let country of leftCountries) {
      if (country.checked) {
        newRightCountries.push({ ...country, checked: false });
      } else {
        newLeftCountries.push(country);
      }
    }

    setRightCountries(newRightCountries);
    setLeftCountries(newLeftCountries);
  };

  const moveSelectedLeft = () => {
    const newLeftCountries = [...leftCountries];
    const newRightCountries = [];

    for (let country of rightCountries) {
      if (country.checked) {
        newLeftCountries.push({ ...country, checked: false });
      } else {
        newRightCountries.push(country);
      }
    }

    setLeftCountries(newLeftCountries);
    setRightCountries(newRightCountries);
  };

  const moveAllLeft = () => {
    const newLeftCountries = [...leftCountries];
    for (let country of rightCountries) {
      newLeftCountries.push({ ...country, checked: false });
    }
    setLeftCountries(newLeftCountries);
    setRightCountries([]);
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
        <div className="text">Transfer List</div>
      </header>

      <div
        className="body-container"
        style={{
          width: "40rem",
          height: "25rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="left-container"
          style={{
            width: "16rem",
            border: "2px solid",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.3rem",
          }}
        >
          {leftCountries.map((countryDetails) => (
            <label key={countryDetails.id} htmlFor={countryDetails.id}>
              <input
                type="checkbox"
                checked={countryDetails.checked}
                onChange={() =>
                  toggleCheckbox(
                    countryDetails.id,
                    leftCountries,
                    setLeftCountries
                  )
                }
                style={{ margin: "0.8rem" }}
              />
              {countryDetails.country}
            </label>
          ))}
        </div>

        <div
          className="buttons"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={moveAllRight}
            style={{ width: "5.5rem", height: "3rem", fontSize: "1.5rem" }}
          >
            {">>"}
          </button>
          <button
            onClick={moveSelectedRight}
            style={{ width: "5.5rem", height: "3rem", fontSize: "1.5rem" }}
          >
            {">"}
          </button>
          <button
            onClick={moveSelectedLeft}
            style={{ width: "5.5rem", height: "3rem", fontSize: "1.5rem" }}
          >
            {"<"}
          </button>
          <button
            onClick={moveAllLeft}
            style={{ width: "5.5rem", height: "3rem", fontSize: "1.5rem" }}
          >
            {"<<"}
          </button>
        </div>

        <div
          className="right-container"
          style={{
            width: "16rem",
            border: "2px solid",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.3rem",
          }}
        >
          {rightCountries.map((countryDetails) => (
            <label key={countryDetails.id} htmlFor={countryDetails.id}>
              <input
                type="checkbox"
                checked={countryDetails.checked}
                onChange={() =>
                  toggleCheckbox(
                    countryDetails.id,
                    rightCountries,
                    setRightCountries
                  )
                }
                style={{ margin: "0.8rem" }}
              />
              {countryDetails.country}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
