import { Deck } from '../cards/Deck.js';

const DECK = document.getElementById('deck-container');
const DRAW_CANCEL = document.getElementById('action-stop');

class ButtonManager {
    initGame(game) {
        DRAW_CANCEL.addEventListener('click', () => {
            game.endTurn(game.user);
        });

        DECK.addEventListener('click', () => {
            game.deck.drawCard(game.user);
        });
    }
}

export { ButtonManager };