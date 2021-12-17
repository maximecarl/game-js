import { Displayer } from "../game/Displayer.js";

class Hand {
    constructor() {
        this.cards = [];
        this.nbPoints = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.nbPoints += card.gameValue;
        
        Displayer.displayCard(card, this.nbPoints);
    }

    isValid() {
        return this.nbPoints <= 21;
    }
}

export { Hand };