import React from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import ProjectPage from 'layout/project-page';

const PostPreview = (props) => {
  const { post } = props;

  return <ProjectPage preview p={post.projectId} />;
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  {},
)(PostPreview);
