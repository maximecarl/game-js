import { SectionManager } from './SectionManager.js';
import { ButtonManager } from '../events/ButtonManager.js';

class Displayer {
    initGame(game) {
        const buttonManager = new ButtonManager();

        SectionManager.openSection('gameSection');
        buttonManager.initGame(game);
        this.displayDeck(game.deck);
    }

    static displayCard(card, totalPoints) {
        console.log(card);

        // Create the card display
        let cardDisplayed = document.createElement('li');
        cardDisplayed.classList.add('card');
        let positiveRotate = Math.random() * 1 > 0.5;
        let rotation = (positiveRotate ? 1 : -1) * (Math.random() * 3);
        cardDisplayed.style.transform = `rotate(${rotation}deg)`;

        // Add the image to card
        let cardImg = document.createElement('img');
        cardImg.src = card.images.png;
        cardDisplayed.appendChild(cardImg);

        // Display card in hand
        document.getElementById('hand-container').appendChild(cardDisplayed);

        document.getElementById('hand-nbPoints').innerHTML = totalPoints;
    }

    displayDeck(deck) {
        let nbCards = deck.nbCards;
        let deckContainer = document.getElementById('deck-container');

        for (let index = 0; index < nbCards; index++) {
            let cardInDeck = document.createElement('div');
            cardInDeck.classList.add('deckCard');

            deckContainer.appendChild(cardInDeck);
        }

        this.displayDeckCardIndicator(deck.nbCards);
    }

    displayDeckCardIndicator(nbCards) {
        let deckCardIndicator = document.getElementById('deck-cardIndicator');
        deckCardIndicator.innerHTML = nbCards;
    }

    removeDeckCards(nbDeckCards, nbCardsToRemove = 1) {
        let deckCards = document.querySelectorAll('#deck-container .deckCard');
        for (let index = 0; index < nbCardsToRemove; index++) {
            deckCards[index].remove();
        }
        this.displayDeckCardIndicator(nbDeckCards);
    }

    setDefeat() {
        document.getElementById('hand-victoryIndicator').classList.add('invalid');
    }
}

export { Displayer };