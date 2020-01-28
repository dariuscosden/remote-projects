import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

// internal dependencies
//
import Header from 'components/header';
import Homepage from './homepage';
import Post from './post';
import ProjectPage from './project-page';
import Terms from './terms';
import PrivacyPolicy from './privacy-policy';

import Error from 'components/error';
import Message from 'components/message';

import history from 'utils/history';

const Layout = (props) => {
  const { error, message } = props;

  // history
  history.listen(() => {
    window.scrollTo(0, 0);
  });

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
