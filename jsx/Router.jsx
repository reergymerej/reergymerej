import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Reergymerej from './Reergymerej.jsx'
import Home from './Home.jsx'
import Foo from './Foo.jsx'
import Bar from './Bar.jsx'

export default class MyRouter extends Router {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Reergymerej}>
          <IndexRoute component={Home} />
          <Route path="foo" component={Foo} />
          <Route path="bar" component={Bar} />
        </Route>
      </Router>
      );
  }
}
