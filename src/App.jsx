import React, { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: "first card" },
    { id: 2, order: 2, text: "second card" },
    { id: 3, order: 1, text: "third card" },
    { id: 4, order: 4, text: "fourth card" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    setCurrentCard(card);
  };

  const dragLeaveHandler = (e) => {
    e.target.style.background = "white";
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "white";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dropHandler = (e, card) => {
    e.preventDefault();

    const updatedCardList = cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order };
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order };
      }
      return c;
    });
    e.target.style.background = "white";
    setCardList(updatedCardList);
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className='app'>
      {cardList.sort(sortCards).map((card) =>
        <div
          key={card.id}
          draggable='true'
          className={'card'}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      )}
    </div>
  );
}

export default App;