import React from 'react'
import auth from './services/auth.jsx'

export default class Profile extends React.Component {
    constructor(...args){
        super(...args);
        this.state = {
            user: null,
        };
    }

    static get defaultProps() {
        return Object.assign({}, {
            onLogout: () => {},
        });
    }

    componentDidMount() {
        auth.getUser().then(user => {
            this.setState({ user });
        });
    }

    render() {
        return (
            <div className="page">
                <button onClick={this.handleLogoutClick.bind(this)}>Logout</button>
                <div>
                    { JSON.stringify(this.state.user) }
                </div>
            </div>
        );
    }

    handleLogoutClick() {
        auth.logout().then(() => {
            this.props.onLogout();
            this.props.history.push('/');
        });
    }
}
