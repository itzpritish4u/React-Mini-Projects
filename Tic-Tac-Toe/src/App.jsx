// App.jsx
import { useState } from 'react';
import './App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isDraw, setIsDraw] = useState(false);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (!newBoard.includes(null) && !calculateWinner(newBoard)) {
      setIsDraw(true); // Set draw state if board is full and no winner
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsDraw(false);
  };

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="status">Winner: {winner}</div>
      ) : isDraw ? (
        <div className="status">It's a Draw!</div>
      ) : (
        <div className="status">Next Player: {isXNext ? 'X' : 'O'}</div>
      )}
      <button className="resetButton" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
