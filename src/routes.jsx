import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router-dom';

/** Containers */
import Layout from './containers/Layout';
import Users from './containers/Users';
import Matches from './containers/Matches';
import Tournaments from './containers/Tournaments';
import Control from './containers/Control';
// import Dashboard from './containers/dashboard';

const Routes = () => (
  <Layout>
    <Route exact path="/users" component={Users} />
    <Route exact path="/control" component={Control} />
    <Route exact path="/matches" component={Matches} />
    <Route exact path="/tournaments" component={Tournaments} />
  </Layout>
);

export default hot(Routes);
