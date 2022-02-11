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
        addEventListener('keydown',function (event){
            if(event.key === "d") {
                game.draw() ;
            }
        })
    }
    
    static restartEvent(game) {
        addEventListener('keydown',function (event){
            if(event.key === "r") {
                game.restart() ;
            }
        })
    }

} export { KeyboardEventsManager }