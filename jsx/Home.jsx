import React from 'react';

export default class Header extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
        };
    }

    render() {
        return (
            <div className="page">
                <div>
                    <h2>Hello.</h2>
                    <p>I've decided to rewrite <a href="http://jeremygreer.herokuapp.com/#/">my site</a> using some new tools.</p>
                    <ul>
                        <li>React</li>
                        <li>react-router</li>
                        <li>Babel</li>
                        <li>Watchify</li>
                        <li>less</li>
                        <li>JSX</li>
                        <li>eslint</li>
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }
}
