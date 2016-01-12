import React from 'react';
import generic from './services/generic.jsx';

export default class Footer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            ts: null,
        };
    }

    componentDidMount() {
        generic.getLastUpdated().then(ts => {
            this.setState({ts});
        });
    }

    render() {
        return (
            <div id="footer">
                {
                    this.state.ts
                        ? ('updated ' + this.state.ts)
                        : '' }
            </div>
        );
    }
}
