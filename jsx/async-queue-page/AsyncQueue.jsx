export default class AsyncQueue {
    /**
    * @param {Function} client - the function that this queue will feed into
    * @param {Object} scope - the scope to execute client in
    */
    constructor(client, scope) {
        // TODO: Figure out how to do this without specifying scope if possible.
        // TODO: use symbols to make these private
        this.client = client;
        this.scope = scope;
        this._queue = [];
    }

    /**
    * Adds to the queue.
    * @param {Function} beforeClient - passed a ticket that
    * can be redeemed, leading to executing the client
    */
    push(beforeClient) {
        let ticket = this._getTicket();

        let trashTicketIfNotRedeemed = () => {
            if (!ticket.isRedeemed) {
                ticket.trash();
            }
        };

        // Throw the ticket away if the beforeClient forgot to redeem it.
        Promise.all([beforeClient(ticket)]).then(
            trashTicketIfNotRedeemed,
            trashTicketIfNotRedeemed
        );
    }

    _getTicket() {
        let resolveTicket;
        let ticket = new Promise(resolve => resolveTicket = resolve);

        ticket.resolve = () => {
            resolveTicket();
        };

        ticket.redeem = (...args) => {
            if (ticket.isTrashed) {
                console.warn('You redeemed the ticket after your `push` function resolved.  Did you mean to return a Promise?  Your call was moved to the end of the queue.');
            } else {
                ticket.isRedeemed = true;
            }

            let preceedingTickets = this._getPreceedingTickets(ticket);

            return Promise.all(preceedingTickets)
                .then(() => {
                    this._closeTicket(ticket);
                    return this.client.apply(this.scope, args);
                });
        };

        ticket.trash = () => {
            ticket.isTrashed = true;
            this._closeTicket(ticket);
        };

        this._queueTicket(ticket);

        return ticket;
    }

    _queueTicket(ticket) {
        this._queue.push(ticket);
    }

    _dequeueTicket(ticket) {
        let ticketIndex = this._getTicketQueueIndex(ticket);
        if (ticketIndex > -1) {
            this._queue.splice(ticketIndex, 1);
        }
    }

    _getTicketQueueIndex(ticket) {
        return this._queue.indexOf(ticket);
    }

    _getPreceedingTickets(ticket) {
        let index = this._getTicketQueueIndex(ticket);
        // If this ticket is not in the queue, everything preceeds it.
        let length = index > -1 ? index : undefined;
        return this._queue.slice(0, length);
    }

    _closeTicket(ticket) {
        this._dequeueTicket(ticket);
        ticket.resolve();
    }
}
