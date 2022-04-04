import { Hand } from "../cards/Hand.js";

class User {
    constructor(formData,id) {
        this.id = id ;
        if( typeof formData === 'string')
            this.username = formData ; 
        else this.username = formData.get('username');
        this.victory = 0;
        this.hand = new Hand();
    }

    isValid() {
        return this.username;
    }

    receiveCard(card) {
        this.hand.addCard(card);
    }

    hadValidHand() {
        return this.hand.isValid();
    }

    resetHand(){
        this.hand = new Hand();
    }

}

export { User };