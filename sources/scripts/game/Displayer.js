import { SectionManager } from './SectionManager.js';
import { ButtonManager } from '../events/ButtonManager.js';
import { NetworkManager } from "../events/NetworkManager.js";
import { User } from '../user/User.js';
import { Card } from '../cards/Card.js';

const VICTORY_INDICATOR = document.getElementById('hand-victoryIndicator');
const HAND_CARD = document.getElementById('hand-container');
const USER_LIST_CONTAINER = document.getElementById("users-list") ;
const DECK_REVEAL = document.getElementById('deck-reveal');
const DECK_CONTAINER = document.getElementById('deck-container');



class Displayer {

    initGame(game) {
        const networkManager = new NetworkManager() ;
        networkManager.initNetworkDisplay();
        const buttonManager = new ButtonManager();

        SectionManager.openSection('gameSection');
        buttonManager.initGame(game);
        this.displayDeck(game.deck);
    }

    static displayUser(user,game = null) {

        const userDisplay = document.createElement("button") ;
        userDisplay.className = "cta dynamicButton glowHover"
        userDisplay.innerHTML = user.username ;
        
        
        userDisplay.addEventListener('click',function(){
            
            const oldUser = new User(user.username,user.id) ; 
            oldUser.victory = user.victory ; 

            for(const card of user.hand.cards) {
                oldUser.receiveCard(new Card(card)) ;
            }
            
            oldUser.hand.nbPoints = user.hand.nbPoints ;

            game.initGame(oldUser) ; 
        }) ;
        

        USER_LIST_CONTAINER.appendChild(userDisplay) ;
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

        Displayer.displayNbPoints(totalPoints);
    }

    static displayNbPoints(nbPoints) {
        document.getElementById('hand-nbPoints').innerHTML = nbPoints;
    }

    displayDeck(deck) {
        let nbCards = deck.nbCards;
        DECK_CONTAINER.innerHTML = '';

        for (let index = 0; index < nbCards; index++) {
            let cardInDeck = document.createElement('div');
            cardInDeck.classList.add('deckCard');

            DECK_CONTAINER.appendChild(cardInDeck);
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

    setVictory() {
        VICTORY_INDICATOR.classList.add('victory');
        HAND_CARD.classList.add('victoryContainer');
        

    }
    setDefeat() {
        VICTORY_INDICATOR.classList.add('invalid');
        HAND_CARD.classList.add('slide-out-blurred-top');
        
    }

    resetHandDisplay(){
        HAND_CARD.classList.remove('victoryContainer');
        HAND_CARD.classList.remove('slide-out-blurred-top');
        const hand = document.getElementById('hand-container');
        hand.querySelectorAll('li').forEach( n => n.remove() );
        document.getElementById("hand-nbPoints").innerText = 0;
        document.getElementById("hand-victoryIndicator").className = "valid";
    }



    revealCard(card) {
        // Add the image to card
        let cardImg = document.createElement('img');
        cardImg.classList.add('revealedCard', 'hidden');
        cardImg.src = card.images.png;
        
        let deckCards = document.querySelectorAll('#deck-container .deckCard');
        deckCards[0].append(cardImg);

        setTimeout(function() {
            cardImg.classList.remove('hidden');
        }, 50);
    }
}

export { Displayer };