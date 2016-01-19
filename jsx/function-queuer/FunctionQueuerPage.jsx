import React from 'react'
import functionQueuer from './functionQueuer.jsx'

export default class Profile extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            queueOn: false,
            messages: [],
        };
    }

    render() {
        return (
            <div className="page">
                <h2>Function Queuer</h2>
                <p>This page demonstrates a mechanism that reserves a spot in a queue for calling another function.  It has been applied to the `print` method.</p>

                { this.renderQueueState() }
                <ul>
                    <li><button onClick={this.onWait3Click.bind(this)}>wait 3 seconds, then print</button></li>
                    <li><button onClick={this.onWait2Click.bind(this)}>wait 2 seconds, then print</button></li>
                    <li><button onClick={this.onWait1Click.bind(this)}>wait 1 second, then print</button></li>
                    <li><button onClick={this.onWait0Click.bind(this)}>print immediately</button></li>
                </ul>
                { this.renderMessages() }
            </div>
        );
    }

    renderMessages() {
        let messages = this.state.messages.map((message, i) => {
            return (
                <li key={i}>{message}</li>
            );
        });

        return (
            <ul>{ messages } </ul>
        );
    }

    renderQueueState() {
        let {queueOn} = this.state;
        let message = queueOn
            ? <p>Messages will print in the order you click the buttons, regardless of the delay before calling `print`.</p>
            : <p>Messages will print as soon as `print` is called.</p>;

        return (
            <div>
                <button onClick={this.toggleQueue.bind(this)}>queue is { queueOn ? 'on' : 'off'}</button>
                { message }
            </div>
        );
    }

    toggleQueue() {
        let {queueOn} = this.state;

        if (queueOn) {
            functionQueuer.unwrap({
                scope: this,
                name: 'print',
            });
        } else {
            functionQueuer.wrap({
                scope: this,
                name: 'print',
            });
        }

        this.setState({
            queueOn: !queueOn,
            messages: [],
        });
    }

    onWait3Click() {
        return this.waitThenPrint(3);
    }

    onWait2Click() {
        return this.waitThenPrint(2);
    }

    onWait1Click() {
        return this.waitThenPrint(1);
    }

    onWait0Click() {
        return this.print('called print immediately');
    }

    waitThenPrint(seconds) {
        let {queueOn} = this.state;
        let reservation;
        if (queueOn) {
            reservation = this.print.reserve();
        }

        return new Promise(resolve => {
            setTimeout(() => {
                let message = `waited ${seconds} seconds then called print`;
                if (queueOn) {
                    reservation.use(message);
                } else {
                    this.print(message);
                }
                resolve();
            }, seconds * 1000);
        });
    }

    print(message) {
        let {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }
}
