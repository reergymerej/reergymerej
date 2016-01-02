import React from 'react';
import Header from './Header.jsx';
import Page from './Page.jsx';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Page />
            </div>
        );
    }
}