import React, { Component } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      deck: null,
      drawn: [] 
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({ deck : deck.data });
  }

  async getCard() {
    const deckId = this.state.deck.deck_id;

    try {
      // Make request using deck id
      let cardRes = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);

      if (!cardRes.data.success) {
        throw new Error("No cards remaining");
      }
      // Set state using new card info from api
      let card = cardRes.data.cards[0];
      this.setState( st => ({
        drawn: [
          ...st.drawn, //st pertains to the old state
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }))
    } catch (err) {
      alert(err);
    }
    
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
      </div>
    )
  }
}
