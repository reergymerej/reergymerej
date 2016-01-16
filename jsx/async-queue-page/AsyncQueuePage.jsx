import React from 'react'

export default class Profile extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.print('I should be first.');
        }, 1000);

        setTimeout(() => {
            this.print('I should be second.');
        }, 333);
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
