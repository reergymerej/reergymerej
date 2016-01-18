/**
* This wraps a function so that anything that calls it waits for reservations
* to finish before executing.
*/

// like Promise.all, but doesn't return values or fail
const afterPromises = (promises) => {
    let remainingCount = promises.length;
    let _resolve;
    let settle = () => {
        if (!--remainingCount) {
            _resolve();
        }
    };

    return new Promise(resolve => {
        _resolve = resolve;

        if (promises.length) {
            promises.forEach(promise => {
                promise.then(settle, settle);
            });
        } else {
            resolve();
        }
    });
};

export default {
    /**
    * wraps function so it starts using reservations
    * @param {Object} options.scope
    * @param {String} options.name
    * @example functionQueuer.wrap({ scope: console, name: 'log' })
    */
    wrap(options) {
        const { scope, name } = options;

        const reservations = [];

        const queuedFunction = (...args) => {
            return afterPromises(reservations)
                // call the original
                .then(() => queuedFunction.original.apply(scope, args));
        };

        const removeReservation = (promise) => {
            let index = reservations.indexOf(promise);
            if (index > -1) {
                reservations.splice(index, 1);
            }
            return reservations.length;
        };

        /**
        * adds a reservation for the wrapped function
        * @param {Promise}
        * @return {Number} length of reservations
        */
        queuedFunction.reserve = (promise) => {

            // When reservation is done, remove it.
            const clear = (result) => {
                removeReservation(promise);

                // Relay the reservation result in case someone else
                // in the chain wants it.
                return result;
            };

            promise.then(clear, clear);

            return reservations.push(promise);
        };

        queuedFunction.original = scope[name];

        scope[name] = queuedFunction;
    },

    /**
    * restores original function
    * @param {Object} options.scope
    * @param {String} options.name
    * @example functionQueuer.unwrap({ scope: console, name: 'log' })
    */
    unwrap(options) {
        const { scope, name } = options;
        scope[name] = scope[name].original;
    },
}
