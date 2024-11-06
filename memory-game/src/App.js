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
    return images
      .map((image) => ({ image, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [isCleared, setIsCleared] = useState(false);

  // カードをクリックしたときの処理
  const handleCardClick = (index) => {
    if (cards[index].isFlipped || flippedCards.length === 2 || isCleared) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlippedCards = [...flippedCards, index];
    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (newCards[firstIndex].image === newCards[secondIndex].image) {
        setTimeout(() => {
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setCards(newCards);
          setFlippedCards([]);

          // 全てのカードが一致しているか確認してクリア表示
          if (newCards.every(card => card.isMatched)) {
            setIsCleared(true);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setIsCleared(false);
  };

  return (
    <div className="game-container">
      {isCleared ? (
        <div className="clear-container">
          <div className="clear-message">CLEAR!!</div>
          <button onClick={handleRestart} className="restart-button">Play again</button>
        </div>
      ) : (
        <div className="card-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${card.isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ visibility: card.isMatched ? 'hidden' : 'visible' }}
            >
              <div className="card-inner">
                <div className="card-front" style={{ backgroundImage: `url(../img/${card.image})`}}></div>
                <div className="card-back"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;