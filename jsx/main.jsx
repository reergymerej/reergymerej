import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Reergymerej from './Reergymerej.jsx'
import Home from './Home.jsx'
import Foo from './Foo.jsx'
import Bar from './Bar.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import AsyncQueuePage from './AsyncQueuePage.jsx'

const content = document.getElementById('content');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Reergymerej}>
      <IndexRoute component={Home} />
      <Route path="foo" component={Foo} />
      <Route path="bar" component={Bar} />
      <Route path="login" component={Login} />
      <Route path="profile" component={Profile} />
      <Route path="async-queue" component={AsyncQueuePage} />
    </Route>
  </Router>,
  content);
