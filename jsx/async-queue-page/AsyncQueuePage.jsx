import React from 'react'
// import asyncQueue from './asyncQueue.jsx'
import functionQueuer from './functionQueuer.jsx'

export default class Profile extends React.Component {
    constructor(...args) {
        super(...args);
        this.correctScope = true;
    }

    render() {
        return (
            <div className="page">
                <h2>AsyncQueue</h2>
                <p>This page demonstrates an asynchronous queue.  The queue is used to control the order of a function being executed.  Think of it as a "take a number" system for asynchronous code.</p>
            </div>
        );
    }

    componentDidMount() {
        // asyncQueue.use({
        //     queuedFunctionName: 'print',
        //     scope: this,
        //     autoReservingFunctionNames: ['aaa', 'bbb', 'ccc'],
        // });

        // this.aaa(1);
        // this.bbb(2);
        // this.ccc(3);
        // this.print(4, 'done with direct call');

        functionQueuer.wrap({
            scope: this,
            name: 'print',
        });

        this.print(1, 'printing');

        this.print.reserve(new Promise(resolve => {
            setTimeout(() => {
                // this.print(2, 'printing');
                resolve('all done');
            }, 1000);
        }));

        this.print(3, 'printing');

        this.print.reserve(new Promise((resolve, reject) => {
            setTimeout(() => {
                // this.print(5, 'printing');
                reject();
            }, 300);
        }));

        this.print(6, 'printing');

        setTimeout(() => {
            this.print(7, 'printing');
        }, 2000);

        // functionQueuer.unwrap({
        //     scope: this,
        //     name: 'print',
        // });

        // this.print(0, 'printing');
    }

    // aaa(num) {
    //     setTimeout(() => {
    //         this.print(num, 'done with aaa', this.correctScope);
    //     }, 100);
    // }

    // bbb(num) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             this.print(num, 'done with bbb', this.correctScope);
    //             resolve();
    //         }, 50);
    //     });
    // }

    // ccc(num) {
    //     this.print(num, 'done with ccc', this.correctScope);
    // }

    print(num, message) {
        console.log(num, message, this.correctScope);
    }
}
