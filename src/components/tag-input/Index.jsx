import React, { useState, useEffect } from 'react';

// external dependencies
//
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  tab: 9,
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.tab, KeyCodes.comma, KeyCodes.enter];

const TagInput = (props) => {
  const {
    onChange,
    onTagEnter,
    suggestions,
    label,
    placeholder,
    defaultValue,
  } = props;

  const initialTags = {
    tags: [],
    suggestions: suggestions,
  };

  // initial tags
  const [tags, setTags] = useState(initialTags);

  // runs on initial render if default value
  useEffect(() => {
    if (defaultValue) {
      const tagsList = [];
      defaultValue.split(',').map((tag) => {
        const tagObject = {
          id: tag,
          text: tag,
        };

        tagsList.push(tagObject);
      });

      setTags({ tags: tagsList, suggestions: tags.suggestions });
    }
  }, []);

  const handleDelete = (i) => {
    // use form connection
    const eventValues = tags.tags
      .filter((tag, index) => index !== i)
      .map((tag) => {
        return tag.text;
      });
    const eventObject = {
      target: {
        name: 'tags',
        value: eventValues.join(','),
      },
    };

    onTagEnter(eventObject);

    setTags({
      tags: tags.tags.filter((tag, index) => index !== i),
      suggestions: tags.suggestions,
    });
  };

  const handleAddition = (tag) => {
    if (tags.tags.length === 5) {
      return false;
    }

    // use form connection
    const eventValues = [...tags.tags, tag].map((tag) => {
      return tag.text;
    });
    const eventObject = {
      target: {
        name: 'tags',
        value: eventValues.join(','),
      },
    };

    onTagEnter(eventObject);

    setTags((tags) => ({ tags: [...tags.tags, tag] }));
  };

  return (
    <div>
      <div className="ReactTags__label">{label}</div>
      <ReactTags
        tags={tags.tags}
        suggestions={suggestions}
        handleInputChange={onChange}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder={null}
        inputFieldPosition="top"
        autofocus={false}
        allowDragDrop={false}
        minQueryLength={1}
      />
      {tags.tags.length == 0 && (
        <div className="ReactTags__placeholder">{placeholder}</div>
      )}
      {tags.tags.map((t) => {
        return <input key={t.id} type="hidden" name="tags" value={t.text} />;
      })}
    </div>
  );
};

export default TagInput;
