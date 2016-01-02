import React from 'react';
import Header from './Header.jsx';
import Page from './Page.jsx';
import Footer from './Footer.jsx';

export default class Layout extends React.Component {
    render() {
        return (
            <div id="layout">
                <Header />
                <Page />
                <Footer />
            </div>
        );
    }
}
