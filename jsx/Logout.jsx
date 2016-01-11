import React from 'react'
import auth from './services/auth.jsx'

export default class Login extends React.Component {
    static get defaultProps() {
      return Object.assign({}, {
          onLogout: () => {},
      });
    }

  render() {
    return (
        <div className="page">
            <button onClick={this.handleLogoutClick.bind(this)}>sayonara</button>
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
