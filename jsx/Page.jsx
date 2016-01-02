import React from 'react';

export default class Header extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            count: 0,
            clicks: 100,
        };
    }

    render() {
        const {count, clicks} = this.state;

        return (
            <div>
                <p>Hello. { count }</p>
                <button onClick={ this.onButtonClick.bind(this) }>click me</button>
                <div>
                    <small>click count: {clicks}</small>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setInterval(this.bumpCount.bind(this), 300);
    }

    bumpCount() {
        this.setState({
            count: this.state.count + 1,
        });
    }

    onButtonClick() {
        this.setState({
            clicks: this.state.clicks + 1,
        });
    }
}
