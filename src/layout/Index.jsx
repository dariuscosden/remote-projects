import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// internal dependencies
//
import Header from 'components/header';
import Homepage from './homepage';
import Post from './post';
import ProjectPage from './project-page';

import history from 'utils/history';

const Layout = (props) => {
  // history
  history.listen(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Switch>
      <Route exact path="/" render={() => <Homepage />} />
      <Route path="/post" render={() => <Post />} />
      <Route path="/projects/:id" render={() => <ProjectPage />} />
    </Switch>
  );
};

export default withRouter(Layout);
