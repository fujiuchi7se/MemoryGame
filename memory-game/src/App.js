import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // カードの表の画像
  const images = [
    'card_spade_01.png', 'card_spade_01.png', 'card_spade_02.png', 'card_spade_02.png',
    'card_spade_03.png', 'card_spade_03.png', 'card_spade_04.png', 'card_spade_04.png',
    'card_spade_05.png', 'card_spade_05.png', 'card_spade_06.png', 'card_spade_06.png',
    'card_spade_07.png', 'card_spade_07.png', 'card_spade_08.png', 'card_spade_08.png',
  ];
  
  // カードをシャッフルして初期配置を設定
  const shuffleCards = () => {
    const shuffled = images
      .map((image) => ({ image, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ image }) => ({ image, isFlipped: false }));

    return shuffled;
  };

  const [cards, setCards] = useState([]);

  // レンダリング時にカードをシャッフル
  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  // カードをクリックしたときの処理
  const handleCardClick = (index) => {
    const newCards = [...cards];
    newCards[index].isFlipped = !newCards[index].isFlipped;
    setCards(newCards);
  };

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card.isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          <div className="card-inner">
            <div className="card-front"
              style={{backgroundImage: `url(/img/${card.image})`}}
            ></div>
            <div className="card-back"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;