import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const array = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
  ];

  const [grid, setGrid] = useState(array);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(-1);

  const resetGame = () => {
    setGrid(array);
    setPlayerTurn(true);
    setCount(0);
    setWinner(-1);
  };

  const findMove = () => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (grid[i][j] !== "x" && grid[i][j] !== "o") {
          const newGrid = [...grid];
          newGrid[i][j] = "o";
          setGrid(newGrid);
          setCount((prevCount) => prevCount + 1);
          setPlayerTurn(true);
          return;
        }
      }
    }
  };

  const hasWon = () => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < grid.length; i++) {
      // Check rows
      if (grid[i].every((cell) => cell === "x")) {
        setWinner(1);
        return;
      } else if (grid[i].every((cell) => cell === "o")) {
        setWinner(0);
        return;
      }

      // Check columns
      const column = grid.map((row) => row[i]);
      if (column.every((cell) => cell === "x")) {
        setWinner(1);
        return;
      } else if (column.every((cell) => cell === "o")) {
        setWinner(0);
        return;
      }
    }

    // Check diagonals
    if (
      (grid[0][0] === "x" && grid[1][1] === "x" && grid[2][2] === "x") ||
      (grid[0][2] === "x" && grid[1][1] === "x" && grid[2][0] === "x")
    ) {
      setWinner(1);
      return;
    } else if (
      (grid[0][0] === "o" && grid[1][1] === "o" && grid[2][2] === "o") ||
      (grid[0][2] === "o" && grid[1][1] === "o" && grid[2][0] === "o")
    ) {
      setWinner(0);
      return;
    }
  };

  const updateGrid = (rowIndex, colIndex) => {
    if (count === 9 || winner !== -1) {
      alert("Game over");
      return;
    }
    if (playerTurn) {
      if (
        grid[rowIndex][colIndex] === "x" ||
        grid[rowIndex][colIndex] === "o"
      ) {
        alert("This cell is already taken");
        return;
      }

      const newGrid = [...grid];
      newGrid[rowIndex][colIndex] = "x";
      setGrid(newGrid);
      setCount((prevCount) => prevCount + 1);
      setPlayerTurn(false);
      hasWon();
      if (winner === -1) {
        findMove();
      } else {
        alert("Game over");
      }
    } else {
      alert("It's not your turn");
    }
  };

  useEffect(() => {
    console.log("count", count);
    console.log("winner", winner);
  }, [count, winner]);

  // const array = [
  //   ["a1", "a2", "a3"],
  //   ["b1", "b2", "b3"],
  //   ["c1", "c2", "c3"],
  // ];

  // const [grid, setGrid] = useState(array);
  // const [playerTurn, setPlayerTurn] = useState(true);
  // const [count, setCount] = useState(0);
  // const [winner, setWinner] = useState(-1);

  // const resetGame = () => {
  //   setGrid(array);
  //   setPlayerTurn(true);
  //   setCount(0);
  //   setWinner(-1);
  // };

  // const findMove = () => {
  //   for (let i = 0; i < array.length; i++) {
  //     for (let j = 0; j < array[i].length; j++) {
  //       if (grid[i][j] !== "x" && grid[i][j] !== "o") {
  //         const newGrid = [...grid];
  //         newGrid[i][j] = "o";
  //         setGrid(newGrid);
  //         setCount((prevCount) => prevCount + 1);
  //         setPlayerTurn(true);
  //         return;
  //       }
  //     }
  //   }
  // };

  // const hasWon = () => {
  //   console.log("grid", grid);

  //   for (let i = 0; i < grid.length; i++) {
  //     let score = 0;
  //     for (let j = 0; j < grid[i].length; j++) {
  //       if (grid[i][j] === "x") {
  //         score++;
  //       } else if (grid[i][j] === "o") {
  //         score--;
  //       }
  //     }

  //     if (score === 3) {
  //       setWinner(1);
  //     }
  //     if (score === -3) {
  //       setWinner(0);
  //     }
  //   }
  // };

  // const updateGrid = (rowIndex, colIndex) => {
  //   if (count === 9 || winner !== -1) {
  //     alert("Game over");
  //     return;
  //   }
  //   if (playerTurn) {
  //     if (
  //       grid[rowIndex][colIndex] === "x" ||
  //       grid[rowIndex][colIndex] === "o"
  //     ) {
  //       alert("This cell is already taken");
  //       return;
  //     }
  //     console.log(rowIndex, colIndex);
  //     const newGrid = [...grid];
  //     newGrid[rowIndex][colIndex] = "x";
  //     setGrid(newGrid);
  //     setCount((prevCount) => prevCount + 1);
  //     setPlayerTurn(false);
  //     hasWon();
  //     if (winner !== 0 || winner !== 1) {
  //       findMove();
  //     } else {
  //       alert("Game over");
  //     }
  //   } else {
  //     alert("It's not your turn");
  //   }
  // };

  // useEffect(() => {
  //   console.log("count", count);
  // }, [count]);

  return (
    <div className="App">
      <h1>Welcome to Tic Tac Toe</h1>

      <div className="board">
        {grid.map((row, rowIndex) => (
          <div
            className={`row ${rowIndex < array.length - 1 && "rowBorder"}`}
            key={rowIndex}
          >
            {row.map((col, colIndex) => (
              <div
                className={`col ${
                  colIndex < array[rowIndex].length - 1 && "colBorder"
                }`}
                onClick={() => updateGrid(rowIndex, colIndex)}
                key={colIndex}
              >
                <div
                  className={`cell ${
                    grid[rowIndex][colIndex] === "x"
                      ? "playerX"
                      : grid[rowIndex][colIndex] === "o"
                      ? "playerO"
                      : "hasNotPlayed"
                  }`}
                >
                  {col}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="resetButtonDiv">
        <button onClick={() => resetGame()} className="resetButton">
          Reset
        </button>
      </div>

      <div>
        {winner === 0 && <h1>Player O wins</h1>}
        {winner === 1 && <h1>Player X wins</h1>}
      </div>
    </div>
  );
}

export default App;
