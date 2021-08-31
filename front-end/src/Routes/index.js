import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  HomePage,
  Login,
  NotFound,
} from '../Pages';
import PrivateRoute from './PrivateRoute';

const Routes = () => (

  <Switch>
    {/* <Route exact path="/" component={ HomePage } /> */}
    <Route exact path="/login" component={ Login } />
    <PrivateRoute path="/" component={ HomePage } />
    <Route component={ NotFound } />
  </Switch>

);

export default Routes;
