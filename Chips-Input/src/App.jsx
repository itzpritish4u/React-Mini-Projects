import React, { useState } from 'react';

const App = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setChips([...chips, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeChip = (index) => {
    setChips(chips.filter((_, chipIndex) => chipIndex !== index));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type & hit Enter"
        value={inputValue}
        onChange={(event) => {setInputValue(event.target.value)}}
        onKeyDown={handleKeyDown}
        style={{
          padding: '10px',
          width: '60%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {chips.map((chip, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              borderRadius: '20px',
              backgroundColor: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
            }}
          >
            {chip}
            <button
              onClick={() => removeChip(index)}
              style={{
                marginLeft: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'red',
                fontSize: '16px',
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;