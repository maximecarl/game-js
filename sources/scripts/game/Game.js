import { Deck } from '../cards/Deck.js';
import { Card } from '../cards/Card.js';
import { Displayer } from './Displayer.js';
import { GameMaster } from '../user/GameMaster.js';
import { NotifyCenter } from '../events/NotifyCenter.js';
import {VibrationManager} from "../events/VibrationManager.js";
import {KeyboardEventsManager} from "../events/KeybordEventsManager.js";
import {ButtonManager} from "../events/ButtonManager.js";
import {Database} from "../Storage/Database.js";

class Game {
    constructor() {
        this.user = null;
        this.deck = new Deck();
        this.gameMaster = new GameMaster();
        this.displayer = new Displayer();
        this.terminated = false;
        this.notifyCenter = new NotifyCenter();
        this.vibrate = new VibrationManager();
        this.database = new Database() ;
    }

    async initGame(user) {
        if (user.isValid()) {
            this.user = user;
            await this.database.saveUser(user) ;
            await this.deck.buildDeck() ;
            this.displayer.initGame(this);
            KeyboardEventsManager.cancelDrawEvent(this.deck,this.notifyCenter) ;
            KeyboardEventsManager.drawEvent(this) ;
            KeyboardEventsManager.restartEvent(this) ;
        }
    }

   async draw(nbToDraw = 1) {
        if (!this.terminated) {
            ButtonManager.enableButtonRestart();
            ButtonManager.enableButton();
            let drawPromise = this.deck.drawCard(nbToDraw);

            if (drawPromise instanceof Promise) {
                drawPromise.then(data => {
                    if (data && data.success) {
                        for (const cardData in data.cards) {
                            const card = new Card(data.cards[cardData]);
                            this.user.receiveCard(card);
                            this.database.saveUser(this.user).then(function (){
                                console.log("user updated") ;
                            }) ;
                            this.displayer.removeDeckCards(this.deck.nbCards, nbToDraw);
                        }
                        this.terminated = this.isTerminated();
                    }
                });
            }
        }
    }

    restart(){
        if (this.user.hand.cards.length > 0) {
            if (this.deck.nbCards > 25) {
                this.deck.reshuffle()
                .then(data => {
                    if (data.success) {
                        this.restartWithData(data);
                    }
                });
            } else {
                this.deck.restartDeck()
                .then(data => {
                    if (data.success) {
                        this.restartWithData(data);
                        this.displayer.displayDeck(this.deck);
                    }
                });
            }
        }
    }
    restartWithData(data) {
        this.deck.updateDeckData(data);
        this.displayer.displayDeck(this.deck);
        ButtonManager.disableButton();
        this.user.resetHand();
        this.displayer.resetHandDisplay();
        this.terminated=false;
    }

    isTerminated() {
        if (!this.user.hadValidHand()) {
            ButtonManager.disableButton();
            this.setDefeat();
            return true;
        } else if (this.user.hand.nbPoints === 21) {
            ButtonManager.disableButton();
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
            ButtonManager.disableButton();
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

    async setVictory() {
        let victoryMessage = document.createTextNode('Victoire !');
        this.notifyCenter.notify(
            victoryMessage, 
            'success'
        );
        this.vibrate.createVibration([100,10,100]) ;
        this.user.victory ++;
        this.displayer.setVictory();
        await this.database.saveUser(this.user) ;
    }

    setDefeat() {
        let defeatMessage = document.createTextNode('Défaite...');
        this.notifyCenter.notify(
            defeatMessage,
            'error'
        );
        this.vibrate.createVibration(100);
        this.displayer.setDefeat();
    }


}

export { Game };