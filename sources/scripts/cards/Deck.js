class Deck {
    constructor() {
        this.buildDeck();
        this.isBusy = false;
        this.controller = new AbortController() ;

        this.enableDraw = true;
    }

    buildDeck() {
        return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                this.updateDeckData(data);
            }
        });
    }

    updateDeckData(data) {
        this.id = data.deck_id;
        this.nbCards = data.remaining;
        this.shuffled = data.shuffled;
    }

    async drawCard(nbToDraw = 1) {
        if (!this.isBusy && this.enableDraw) {
            this.controller = new AbortController() ;
            this.isBusy = true;
            return fetch(`https://deckofcardsapi.com/api/deck/${this.id}/draw/`, {
                method:"get",
                signal: this.controller.signal
            })
            .then(response => {
                this.nbCards -= nbToDraw;
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

    restartDeck(){
        return fetch(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle`)
        .then(response => {
            return response.json();
        });
    }

    cancelDraw() {
        this.controller.abort() ;
    }

    toggleDraw() {
        this.enableDraw = !this.enableDraw;
    }
}

export { Deck };