import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {
    render() {
        return (
            <ul className="navigation">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/foo">Foo</Link></li>
              <li><Link to="/bar">Bar</Link></li>
            </ul>
        );
    }
}
