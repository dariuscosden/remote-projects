import React from 'react';
import { connect } from 'react-redux';

// external dependencies
//
const classNames = require('classnames');

const TagCard = (props) => {
  const { t, tags, customTag } = props;

  // tag
  const tag = tags[t];

  const tagCardClassNames = classNames({
    'tag-card': true,
    'is-custom': customTag,
  });

  return (
    <div className={tagCardClassNames}>{customTag ? customTag : tag.name}</div>
  );
};

const mapStateToProps = (state) => ({
  tags: state.entities.tags,
});

export default connect(
  mapStateToProps,
  {},
)(TagCard);
