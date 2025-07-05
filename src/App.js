import React, { useState } from "react";
import "./App.css";

const imageUrls = ["mark-zuckerberg.png", "elon-musk.png"];

function getRandomBoard() {
    const images = [];
    // 18 zuck
    for (let i = 0; i < 18; i++) {
        images.push(imageUrls[0]);
    }

    // 18 musk
    for (let i = 0; i < 18; i++) {
        images.push(imageUrls[1]);
    }
    
    // shuffle
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    return images;
}

function App() {
const [board, setBoard] = useState(getRandomBoard());
const [revealed, setRevealed] = useState(Array(36).fill(false));
const [playerChoice, setPlayerChoice] = useState(null);
const [winner, setWinner] = useState(null);


const handleClick = (index) => {
    if (winner || revealed[index] || !playerChoice) return;

    const chosenImage =
    playerChoice === "zuck" ? "mark-zuckerberg.png" : "elon-musk.png";
    const tileImage = board[index];

  
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    
    // only allow revealing the player's side
    if (tileImage !== chosenImage) {
      alert(`You clicked the wrong image! Game over.`);
      setWinner(`You lost! You clicked a ${tileImage.includes("zuck") ? "ZUCK" : "MUSK"} tile.`);
      setRevealed(newRevealed.map(()=>true));
    }




    // check if all chosen images are revealed
    const remaining = board
    .map((img, i) => (img === chosenImage ? i : null))
    .filter((i) => i !== null && !newRevealed[i]);

    if (remaining.length === 0) {
        setWinner(`Congratulations! You found all your ${playerChoice.toUpperCase()} tiles!`);
    }
};

function handleChoice(choice) {
    setPlayerChoice(choice);
}

function handleRestart() {
    setBoard(getRandomBoard());
    setRevealed(Array(36).fill(false));
    setPlayerChoice(null);
    setWinner(null);
}

return (
    
<div className="container">
<h1>ZuckMusk Game!</h1>

{!playerChoice && (
    <div className="choice-buttons">
    <div className="player-choice-label">Choose your character:</div>
    <button id="zuck" onClick={() => handleChoice("zuck")}>Zuckerberg</button>
    <button onClick={() => handleChoice("musk")}>Musk</button>
    </div>
)}

{playerChoice && (
    <div className="player-choice">
    You chose <strong>{playerChoice.toUpperCase()}</strong>
    </div>
)}

{winner && (
    <div className="winner">
    {winner} <button onClick={handleRestart}>Restart</button>
    </div>
)}

{!winner && playerChoice && (
    <button className="restart" onClick={handleRestart}>
    Restart
    </button>
)}



<div className="grid">
{board.map((img, index) => (
    <div
        key={index}
        className="tile"
        id={`tile-${index}`}
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
