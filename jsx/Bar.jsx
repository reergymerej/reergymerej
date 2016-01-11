import React from 'react'
import auth from './services/auth.jsx'

export default class Bar extends React.Component {
    render() {
        const state = this.state || {};
        const {canAccess} = state;

        return (
            <div className="page">
                <button onClick={this.handleTestAuthClick.bind(this)}>test auth</button>
                { canAccess
                    ? <div>you're in</div>
                    : canAccess === false
                        ? <div>not allowed</div>
                        : ''
                }
            </div>
        )
    }

    handleTestAuthClick() {
        auth.testAuth().then(result => {
          this.setState({ canAccess: result });
        });
    }
}
