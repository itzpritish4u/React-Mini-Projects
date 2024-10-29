import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);

  const handleButtonClick = (value) => {
    // Appending digits or decimal point to the current display
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const handleClearButton = () => {
    // Clear all state
    setDisplay("");
    setOperator(null);
    setOperand(null);
  };

  const handleDeleteButton = () => {
    // Delete the last character from the display
    setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
  };

  const handleNegativeButton = () => {
    // Toggle negative sign on the current display
    setDisplay((prevDisplay) => (prevDisplay.startsWith("-") ? prevDisplay.slice(1) : `-${prevDisplay}`));
  };

  const handleSquare2Button = () => {
    if (!isNaN(display)) {
      setDisplay((prevDisplay) => (Math.pow(Number(prevDisplay), 2)).toString());
    }
  };

  const handleSquareRootButton = () => {
    if (!isNaN(display)) {
      setDisplay(Math.sqrt(display).toString());
    }
  };

  const handleOperatorClick = (op) => {
    if (display) {
      setOperand(parseFloat(display));  // Store the first operand
      setOperator(op);                  // Set the operator
      setDisplay("");                   // Clear display for the second operand
    }
  };

  const handleEqualsButton = () => {
    if (operator && operand !== null && display) {
      const result = evaluate(operand, parseFloat(display), operator);
      setDisplay(result.toString());    // Show the result
      setOperator(null);                // Reset operator and operand
      setOperand(null);
    }
  };

  const evaluate = (a, b, operator) => {
    switch (operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b !== 0 ? a / b : "Error";
      case "^": return Math.pow(a, b);
      default: return display;
    }
  };

  return (
    <div className="calculator-container">
      <header className="calculator-header">Calculator</header>
      
      <div className="calculator">
        <input type="text" className="calculator-display" value={display} readOnly />
        
        <div className="calculator-buttons">
          <button className="button clear" onClick={handleClearButton}>Clear</button>
          <button className="button delete" onClick={handleDeleteButton}>Del</button>
          <button className="button negate" onClick={handleNegativeButton}>±</button>
          <button className="button operator" onClick={handleSquare2Button}>x²</button>
          
          {[1, 2, 3].map((num) => (
            <button key={num} className="button number" onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          ))}

          <button className="button operator" onClick={() => handleOperatorClick("+")}>+</button>

          {[4, 5, 6].map((num) => (
            <button key={num} className="button number" onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          ))}

          <button className="button operator" onClick={() => handleOperatorClick("/")}>÷</button>

          {[7, 8, 9].map((num) => (
            <button key={num} className="button number" onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          ))}

          <button className="button operator" onClick={() => handleOperatorClick("-")}>-</button>

          <button key={0} className="button number" onClick={() => handleButtonClick('0')}>{0}</button>

          <button className="button operator" onClick={() => handleOperatorClick("^")}>x<sup>y</sup></button>

          <button className="button operator" onClick={handleSquareRootButton}>√</button>

          <button className="button operator" onClick={() => handleOperatorClick("*")}>*</button>
          
          <button className="button number" onClick={() => handleButtonClick(".")}>.</button>

          <button className="button equals" onClick={handleEqualsButton}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
