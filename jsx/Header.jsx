import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
    render() {
        return (
            <div>
              <h1 id="header">reerGymereJ</h1>
              <ul>
                <li><Link to="/foo">Foo</Link></li>
                <li><Link to="/bar">Bar</Link></li>
              </ul>
            </div>
        );
    }
}
