import { Game } from './scripts/game/Game.js';
import { User } from './scripts/user/User.js';
import { NotifyCenter } from './scripts/events/NotifyCenter.js';
import {Displayer} from "./scripts/game/Displayer.js";

 document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();

    game.database.getAllUser().then(function (userList) {
        for(const user of  userList  ) {
            Displayer.displayUser(user);
        }
    }) ;

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