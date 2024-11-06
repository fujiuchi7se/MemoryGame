import React, { useState } from 'react';
import './App.css';

const App = () => {
  // 各カードの表面の状態を管理する配列
  const [cards, setCards] = useState(Array(16).fill(false));

  // カードをクリックしたときの処理
  const handleCardClick = (index) => {
    const newCards = [...cards];
    newCards[index] = !newCards[index]; // カードを反転
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
            <div className="card-front">A</div> {/* 表面の表示内容 */}
            <div className="card-back"></div>   {/* 裏面の表示内容 */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
