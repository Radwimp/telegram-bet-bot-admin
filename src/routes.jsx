import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router-dom';

/** Containers */
import Users from './containers/Users';
// import Matches from './containers/Matches';
// import Tournaments from './containers/Tournaments';
// import Stats from './containers/Stats ';

const Routes = () => (
  <>
    <Route exact path="/users" component={Users} />
  </>
);

export default hot(Routes);
