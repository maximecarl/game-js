class NotifyMessage {
    constructor(id, message, status) {
        this.id = id;
        this.message = message;
        this.status = status;
    }

    display() {
        let displayMessage = document.createElement('div');
        displayMessage.id = this.id;
        displayMessage.classList.add('notification');
        displayMessage.classList.add(this.status);
        displayMessage.appendChild(this.message);

        this.displayMessage = displayMessage;
        return this.displayMessage;
    }

    delete() {
        this.displayMessage.remove();
    }
}

export { NotifyMessage };