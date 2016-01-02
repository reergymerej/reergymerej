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
                <p>I've decided to rewrite <a href="http://jeremygreer.herokuapp.com/#/">my site</a> using some new tools.</p>
                <ul>
                    <li>auth</li>
                    <li>simple blog</li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
    }
}
