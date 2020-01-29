import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

// external dependencies
//
import loadable from '@loadable/component';

// internal dependencies
//
import Header from 'components/header';
import Homepage from './homepage';

const Post = loadable(() => import(/* webpackChunkName: "post" */ './post'));
const ProjectPage = loadable(() =>
  import(/* webpackChunkName: "project-page" */ './project-page'),
);
const Terms = loadable(() => import(/* webpackChunkName: "terms" */ './terms'));
const PrivacyPolicy = loadable(() =>
  import(/* webpackChunkName: "privacy-policy" */ './privacy-policy'),
);

import Error from 'components/error';
import Message from 'components/message';

import history from 'utils/history';

const Layout = (props) => {
  const { error, message } = props;

  // history
  history.listen(() => {
    window.scrollTo(0, 0);
  });

  // preloads on initial render
  useEffect(() => {
    Post.preload();
    ProjectPage.preload();
    Terms.preload();
    PrivacyPolicy.preload();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Homepage />} />
        <Route path="/post" render={() => <Post />} />
        <Route path="/projects/:id" render={() => <ProjectPage />} />

        <Route path="/terms" render={() => <Terms />} />
        <Route path="/privacy-policy" render={() => <PrivacyPolicy />} />
      </Switch>

      {error.message && <Error />}
      {message.message && <Message />}
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  message: state.message,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(Layout),
);
