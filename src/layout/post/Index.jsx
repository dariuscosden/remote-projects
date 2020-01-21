import React, { useState } from 'react';

// external dependencies
//
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

// internal dependencies
//
import TextInput from 'components/text-input';

import { validateEmpty, validateEmail } from 'utils/input-validators';

const Post = (props) => {
  // html editor
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  return (
    <div className="post">
      <div className="post__headline">
        <h1>
          Post a <span className="main-green">contract</span>.
        </h1>
      </div>

      <form className="post-form">
        <div className="post-form__row">
          <TextInput
            white
            label="Project Title"
            placeholder="Something like 'web application front-end' or 'kubernetes implementation'"
            validate={validateEmpty}
            required
          />
        </div>

        <div className="post-form__row">
          <TextInput
            white
            label="Company Name"
            placeholder="Maybe 'Google'?"
            validate={validateEmpty}
            required
          />
        </div>

        <div className="post-form__row">
          <TextInput
            white
            label="Company Email"
            placeholder="We use this email to identify the company if you've posted before"
            validate={validateEmail}
            required
          />
        </div>

        <div className="post-form__row">
          <TextInput
            white
            label="Company Location"
            placeholder="City and country is usually better"
            validate={validateEmpty}
            required
          />
        </div>

        <div className="post-form__row">
          <TextInput
            white
            label="Restrictions"
            placeholder="For example: 'Europe Only' or 'UTC -1 to UTC +4'"
          />
        </div>

        <div className="post-form__row">
          <TextInput
            white
            label="Application Link"
            placeholder="Link (or email) to where you want applicants to go"
            validate={validateEmpty}
            required
          />
        </div>

        <div className="post-form__row">
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
      </form>
    </div>
  );
};

export default Post;
