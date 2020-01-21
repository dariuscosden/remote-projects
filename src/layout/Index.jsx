import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// internal dependencies
//
import Header from 'components/header';
import Homepage from './homepage';
import Post from './post';

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Homepage />} />
      <Route exact path="/post" render={() => <Post />} />
    </Switch>
  );
};

export default withRouter(Layout);
