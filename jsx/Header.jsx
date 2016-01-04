import React from 'react'
import Navigation from './Navigation.jsx'
import { Link } from 'react-router'

export default class Header extends React.Component {
    render() {
        return (
            <div>
              <h1 id="header"><Link to="/">reerGymereJ</Link></h1>
              <Navigation />
            </div>
        );
    }
}
