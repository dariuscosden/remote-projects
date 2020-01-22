import React, { useState, useRef } from 'react';

// external dependencies
//
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const classNames = require('classnames');

const TextEditor = (props) => {
  const { error, label, name, required, placeholder, onChange } = props;

  // first blur
  const [firstKey, setFirstKey] = useState(false);

  // html editor
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  // editor ref
  const editorRef = useRef(null);

  // on change
  const onEditorStateChange = (editorState) => {
    const html = stateToHTML(editorState.getCurrentContent());
    const value = editorState.getCurrentContent().getPlainText('\u0001');

    if (onChange && firstKey)
      onChange({
        target: {
          name: name,
          value: value,
        },
      });

    if ((!firstKey && value.length > 0) || error) setFirstKey(true);

    setEditorState(editorState);
  };

  // wrapper class names
  const wrapperClassNames = classNames({
    'text-editor__wrapper': true,
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
