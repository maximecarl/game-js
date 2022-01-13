import { NotifyMessage } from "./NotifyMessage.js";

class NotifyCenter {
    constructor() {
        const body = document.querySelector('body');

        let notifyContainer = document.querySelector('#notifyCenter');

        if (!notifyContainer) {
            notifyContainer = document.createElement('div');
            notifyContainer.id = 'notifyCenter';
        }

        body.insertBefore(notifyContainer, body.childNodes[0]);
        this.container = notifyContainer;
        this.nbNotify = 0;
    }

    notify(message, status) {
        let newMessage = new NotifyMessage(
            'notification_' + this.nbNotify ++,
            message, 
            status
        );

        this.container.appendChild(newMessage.display());
        setTimeout(() => {
            newMessage.delete();
        }, 5000);
    }
}

export { NotifyCenter };