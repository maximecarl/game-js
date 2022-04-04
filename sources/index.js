import { Game } from './scripts/game/Game.js';
import { User } from './scripts/user/User.js';
import { NotifyCenter } from './scripts/events/NotifyCenter.js';
import {Displayer} from "./scripts/game/Displayer.js";
import {Card} from "./scripts/cards/Card.js";
let id = 0 ;
let rulesHtml = document.createElement('div');
rulesHtml.innerHTML = `<h2>Règles du jeu :</h2>
    <ul>
        <li>Piocher des cartes en cliquant sur le deck pour obtenir 21 points.</li>
        <li>Si vous obtenez 21 points, c'est gagné.</li>
        <li>Si vous dépassez 21 points, c'est perdu.</li>
        <li>A tout moment, vous pouvez décider de vous arrêter en cliquant sur "Stop", une carte se dévoile :
        <ul>
            <li>Si elle vous faisait dépasser 21 points, vous avez gagné parce que vous avez su vous arrêter à temps</li>
            <li>Si la carte ne vous faisait pas dépasser 21 points, c'est perdu.</li>
        </ul>
        </li>
    </ul>`;

 document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();
    let notifyCenter = new NotifyCenter();
    document.getElementById('displayRules').addEventListener('click', function() {
        notifyCenter.notify(rulesHtml, 'success');
    });

    game.database.getAllUser().then(function (userList) {
        for(const user of  userList  ) {
            Displayer.displayUser(user,game);
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