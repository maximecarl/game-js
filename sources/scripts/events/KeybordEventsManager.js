import { Game } from "../game/Game.js" ;
import {NotifyCenter} from "./NotifyCenter.js";

class KeyboardEventsManager {

    static cancelDrawEvent(deck,notifyCenter) {
        addEventListener('keydown',function (event){
            if(event.key === "c") {
                if(deck.isBusy) {
                    deck.cancelDraw();
                    notifyCenter.notify(
                        document.createTextNode('Draw canceled'),
                        'error'
                    );

                }
            }
        });
    }
    static drawEvent(game) {
        addEventListener('keydown',function (even){
            if(even.key === "d") {
                game.draw(game.user) ;
            }
        })
    }

} export { KeyboardEventsManager }