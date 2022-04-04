class Card {
    constructor(cardData) {
        this.code = cardData.code;
        this.suit = cardData.suit;
        this.value = cardData.value;
        this.images = cardData.images;

        this.gameValue = this.calculateGameValue(cardData.value);
    }

    calculateGameValue(value) {
        let tempValue = parseInt(value);

        if (!isNaN(tempValue)) {
            return tempValue;
        } else if (value === 'ACE') {
            return 0;
        } else {
            return 10;
        }
    }
}

export { Card };