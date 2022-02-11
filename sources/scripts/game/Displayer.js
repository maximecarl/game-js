import { SectionManager } from './SectionManager.js';
import { ButtonManager } from '../events/ButtonManager.js';
import { NetworkManager } from "../events/NetworkManager.js";

class Displayer {
    initGame(game) {
        const networkManager = new NetworkManager() ;
        networkManager.initNetworkDisplay();
        const buttonManager = new ButtonManager();

        SectionManager.openSection('gameSection');
        buttonManager.initGame(game);
        this.displayDeck(game.deck);
    }

    static displayCard(card, totalPoints) {
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
        deckContainer.innerHTML = '';

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

    resetHandDisplay(){
        const hand = document.getElementById('hand-container');
        hand.querySelectorAll('li').forEach( n => n.remove() );
        document.getElementById("hand-nbPoints").innerText = 0;
        document.getElementById("hand-victoryIndicator").className = "valid";

    }


}

export { Displayer };