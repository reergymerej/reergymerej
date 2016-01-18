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

        let reservation2 = this.print.reserve();
        setTimeout(() => {
            reservation2.use(2, 'printing');
        }, 600);

        this.print(3, 'printing');

        let reservation5 = this.print.reserve();
        setTimeout(() => {
            reservation5.use(5, 'printing').then(result => console.log('result', result));
        }, 300);

        this.print(6, 'printing').then(result => {
            console.log('result', result);
        });

        setTimeout(() => {
            this.print(7, 'printing');
        }, 650);

        functionQueuer.unwrap({
            scope: this,
            name: 'print',
        });

        this.print(0, 'printing');
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
        return 'done printing';
    }
}
