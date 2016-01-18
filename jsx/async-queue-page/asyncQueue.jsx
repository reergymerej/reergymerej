// const getTicket = Symbol();
// const queueTicket = Symbol();
// const dequeueTicket = Symbol();
// const getTicketQueueIndex = Symbol();
// const getPreceedingTickets = Symbol();
// const closeTicket = Symbol();
// const queue = Symbol();

// TODO: use a hash so we can support multiple uses at a time
let _scope;
let originalFunction;
let reservations = [];

export default {

    // constructor(options) {
    //     let {
    //         queueFunctionName,
    //         scope,
    //         autoReserveFunctionNames = []
    //     } = options;

    //     this._makeAutoReserveFunctions(autoReserveFunctionNames, scope);


    //     // // TODO: Figure out how to do this without specifying scope if possible.
    //     // this[queue] = [];
    //     // this.functionName = functionName;
    //     // this.scope = scope;
    //     // this.original = this.scope[functionName];

    //     // // overwrite the function with our queue
    //     // this.scope[functionName] = (ticket) => {

    //     //     if (!(ticket instanceof Promise)) {
    //     //         // console.warn('`%s` is using AsyncQueue and should be passed a Promise.', this.functionName);
    //     //         ticket = Promise.all([ticket]).then(results => results[0]);
    //     //     }

    //     //     this[queueTicket](ticket);

    //     //     let preceedingTickets = this[getPreceedingTickets](ticket);

    //     //     return Promise.all(preceedingTickets)
    //     //         .then(() => {
    //     //             ticket.then(value => {
    //     //                 this.original.apply(this.scope, [value]);
    //     //             });
    //     //         });
    //     // }
    // }

    // _makeAutoReserveFunctions(functionNames, scope) {
    //     functionNames.forEach(functionName => {
    //         // TODO: remember these so we can undo it later if requested
    //         let originalFunction = scope[functionName];

    //         scope[functionName] = (...args) => {

    //             // TODO: make a reservation
    //             console.log('let\'s make a reservation for you');


    //             let thenable = originalFunction(...args);

    //             if (!(thenable instanceof Promise)) {
    //                 thenable = Promise.all([thenable]).then(results => results[0]);
    //             }

    //             let removeReservation = () => {
    //                 console.log('remove reservation');
    //             };

    //             thenable.then(removeReservation, removeReservation);
    //         };
    //     });
    // }

    // /**
    // * Adds to the queue.
    // * @param {Function} preRedeem - passed a ticket that
    // * can be redeemed, leading to executing the client
    // */
    // push(preRedeem) {
    //     if (!(preRedeem instanceof Promise)) {
    //         throw 'AsyncQueue.push requires a Promise';
    //     }

    //     let ticket = this[getTicket]();

    //     let trashTicketIfNotRedeemed = () => {
    //         if (!ticket.isRedeemed) {
    //             ticket.trash();
    //         }
    //     };

    //     // Throw the ticket away if the preRedeem forgot to redeem it.
    //     Promise.all([preRedeem(ticket)]).then(
    //         trashTicketIfNotRedeemed,
    //         trashTicketIfNotRedeemed
    //     );
    // }

    // [getTicket]() {
    //     let resolveTicket;
    //     let ticket = new Promise(resolve => resolveTicket = resolve);

    //     ticket.resolve = () => {
    //         resolveTicket();
    //     };

    //     ticket.redeem = (...args) => {
    //         if (ticket.isTrashed) {
    //             console.warn('You redeemed the ticket after your `push` function resolved.  Did you mean to return a Promise?  Your call was moved to the end of the queue.');
    //         } else {
    //             ticket.isRedeemed = true;
    //         }

    //         let preceedingTickets = this[getPreceedingTickets](ticket);

    //         return Promise.all(preceedingTickets)
    //             .then(() => {
    //                 this[closeTicket](ticket);
    //                 return this.client.apply(this.scope, args);
    //             });
    //     };

    //     ticket.trash = () => {
    //         ticket.isTrashed = true;
    //         this[closeTicket](ticket);
    //     };

    //     this[queueTicket](ticket);

    //     return ticket;
    // }

    // [queueTicket](ticket) {
    //     this[queue].push(ticket);
    // }

    // [dequeueTicket](ticket) {
    //     let ticketIndex = this[getTicketQueueIndex](ticket);
    //     if (ticketIndex > -1) {
    //         this[queue].splice(ticketIndex, 1);
    //     }
    // }

    // [getTicketQueueIndex](ticket) {
    //     return this[queue].indexOf(ticket);
    // }

    // [getPreceedingTickets](ticket) {
    //     let index = this[getTicketQueueIndex](ticket);
    //     // If this ticket is not in the queue, everything preceeds it.
    //     let length = index > -1 ? index : undefined;
    //     return this[queue].slice(0, length);
    // }

    // [closeTicket](ticket) {
    //     this[dequeueTicket](ticket);
    //     ticket.resolve();
    // }

    use(options) {
        let {
            queuedFunctionName,
            scope,
            autoReservingFunctionNames = [],
        } = options;

        // _scope = scope;
        // originalFunction = scope[queuedFunctionName];
        // console.log(autoReservingFunctionNames, 'should auto-reserve a spot for', queuedFunctionName);

        this._createQueueForFunction(scope, queuedFunctionName);
        this._createAutoReservingFunctions(scope, autoReservingFunctionNames);
    },

    _replaceFunction(scope, functionName, replacementFunction) {
        // TODO: remember original so we can restore it if asked
        scope[functionName] = replacementFunction;
    },

    _createQueueForFunction(scope, queuedFunctionName) {
        this._replaceFunction(scope, queuedFunctionName, (...args) => {
            console.log('`%s` called with', queuedFunctionName, ...args);

            console.log()
        });
    },

    _createAutoReservingFunctions(scope, autoReservingFunctionNames) {
        autoReservingFunctionNames.forEach(functionName => {
            let original = scope[functionName].bind(scope);

            this._replaceFunction(scope, functionName, (...args) => {
                console.log('create a reservation for `%s`', functionName);
                this._makeReservation(original(...args));
            });
        });
    },

    _makeReservation(expression) {
        let thenable = this._makeThenable(expression);
        reservations.push(thenable);
    },

    _makeThenable(expression) {
        return Promise.all([expression]).then(results => {
            return results[0];
        });
    },
}
