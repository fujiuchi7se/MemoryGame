import React, { useState } from 'react';
import './App.css';

const App = () => {
  // 各カードの裏返し状態を管理する配列
  const [cards, setCards] = useState(Array(16).fill(false));

  // カードをクリックしたときの処理
  const handleCardClick = (index) => {
    const newCards = [...cards];
    newCards[index] = !newCards[index];
    setCards(newCards);
  };

  return (
    <div className="card-grid">
      {cards.map((isFlipped, index) => (
        <div
          key={index}
          className={`card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          <div className="card-inner">
            <div className="card-front"></div>
            <div className="card-back"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;