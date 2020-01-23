import React from 'react';
import { connect } from 'react-redux';

const TagCard = (props) => {
  const { t, tags } = props;

  // tag
  const tag = tags[t];

  return <div className="tag-card">{tag.name}</div>;
};

const mapStateToProps = (state) => ({
  tags: state.entities.tags,
});

export default connect(
  mapStateToProps,
  {},
)(TagCard);
