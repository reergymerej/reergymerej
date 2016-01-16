const getTicket = Symbol();
const queueTicket = Symbol();
const dequeueTicket = Symbol();
const getTicketQueueIndex = Symbol();
const getPreceedingTickets = Symbol();
const closeTicket = Symbol();
const queue = Symbol();

export default class AsyncQueue {
    /**
    * @param {Function} client - the function that this queue will feed into
    * @param {Object} scope - the scope to execute client in
    */
    constructor(client, scope) {
        // TODO: Figure out how to do this without specifying scope if possible.
        this.client = client;
        this.scope = scope;
        this[queue] = [];
    }

    /**
    * Adds to the queue.
    * @param {Function} preRedeem - passed a ticket that
    * can be redeemed, leading to executing the client
    */
    push(preRedeem) {
        let ticket = this[getTicket]();

        let trashTicketIfNotRedeemed = () => {
            if (!ticket.isRedeemed) {
                ticket.trash();
            }
        };

        // Throw the ticket away if the preRedeem forgot to redeem it.
        Promise.all([preRedeem(ticket)]).then(
            trashTicketIfNotRedeemed,
            trashTicketIfNotRedeemed
        );
    }

    [getTicket]() {
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

            let preceedingTickets = this[getPreceedingTickets](ticket);

            return Promise.all(preceedingTickets)
                .then(() => {
                    this[closeTicket](ticket);
                    return this.client.apply(this.scope, args);
                });
        };

        ticket.trash = () => {
            ticket.isTrashed = true;
            this[closeTicket](ticket);
        };

        this[queueTicket](ticket);

        return ticket;
    }

    [queueTicket](ticket) {
        this[queue].push(ticket);
    }

    [dequeueTicket](ticket) {
        let ticketIndex = this[getTicketQueueIndex](ticket);
        if (ticketIndex > -1) {
            this[queue].splice(ticketIndex, 1);
        }
    }

    [getTicketQueueIndex](ticket) {
        return this[queue].indexOf(ticket);
    }

    [getPreceedingTickets](ticket) {
        let index = this[getTicketQueueIndex](ticket);
        // If this ticket is not in the queue, everything preceeds it.
        let length = index > -1 ? index : undefined;
        return this[queue].slice(0, length);
    }

    [closeTicket](ticket) {
        this[dequeueTicket](ticket);
        ticket.resolve();
    }
}
