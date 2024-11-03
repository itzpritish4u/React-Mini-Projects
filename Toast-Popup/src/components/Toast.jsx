import React, { useState, useEffect } from 'react';

const Toast = ({ message, duration, position, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getPositionStyles = () => {
    const positions = {
      Top: { top: '20px' },
      Bottom: { bottom: '20px' },
    };
    return positions[position.vertical] || {};
  };

  const getToastStyles = () => {
    const colors = {
      Success: '#4caf50',
      Error: '#f44336',
      Warning: '#ff9800',
      Info: '#2196f3',
    };
    return {
      backgroundColor: colors[type],
      position: 'fixed',
      [position.horizontal]: '20px',
      ...getPositionStyles(),
      padding: '10px 20px',
      color: 'white',
      borderRadius: '4px',
    };
  };

  return (
    <div style={getToastStyles()}>
      {message}
    </div>
  );
};

export default Toast;
