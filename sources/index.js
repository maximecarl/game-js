import { Game } from './scripts/game/Game.js';
import { User } from './scripts/user/User.js';

document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();

    document.getElementById('loginUser').addEventListener('submit', e => {
        e.preventDefault();
        // Create user
        const user = new User(
            new FormData(e.target)
        );
    
        // Create game
        game.initGame(user);
    });
});