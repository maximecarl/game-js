import { Card } from "./Card.js";

class Deck {
    constructor() {
        this.buildDeck();
    }

    buildDeck() {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                this.id = data.deck_id;
                this.nbCards = data.remaining;
                this.shuffled = data.shuffled;
            }
        })
    }

    drawCard(object) {
        fetch(`https://deckofcardsapi.com/api/deck/${this.id}/draw/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                for (const cardData in data.cards) {
                    const card = new Card(data.cards[cardData]);
                    object.receiveCard(card);
                }
            }
        });
    }
}

export { Deck };