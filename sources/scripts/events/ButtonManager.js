import { Deck } from '../cards/Deck.js';

const DECK = document.getElementById('deck-container');
const DRAW_CANCEL = document.getElementById('action-stop');
const RESTART = document.getElementById('action-restart');

class ButtonManager {
    initGame(game) {
        DRAW_CANCEL.addEventListener('click', () => {
            game.endTurn(game.user);
        });

        DECK.addEventListener('click', () => {
            game.draw(game.user);
        });
        RESTART.addEventListener('click', () => {
            game.restart();
            RESTART.disabled = true;
        });
    };

    static desableButton() {
        document.getElementsByClassName('deck')[0].disabled = true ;
        DRAW_CANCEL.disabled = true ;
    };

    static enableButton() {
        document.getElementsByClassName('deck')[0].disabled = false ;
        DRAW_CANCEL.disabled = false ;
    };

    static enableButtonRestart() {
        RESTART.disabled = false;
    };

}

export { ButtonManager };