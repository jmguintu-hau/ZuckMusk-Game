import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  'mark-zuckerberg.png',
  'elon-musk.png',
];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(Array(36).fill().map(getRandomImage));

  const handleClick = () => {
    setImages(images.map(() => getRandomImage()));
  };

  return (
    
    <div className="container">
      <h1> ZuckMusk Game!</h1>
      
      <div className="grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Random"
            className="square"
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;