import React from 'react';
import { connect } from 'react-redux';

// internal dependencies
//

const PostPreview = (props) => {
  const { post } = props;

  return <div className="post-preview" />;
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  {},
)(PostPreview);
