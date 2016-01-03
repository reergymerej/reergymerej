import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {
    render() {
        return (
            <ul id="navigation">
              <li><Link to="/about">About</Link></li>
              <li>foo</li>
              <li>foo</li>
            </ul>
        );
    }
}
