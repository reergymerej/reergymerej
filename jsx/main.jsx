import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout.jsx'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import Reergymerej from './Reergymerej.jsx'
import Home from './Home.jsx'
import Foo from './Foo.jsx'
import Bar from './Bar.jsx'

const content = document.getElementById('content');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Reergymerej}>
      <IndexRoute component={Home} />
      <Route path="foo" component={Foo} />
      <Route path="bar" component={Bar} />
    </Route>
  </Router>
), content);