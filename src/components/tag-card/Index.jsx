import React from 'react';

const TagCard = (props) => {
  const { tag } = props;

  return <div className="tag-card">{tag.name}</div>;
};

export default TagCard;
