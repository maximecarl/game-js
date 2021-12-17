import { SectionManager } from './SectionManager.js';
import { ButtonManager } from '../events/ButtonManager.js';

class Displayer {
    initGame(game) {
        console.log(game);

        const buttonManager = new ButtonManager();

        SectionManager.openSection('gameSection');
        buttonManager.initGame(game);
    }

    static displayCard(card, totalPoints) {
        console.log(card);

        // Create the card display
        let cardDisplayed = document.createElement('li');
        cardDisplayed.classList.add('card');
        let positiveRotate = Math.random() * 1 > 0.5;
        let rotation = (positiveRotate ? 1 : -1) * (Math.random() * 3);
        cardDisplayed.style.transform = `rotate(${rotation}deg)`;

        // Add the image to card
        let cardImg = document.createElement('img');
        cardImg.src = card.images.png;
        cardDisplayed.appendChild(cardImg);

        // Display card in hand
        document.getElementById('hand-container').appendChild(cardDisplayed);

        document.getElementById('hand-nbPoints').innerHTML = totalPoints;
    }
}

export { Displayer };