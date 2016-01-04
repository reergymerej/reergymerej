import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default class Reergymerej extends React.Component {
  render() {
    return (
      <div id="reergymerej">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
