import React from 'react';

export default class Header extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
        };
    }

    render() {
        return (
            <div id="page">
                <p>Hello.</p>
                <p>I've decided to rewrite my site using some new tools.</p>
                <h3>Coming Up</h3>

            </div>
        );
    }

    componentDidMount() {
    }
}
