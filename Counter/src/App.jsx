import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0)
  let [step, setStep] = useState()

  const handleIncrement = () => setCount(count + step);

  const handleDecrement = () => setCount(count - step);

  const handleReset = () => setCount(0);

  const handleStep = (event) => {
    const stepValue = parseInt(event.target.value);
    if (!isNaN(stepValue)) {
      setStep(stepValue);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif", gap:'1rem' }}>
      <header>
        <h1 style={{ marginBottom: "20px" }}>Counter</h1>
      </header>

      <div className="counter">{count}</div>
      <label htmlFor="step">Increment/Decrement by:</label>
      <input type="number" id='step' min='1' value={step} onChange={handleStep} />

      <div className="controls" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <button className="increment" style={{height:'1rem', width:'3rem'}} onClick={handleIncrement}>+</button>
        <button className="decrement" style={{height:'1rem', width:'3rem'}} onClick={handleDecrement}>-</button>
      </div>
      <button className="reset" style={{height:'1rem', width:'3rem'}} onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
