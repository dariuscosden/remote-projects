import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// external dependencies
//
import { Elements } from 'react-stripe-elements';

// internal dependencies
//
import PostProject from './PostProject';
import PostPreview from './PostPreview';
import InjectedPostPayment from './PostPayment';

const Post = (props) => {
  return (
    <Elements>
      <Switch>
        <Route exact path="/post/new-project" render={() => <PostProject />} />
        <Route exact path="/post/preview" render={() => <PostPreview />} />
        <Route
          exact
          path="/post/payment"
          render={() => <InjectedPostPayment />}
        />
      </Switch>
    </Elements>
  );
};

export default withRouter(Post);
