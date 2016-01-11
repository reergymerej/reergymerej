import React from 'react'
import auth from './services/auth.jsx'

export default class Login extends React.Component {
  static get defaultProps() {
      return Object.assign({}, {
          onAuthenticated: () => {},
      });
  }

  constructor(...args) {
    super(...args);
    this.state = {
        username: 'dude',
        password: 'password',
    };
  }

  render() {
    return (
        <div className="page">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onUsernameChange.bind(this)}
                    />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange.bind(this)}
                    />
                <button type="submit">Authenticate</button>
            </form>
            <button onClick={this.handleTestAuthClick.bind(this)}>test auth</button>
        </div>
    );
  }

  // TODO: dedup field change events
  onUsernameChange(event) {
    this.setState({
        username: event.target.value,
    });
  }

  onPasswordChange(event) {
    this.setState({
        password: event.target.value,
    });
  }

  handleSubmit(event) {
    let {username, password} = this.state;
    event.preventDefault();
    auth.login(username, password).then(user => {
      this.props.onAuthenticated(user);
    });
  }

  handleTestAuthClick() {
    auth.testAuth().then(result => {
      console.log('can access restricted resource?', result);
    });
  }
}
