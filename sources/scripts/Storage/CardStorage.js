
class CardStorage {

    static addCardToStorage(cardData) {

        const card = {
            suit : cardData.suit ,
            image : cardData.image ,
            code : cardData.code ,
            value : cardData.value
        }
        const storageLength = window.localStorage.length ;
        for(const data in card) {
            const storageIndex = data + "_" + storageLength ;
            window.localStorage.setItem(storageIndex, card[data]) ;
        }
    }

    static clearStorage() { window.localStorage.clear() } ;

    static retrieveCards() {
        const cards = [] ;
        const nbCardStored = window.localStorage.length / 4 ;
        for(let i = 0 ; i <= window.localStorage.length ; i + 4 ) {

        }
    }

}

export { CardStorage } ;