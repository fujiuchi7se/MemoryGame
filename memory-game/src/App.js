import React, { useState } from 'react';
import './App.css';

const App = () => 
{
  // カードの表の画像
  const images = 
  [
    'card_spade_01.png', 'card_spade_01.png', 'card_spade_02.png', 'card_spade_02.png',
    'card_spade_03.png', 'card_spade_03.png', 'card_spade_04.png', 'card_spade_04.png',
    'card_spade_05.png', 'card_spade_05.png', 'card_spade_06.png', 'card_spade_06.png',
    'card_spade_07.png', 'card_spade_07.png', 'card_spade_08.png', 'card_spade_08.png',
  ];
  
  // シャッフルされたカードの配列を生成する関数
  // mapで配列imagesの要素imageに，状態を表す変数を追加
  //    isFlipped: カードが表向きかどうか
  //    isMatched: カードがマッチしたかどうか
  // sortで配列の要素をシャッフル
  //    Fisher–Yatesの方が偏りが少なくてオーダーも小さいらしい
  //    今回はsortで簡略化
  const shuffleCards = () => 
  {
    return images
      .map((image) => ({ image, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  };

  // stateで状態を管理
  //    gameState   : ゲームの状態．start，playing，clearedの３つ．
  //    cards       : カードの状態．初期値はsuffleCards()
  //    flippedCards: 裏返されたカードの状態．マッチングの判定に使用．初期値は空の配列．
  const [gameState, setGameState] = useState("start");
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);

  // ゲーム開始時の初期化
  const startGame = () => 
  {
    setGameState("playing");
    setCards(shuffleCards());
    setFlippedCards([]);
  };

  // カードをクリックしたときの処理
  const clickCard = (index) => 
  {
    // カードがクリック不可能な時に処理を中断する
    // １．そのカードが既に裏返されている
    // ２．全体で合計２枚のカードが裏返されている
    // ３．ゲーム中である
    if (cards[index].isFlipped || flippedCards.length === 2 || gameState !== "playing") return;

    // cardsの変数を操作するために，コピーを生成
    // カードがクリックされたのでisFlippedをtrueにする
    // cardsに状態を反映
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    // 裏返されている（表の状態の）カードのインデックスを保持する配列を生成
    // flippedCardsに状態を反映
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // カードが２枚裏返された時の処理
    if (newFlippedCards.length === 2) 
    {
      // 裏返されたカードのインデックスを取得
      const [firstIndex, secondIndex] = newFlippedCards;

      // 裏返したカードが一致した時の処理
      if (newCards[firstIndex].image === newCards[secondIndex].image) 
      {
        setTimeout(() => 
        {
          // isMatchedをtrueにする
          // cards，flippedCardsに状態を反映
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setCards(newCards);
          setFlippedCards([]);

          // 全てのカードのisMatchedがtrueであれば，ゲームクリア
          if (newCards.every(card => card.isMatched)) setGameState("cleared");
        }, 500);
      } else 
      {
        // 裏返したカードが一致していない時の処理
        setTimeout(() => 
        {
          // isFlippedをfalseにする
          // cards，flippedCardsに状態を反映
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 500);
      }
    }
  };

  // ゲームをリスタートする時の処理
  // すべての状態を初期化
  const restartGame = () => 
  {
    setGameState("playing");
    setCards(shuffleCards());
    setFlippedCards([]);
  };

  // ブラウザに表示される部分
  // ゲームクリア時とゲーム中の表示
  return (
    <div className="game-container">
      {
        gameState === "start" && 
        (
          <div className="start-container">
            <button onClick={startGame} className="start-button">Start Game</button>
          </div>
        )
      }
      {
        gameState === "playing" && 
        (
          <div className="card-grid">
            {
              cards.map((card, index) => 
              (
                <div
                  key={index}
                  className={`card ${card.isFlipped ? 'flipped' : ''}`}
                  onClick={() => clickCard(index)}
                  style={{ visibility: card.isMatched ? 'hidden' : 'visible' }}
                >
                  <div className="card-inner">
                    <div className="card-front" style={{ backgroundImage: `url(../img/${card.image})`}}></div>
                    <div className="card-back"></div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        gameState === "cleared" && 
        (
          <div className="clear-container">
            <div className="clear-message">CLEAR!!</div>
            <button onClick={restartGame} className="restart-button">Play again</button>
          </div>
        )
      }
    </div>
  );
};

export default App;