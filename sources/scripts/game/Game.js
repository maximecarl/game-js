import { Deck } from '../cards/Deck.js';
import { Displayer } from './Displayer.js';
import { GameMaster } from '../user/GameMaster.js';

class Game {
    constructor() {
        this.user = null;
        this.deck = null;
        this.gameMaster = new GameMaster();

        this.initDeck();
    }

    initGame(user) {
        if (user.isValid()) {
            this.user = user;
    
            const displayer = new Displayer();
            
            // Check if deck is builded
            const deckBuildInterval = setInterval(() => {
                if (this.deck.id) {
    
                    // Set the interface
                    displayer.initGame(this);
    
                    clearInterval(deckBuildInterval);
                }
            }, 200);
        }
    }

    initDeck() {
        this.deck = new Deck();
    }

    endTurn() {
        console.log('Stop turn');

    }
}

export { Game };