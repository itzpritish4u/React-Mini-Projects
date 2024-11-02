import React, { useState } from "react";
import "./App.css";

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
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(updatedList);
  };

  const moveAllRight = () => {
    setRightCountries(rightCountries.concat(leftCountries.map(country => ({ ...country, checked: false }))));
    setLeftCountries([]);
  };

  const moveSelectedRight = () => {
    setRightCountries(rightCountries.concat(leftCountries.filter(country => country.checked).map(country => ({ ...country, checked: false }))));
    setLeftCountries(leftCountries.filter(country => !country.checked));
  };

  const moveSelectedLeft = () => {
    setLeftCountries(leftCountries.concat(rightCountries.filter(country => country.checked).map(country => ({ ...country, checked: false }))));
    setRightCountries(rightCountries.filter(country => !country.checked));
  };

  const moveAllLeft = () => {
    setLeftCountries(leftCountries.concat(rightCountries.map(country => ({ ...country, checked: false }))));
    setRightCountries([]);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="text">Transfer List</div>
      </header>

      <div className="body-container">
        <div className="left-container">
          {leftCountries.map((countryDetails) => (
            <label htmlFor={countryDetails.id}>
              <input
                key={countryDetails.id}
                type="checkbox"
                checked={countryDetails.checked}
                onChange={() =>
                  toggleCheckbox(
                    countryDetails.id,
                    leftCountries,
                    setLeftCountries
                  )
                }
                className="checkbox"
              />
              {countryDetails.country}
            </label>
          ))}
        </div>

        <div className="buttons">
          <button onClick={moveAllRight} className="button">{">>"}</button>
          <button onClick={moveSelectedRight} className="button">{">"}</button>
          <button onClick={moveSelectedLeft} className="button">{"<"}</button>
          <button onClick={moveAllLeft} className="button">{"<<"}</button>
        </div>

        <div className="right-container">
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
                className="checkbox"
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
