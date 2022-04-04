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

        let message = document.createElement('div');
        message.classList.add('message');
        message.append(this.message);

        let close = document.createElement('div');
        close.classList.add('close');
        let context = this;
        close.addEventListener('click', function() {
            context.delete();
        });

        close.innerHTML = 'X';

        displayMessage.append(
            message,
            close
        );

        this.displayMessage = displayMessage;
        return this.displayMessage;
    }

    delete() {
        this.displayMessage.remove();
    }
}

export { NotifyMessage };