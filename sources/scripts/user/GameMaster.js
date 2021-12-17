import { Hand } from "../cards/Hand.js";

class GameMaster {
    constructor() {
        this.hand = new Hand;
    }

    receiveCard(card) {
        this.card = card;
    }
}

export { GameMaster };