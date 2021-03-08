import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router-dom';

/** Containers */
import Layout from './containers/Layout';
import Users from './containers/Users';
import Matches from './containers/Matches';
import Seasons from './containers/Seasons';
import Control from './containers/Control';
import Season from './containers/Season';

const Routes = () => (
  <Layout>
    <Route exact path="/users" component={Users} />
    <Route exact path="/control" component={Control} />
    <Route exact path="/matches" component={Matches} />
    <Route exact path="/seasons" component={Seasons} />
    <Route exact path="/seasons/:id" component={Season} />
  </Layout>
);

export default hot(Routes);
