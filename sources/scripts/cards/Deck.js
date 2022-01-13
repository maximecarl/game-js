class Deck {
    constructor() {
        this.buildDeck();
        this.isBusy = false;
        this.controller = new AbortController() ;
    }

    buildDeck() {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
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

    async drawCard() {
        if (!this.isBusy) {
            this.controller = new AbortController() ;
            this.isBusy = true;
            return fetch(`https://deckofcardsapi.com/api/deck/${this.id}/draw/`, {
                method:"get",
                signal: this.controller.signal
            })
            .then(response => {
                return response.json();
            }).finally(() => {
                this.isBusy = false;
            });
        }
    }

    reshuffle(){
        return fetch(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle/?remaining=true`)
        .then(response => {
            return response.json();
        });
    }

    cancelDraw() {
        this.controller.abort() ;
    }
}

export { Deck };