import { useState } from 'react';

const minStep = 1;
const maxStep = 100;
const minDelay = 1;
const maxDelay = 3;
const minLimit = -1000;
const maxLimit = 1000;

function App() {
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  const [delay, setDelay] = useState(1);
  const [lowerLimit, setLowerLimit] = useState(minLimit);
  const [upperLimit, setUpperLimit] = useState(maxLimit);
  const [asyncRunning, setAsyncRunning] = useState({ decrement: false, increment: false });

  function reset() {
    setAsyncRunning({ decrement: false, increment: false });
    setValue(0);
  }

  function stepBy(stepValue) {
    setValue((prev) => {
      const newValue = prev + stepValue;
      if (lowerLimit <= newValue && newValue <= upperLimit) {
        return newValue;
      }
      return prev;
    });
  }

  return (
    <main style={{ textAlign: 'center', fontSize: '1.5rem' }}>
      <h2>{value}</h2>

      {/* Synchronous Controls */}
      <section>
        <button onClick={() => stepBy(-step)} aria-label="Decrement">-</button>
        <button onClick={() => stepBy(step)} aria-label="Increment">+</button>
      </section>

      {/* Asynchronous Controls */}
      <section>
        <button
          onClick={() => {
            setAsyncRunning({ ...asyncRunning, decrement: true });
            setTimeout(() => {
              stepBy(-step);
              setAsyncRunning({ ...asyncRunning, decrement: false });
            }, delay * 1000);
          }}
          disabled={asyncRunning.decrement}
          aria-label="Async Decrement"
        >
          async -
        </button>
        <button
          onClick={() => {
            setAsyncRunning({ ...asyncRunning, increment: true });
            setTimeout(() => {
              stepBy(step);
              setAsyncRunning({ ...asyncRunning, increment: false });
            }, delay * 1000);
          }}
          disabled={asyncRunning.increment}
          aria-label="Async Increment"
        >
          async +
        </button>
      </section>

      {/* Delay Control */}
      <section>
        <label htmlFor="delay">Delay</label>
        <input
          type="range"
          id="delay"
          min={minDelay}
          max={maxDelay}
          step="1"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
        <output>{delay}</output>
      </section>

      {/* Step Control */}
      <section>
        <label htmlFor="step">Increment/Decrement by</label>
        <input
          id="step"
          type="number"
          min={minStep}
          max={maxStep}
          value={step}
          onChange={(e) => {
            const num = Number(e.target.value);
            if (!isNaN(num)) {
              setStep(Math.min(Math.max(num, minStep), maxStep));
            }
          }}
          style={{ width: '5rem', padding: '0.15rem', marginLeft: '1rem' }}
        />
      </section>

      {/* Limit Controls */}
      <section>
        <div>
          <label htmlFor="lowerLimit">Lower Limit</label>
          <input
            type="number"
            id="lowerLimit"
            value={lowerLimit}
            onChange={(e) => {
              const num = Number(e.target.value);
              setLowerLimit(Math.max(Math.min(num, upperLimit), minLimit));
            }}
            style={{ width: '5rem', padding: '0.15rem', marginLeft: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="upperLimit">Upper Limit</label>
          <input
            type="number"
            id="upperLimit"
            value={upperLimit}
            onChange={(e) => {
              const num = Number(e.target.value);
              setUpperLimit(Math.min(Math.max(num, lowerLimit), maxLimit));
            }}
            style={{ width: '5rem', padding: '0.15rem', marginLeft: '1rem' }}
          />
        </div>
      </section>

      {/* Reset Button */}
      <section>
        <button onClick={reset} style={{ padding: '0.25rem 1rem', fontSize: '1.5rem' }}>Reset</button>
      </section>
    </main>
  );
}

export default App;