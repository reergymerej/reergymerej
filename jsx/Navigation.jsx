import React from 'react'
import { Link } from 'react-router'

const LINKS = [
    {
        id: '0',
        path: '/',
        name: 'Home',
    },
    {
        id: '1',
        path: '/foo',
        name: 'Foo',
    },
    {
        id: '2',
        path: '/bar',
        name: 'Bar',
    },
    {
        id: '3',
        path: '/login',
        name: 'Login',
        visible: (user) => {
            return !user;
        },
    },
];

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
                <li key={link.id}>
                    <Link to={link.path}>{link.name}</Link>
                </li>
            );
        });
    }
}
