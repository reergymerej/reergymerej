import React from 'react'
import AsyncQueue from './AsyncQueue.jsx'

export default class Profile extends React.Component {
    componentDidMount() {
        let printQueue = new AsyncQueue(this.print, this);

        // use this
        printQueue.push(ticket => {
            return new Promise(resolve => {
                setTimeout(() => {
                    ticket.redeem('I should be first.');
                    resolve();
                }, 500);
            });
        });

        printQueue.push(ticket => {
            ticket.redeem('I should be second.');
        });

        printQueue.push(ticket => {
            return new Promise(resolve => {
                setTimeout(() => {
                    ticket.redeem('I should be third.');
                    resolve();
                }, 700);
            });
        });

        printQueue.push(ticket => {
            setTimeout(() => {
                ticket.redeem('I should be last because I messed up.');
            }, 100);
        });

        printQueue.push(ticket => {
            return new Promise(resolve => {
                setTimeout(() => {
                    ticket.redeem('I should be fourth.');
                    resolve();
                }, 200);
            });
        });
    }

    render() {
        return (
            <div className="page">
                <h2>AsyncQueue</h2>
                <p>This page demonstrates an asynchronous queue.  The queue is used to control the order of a function being executed.  Think of it as a "take a number" system for asynchronous code.</p>
            </div>
        );
    }

    print(message) {
        console.log(message);
    }
}
