class Deck {
    constructor() {
        this.buildDeck();
        this.isBusy = false;
    }

    buildDeck() {
        return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                this.id = data.deck_id;
                this.nbCards = data.remaining;
                this.shuffled = data.shuffled;
            }
        });
    }

    async drawCard(nbToDraw = 1) {
        if (!this.isBusy) {
            this.isBusy = true;
            return fetch(`https://deckofcardsapi.com/api/deck/${this.id}/draw/`)
            .then(response => {
                this.nbCards -= nbToDraw;
                return response.json();
            }).finally(() => {
                this.isBusy = false;
            });
        }
    }
}

export { Deck };