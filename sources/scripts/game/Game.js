import { Deck } from '../cards/Deck.js';
import { Card } from '../cards/Card.js';
import { Displayer } from './Displayer.js';
import { GameMaster } from '../user/GameMaster.js';
import { NotifyCenter } from '../events/NotifyCenter.js';

class Game {
    constructor() {
        this.user = null;
        this.deck = new Deck();
        this.gameMaster = new GameMaster();
        this.displayer = new Displayer();
        this.terminated = false;
        this.notifyCenter = new NotifyCenter();
    }

    initGame(user) {
        if (user.isValid()) {
            this.user = user;
            
            this.deck.buildDeck()
            .then(() => {
                this.displayer.initGame(this);
            });
        }
    }

    draw(nbToDraw = 1) {
        if (!this.terminated) {
            this.deck.drawCard(nbToDraw)
            .then(data => {
                if (data.success) {
                    for (const cardData in data.cards) {
                        const card = new Card(data.cards[cardData]);
                        this.user.receiveCard(card);
                        this.displayer.removeDeckCards(this.deck.nbCards, nbToDraw);
                    }
                    this.terminated = this.isTerminated();
                }
            });
        }
    }

    isTerminated() {
        if (!this.user.hadValidHand()) {
            this.setDefeat();
            return true;
        } else if (this.user.hand.nbPoints === 21) {
            this.setVictory();
            return true;
        }

        return false;
    }

    endTurn() {
        // Check by security, not mandatory
        this.terminated = this.isTerminated();
        
        if (!this.terminated){
            this.terminated = true;

            this.deck.drawCard()
            .then(data => {
                if (data.success) {
                    for (const cardData in data.cards) {
                        const card = new Card(data.cards[cardData]);
                        this.gameMaster.receiveCard(card);

                        console.log(card);

                        let totalPoints = card.gameValue + this.user.hand.nbPoints;
                        if (totalPoints > 21) {
                            this.setVictory();
                        }else {
                            this.setDefeat();
                        }
                    }
                }
            });
        }
    }

    setVictory() {
        let victoryMessage = document.createTextNode('Victoire !');
        this.notifyCenter.notify(
            victoryMessage, 
            'success'
        );
        this.user.victory ++;
    }

    setDefeat() {
        let defeatMessage = document.createTextNode('Défaite...');
        this.notifyCenter.notify(
            defeatMessage,
            'error'
        );
        this.displayer.setDefeat();
    }
}

export { Game };