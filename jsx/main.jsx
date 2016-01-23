import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Reergymerej from './Reergymerej.jsx'
import Home from './Home.jsx'
import Foo from './Foo.jsx'
import Bar from './Bar.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import DirtyCodePage from './dirty-code/DirtyCodePage.jsx'
import FunctionQueuerPage from './function-queuer/FunctionQueuerPage.jsx'

const content = document.getElementById('content');
// TODO: figure out an easy way to define the paths & navigation in one

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Reergymerej}>
      <IndexRoute component={Home} />
      <Route path="foo" component={Foo} />
      <Route path="bar" component={Bar} />
      <Route path="login" component={Login} />
      <Route path="profile" component={Profile} />
      <Route path="dirty-code" component={DirtyCodePage} />
      <Route path="function-queuer" component={FunctionQueuerPage} />
    </Route>
  </Router>,
  content);
