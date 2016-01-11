import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import auth from './services/auth.jsx'

export default class Reergymerej extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            user: undefined,
        };
    }

    render() {

        let {children} = this.props;

        children = React.cloneElement(
            children,
            {
                onAuthenticated: this.handleOnAuthenticated.bind(this),
            }
        );

        return this.state.user === undefined
            ? (
                <div></div>
            )
            : (
                <div id="reergymerej">
                    <Header
                        user={this.state.user}
                    />
                    {children}
                    <Footer />
                </div>
            );
    }

    componentDidMount() {
        auth.getUser().then(
            user => this.setState({ user }),
            () => this.setState({user: null})
        );
    }

    handleOnAuthenticated(user) {
        this.setState({user});
    }
}
