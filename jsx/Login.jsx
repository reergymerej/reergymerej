import React from 'react'

export default class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
        username: '',
        password: '',
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
        </div>
    );
  }

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
    event.preventDefault();
    let {username, password} = this.state;
    console.log(username, password);
  }
}
