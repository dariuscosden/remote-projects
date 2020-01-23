import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// internal dependencies
//
import PostProject from './PostProject';
import PostPreview from './PostPreview';

const Post = (props) => {
  return (
    <Switch>
      <Route exact path="/post/new-project" render={() => <PostProject />} />
      <Route exact path="/post/preview" render={() => <PostPreview />} />
    </Switch>
  );
};

export default withRouter(Post);
