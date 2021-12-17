class GameMaster {
    constructor() {
        this.card = null;
    }

    receiveCard(card) {
        this.card = card;
    }
}

export { GameMaster };