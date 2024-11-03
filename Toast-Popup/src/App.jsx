import React, { useState } from 'react';
import Toast from './components/Toast';

const App = () => {
  const [position, setPosition] = useState({ horizontal: 'Left', vertical: 'Top' });
  const [type, setType] = useState('Success');
  const [message, setMessage] = useState('This is a toast message!');
  const [duration, setDuration] = useState(3);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Toast Popup</h2>

      {/* Position Selection */}
      <select onChange={(e) => setPosition({ ...position, horizontal: e.target.value })}>
        <option>Left</option>
        <option>Right</option>
      </select>

      <select onChange={(e) => setPosition({ ...position, vertical: e.target.value })}>
        <option>Top</option>
        <option>Bottom</option>
      </select>

      {/* Type Selection */}
      <select onChange={(e) => setType(e.target.value)}>
        <option>Success</option>
        <option>Error</option>
        <option>Warning</option>
        <option>Info</option>
      </select>

      {/* Message Input */}
      <input
        type="text"
        placeholder="This is a toast message!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Duration Slider */}
      <div>
        <label>Duration</label>
        <input
          type="range"
          min="1"
          max="10"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {/* Show Toast Button */}
      <button onClick={handleShowToast} style={{ backgroundColor: '#00e5ff', padding: '10px', marginTop: '10px' }}>
        Show Toast
      </button>

      {/* Render Toast */}
      {showToast && (
        <Toast
          message={message}
          duration={duration}
          position={position}
          type={type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default App;
