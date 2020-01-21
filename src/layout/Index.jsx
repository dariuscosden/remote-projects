import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// internal dependencies
//
import Header from 'components/header';
import Homepage from './homepage';

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Homepage />} />
    </Switch>
  );
};

export default withRouter(Layout);
