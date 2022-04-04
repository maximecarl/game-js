import { Game } from './scripts/game/Game.js';
import { User } from './scripts/user/User.js';
import { NotifyCenter } from './scripts/events/NotifyCenter.js';
import {Displayer} from "./scripts/game/Displayer.js";
import {Card} from "./scripts/cards/Card.js";
let id = 0 ;
 document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();

    game.database.getAllUser().then(function (userList) {
        for(const user of  userList  ) {
            Displayer.displayUser(user);
            id++ ;
        }
    }) ;

    document.getElementById('loginUser').addEventListener('submit', e => {
        e.preventDefault();

        game.database.getAllUser().then(function (users) {
            if(game.database.isUserExist(users,{username: new FormData(e.target).get("username")})) {
                game.database.getUser({username: new FormData(e.target).get("username")}).then(
                    function (user) {
                        const u = new User(new FormData(e.target), user.id) ;
                        u.victory = user.victory ;
                        for(const card of user.hand.cards) {
                            u.receiveCard(new Card(card)) ;
                        }
                        u.hand.nbPoints = user.hand.nbPoints ;
                        game.initGame(u) ;
                    }) ;
            } else {
                // Create user
                const user = new User(
                    new FormData(e.target),
                    id
                );

                // Create game
                game.initGame(user);
            }
        }) ;

    });
});