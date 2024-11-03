import React, { useState } from "react";

const ChessBoard = () => {
  const BOARD_SIZE = 8;

  // Initialize the board with a checkerboard pattern
  const initializeBoard = () => {
    return Array(BOARD_SIZE)
      .fill(null)
      .map((_, row) =>
        Array(BOARD_SIZE)
          .fill(null)
          .map((_, col) => ((row + col) % 2 === 0 ? "lightgray" : "black"))
      );
  };

  const [board, setBoard] = useState(initializeBoard);

  // Function to handle cell click and update colors
  const handleCellClick = (row, col) => {
    const newBoard = initializeBoard();

    // Color the clicked cell in dark red
    newBoard[row][col] = "darkred";

    // Color diagonal cells in red
    for (let i = 1; i < BOARD_SIZE; i++) {
      if (row + i < BOARD_SIZE && col + i < BOARD_SIZE)
        newBoard[row + i][col + i] = "red";
      if (row - i >= 0 && col + i < BOARD_SIZE)
        newBoard[row - i][col + i] = "red";
      if (row + i < BOARD_SIZE && col - i >= 0)
        newBoard[row + i][col - i] = "red";
      if (row - i >= 0 && col - i >= 0) newBoard[row - i][col - i] = "red";
    }

    setBoard(newBoard);
  };

  // Render the chessboard
  return (
    <div className="container" 
      style={{display: "flex", justifyContent: 'center', flexWrap: 'wrap'}}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 7rem)`,
          width: '56rem',
          height: '',
          border: '3px solid'
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cellColor, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                height: "7rem",  
                backgroundColor: cellColor,
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
