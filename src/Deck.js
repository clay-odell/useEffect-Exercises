import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  useEffect(function getDeck() {
    async function fetchDeck() {
      const deck = await axios.get(`${API_BASE_URL}/new/`);
      setDeck(deck.data);
    }
    fetchDeck();
  }, []);

  async function draw() {
    try {
      const drawResult = await axios.get(
        `${API_BASE_URL}/${deck.deck_id}/draw`
      );

      if (drawResult.data.remaining === 0) throw new Error("Deck is empty!");

      const card = drawResult.data.cards[0];
      setDrawn((prevDrawn) => [
        ...prevDrawn,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
      console.log(card);
    } catch (error) {
      alert(error);
    }
  }
  function drawBtn() {
    if (!deck) return null;
    return (
      <button className="draw-btn" onClick={draw}>
        DRAW CARD
      </button>
    );
  }

  return (
    <main className="Deck">
      {drawBtn()}

      <div className="drawn-card">
        {drawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
