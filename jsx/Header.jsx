import React from 'react'
import Navigation from './Navigation.jsx'
import { Link } from 'react-router'

export default class Header extends React.Component {
    render() {
        let navProps = {
            user: this.props.user,
        };

        return (
            <div>
              <h1 id="header"><Link to="/">reerGymereJ</Link></h1>
              <Navigation {...navProps} />
            </div>
        );
    }
}
