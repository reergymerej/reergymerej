/**
* This wraps a function so that anything that calls it waits for reservations
* to finish before executing.
*/

export default {
    wrap(options) {
        const { scope, name } = options;

        let wrapped = (...args) => {
            // wait for reservations
            console.log('%d ahead of you', wrapped.reservations.length);
            return this._afterPromises(wrapped.reservations)

                // call the original
                .then(() => wrapped.original.apply(scope, args));
        };

        wrapped.reservations = [];
        wrapped.removeReservation = (promise) => {
            let index = wrapped.reservations.indexOf(promise);
            if (index > -1) {
                wrapped.reservations.splice(index, 1);
            }
            return wrapped.reservations.length;
        };
        wrapped.reserve = (promise) => {

            // When reservation is done, remove it.
            let clear = (result) => {
                wrapped.removeReservation(promise);

                // Relay the reservation result in case someone else
                // in the chain wants it.
                return result;
            };
            promise.then(clear, clear);

            return wrapped.reservations.push(promise);
        };

        wrapped.original = scope[name];
        scope[name] = wrapped;
    },

    unwrap(options) {
        const { scope, name } = options;
        scope[name] = scope[name].original;
    },

    // like Promise.all, but doesn't return values or fail
    _afterPromises(promises) {
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
    }
}
