import React, { useState } from "react";
import "./App.css";

const imageUrls = ["mark-zuckerberg.png", "elon-musk.png"];

function getRandomBoard() {
  const images = [];
  for (let i = 0; i < 36; i++) {
    const index = Math.floor(Math.random() * imageUrls.length);
    images.push(imageUrls[index]);
  }
  return images;
}

function App() {
  const [board, setBoard] = useState(getRandomBoard());
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleClick = (index) => {
    if (winner || revealed[index] || !player1Choice) return;

    const currentChoice = currentPlayer === 1 ? player1Choice : player2Choice;
    const currentImage =
      currentChoice === "zuck" ? "mark-zuckerberg.png" : "elon-musk.png";
    const tileImage = board[index];

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (tileImage !== currentImage) {
      setTimeout(() => {
        alert(`You lost! Player ${currentPlayer === 1 ? 2 : 1} wins!`);
      }, 300);  
      setWinner(
        `Player ${currentPlayer} lost! Player ${currentPlayer === 1 ? 2 : 1} wins!`
      );
      return;
    }

    const remaining = board
      .map((img, i) => (img === currentImage ? i : null))
      .filter((i) => i !== null && !newRevealed[i]);

    if (remaining.length === 0) {
      setWinner(`Player ${currentPlayer} wins! Found all their images!`);
      return;
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  function handleChoice(choice) {
    setPlayer1Choice(choice);
    setPlayer2Choice(choice === "zuck" ? "musk" : "zuck");
    setCurrentPlayer(1);
  }

  function handleRestart() {
    setBoard(getRandomBoard());
    setRevealed(Array(36).fill(false));
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setWinner(null);
    setCurrentPlayer(1);
  }

  return (
    <div className="container">
      <h1>ZuckMusk Game!</h1>
      {!player1Choice && (
        <div className="choice-buttons">
          <div className="player-choice-label">Player 1 choose character:</div>
          <button onClick={() => handleChoice("zuck")}>Zuckerberg</button>
          <button onClick={() => handleChoice("musk")}>Musk</button>
        </div>
      )}
      {player1Choice && (
        <div className="player-choice">
          Player 1 chose <strong>{player1Choice.toUpperCase()}</strong> | Player 2 is{" "}
          <strong>{player2Choice.toUpperCase()}</strong>
        </div>
      )}
      {player1Choice && !winner && (
        <div className="turn-indicator">Player {currentPlayer}'s turn</div>
      )}
      {winner && (
        <div className="winner">
          {winner} <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      {!winner && player1Choice && (
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
      )}
      <div className="grid">
        {board.map((img, index) => (
          <div
            key={index}
            className="tile"
            onClick={() => handleClick(index)}
          >
            <span className="tile-number">{index + 1}</span>
            {revealed[index] && <img src={img} alt="Revealed" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
