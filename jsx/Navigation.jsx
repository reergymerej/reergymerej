import React from 'react'
import { Link } from 'react-router'

const LINKS = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/foo',
        name: 'Foo',
    },
    {
        path: '/bar',
        name: 'Bar',
    },
    {
        path: '/dirty-code',
        name: 'Dirty Code',
    },
    {
        path: '/function-queuer',
        name: 'Function Queuer',
    },
    {
        path: '/login',
        name: 'Login',
        visible: (user) => {
            return !user;
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        visible: (user) => {
            return !!user;
        },
    },
];

LINKS.forEach((link, i) => link.key = i + '');

export default class Navigation extends React.Component {
    render() {
        let links = this.renderLinks();

        return (
            <ul className="navigation">
              { links }
            </ul>
        );
    }

    renderLinks() {
        const {user} = this.props;

        return LINKS.filter(link => {

            if (link.visible) {
                return link.visible(user);
            } else {
                return true;
            }

            }).map(link => {
                return (
                    <li key={link.key}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                );
            });
    }
}
