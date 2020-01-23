import React, { useState, useEffect, useRef } from 'react';

// external dependencies
//
import { ContentState, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const classNames = require('classnames');

const TextEditor = (props) => {
  const {
    error,
    label,
    name,
    required,
    placeholder,
    onChange,
    defaultValue,
  } = props;

  // editor ref
  const editorRef = useRef(null);

  // html editor
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  // first blur
  const [firstKey, setFirstKey] = useState(false);

  // filled
  const [filled, setFilled] = useState(false);

  // checks default value on initial render
  useEffect(() => {
    if (defaultValue && !error) {
      const blocksFromHtml = htmlToDraft(defaultValue);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);

      setFilled(true);
    }
  }, []);

  // on focus
  const [focused, setFocused] = useState(false);
  const onEditorFocus = () => {
    setFocused(true);
  };

  // on blur
  const onEditorBlur = () => {
    setFocused(false);
  };

  // on change
  const onEditorStateChange = (editorState) => {
    const html = stateToHTML(editorState.getCurrentContent());
    const value = editorState.getCurrentContent().getPlainText('\u0001');

    if (onChange && firstKey) {
      onChange({
        target: {
          name: name,
          value: html,
        },
      });

      if (!error) setFilled(true);
    }

    if ((!firstKey && value.length > 0) || error) setFirstKey(true);
    if (html && error && filled) {
      setFilled(false);
    }

    setEditorState(editorState);
  };

  // wrapper class names
  const wrapperClassNames = classNames({
    'text-editor__wrapper': true,
    'is-focused': focused,
    'is-filled': filled,
    'is-errored': error,
  });

  return (
    <div className="text-editor">
      <div className="text-editor__label">
        {label}
        {required && <span className="error-red"> *</span>}
      </div>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onFocus={onEditorFocus}
        onBlur={onEditorBlur}
        onEditorStateChange={onEditorStateChange}
        editorClassName={wrapperClassNames}
        toolbarClassName="text-editor__toolbar"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
          ],
          inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
        }}
      />
      {error ? (
        <div className="text-editor__placeholder">
          <span className="error-red">{error}</span>
        </div>
      ) : (
        <div className="text-editor__placeholder">{placeholder}</div>
      )}
    </div>
  );
};

export default TextEditor;
