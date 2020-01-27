import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// internal dependencies
//
import Header from 'components/header';
import useForm from 'components/use-form';
import RadioInput from 'components/radio-input';
import TextInput from 'components/text-input';
import TextEditor from 'components/text-editor';
import Button from 'components/button';
import TagInput from 'components/tag-input';
import Footer from 'components/footer';

import {
  standardCharacters,
  standardEmail,
  standardLink,
} from 'utils/input-validators';

import { fetchTags } from 'state/tags/actions';
import { sendProjectPreview } from 'state/post/actions';

const PostProject = (props) => {
  const { sendProjectPreview, fetchTags, post, tags } = props;

  const validationStateSchema = {
    title: {
      required: true,
      validator: {
        regEx: standardCharacters,
        error: 'You cannot use this character in this field.',
      },
    },
    company_name: {
      required: true,
      validator: {
        regEx: standardCharacters,
        error: 'You cannot use this character in this field.',
      },
    },
    company_email: {
      required: true,
      validator: {
        regEx: standardEmail,
        error: 'Please enter a valid email address.',
      },
    },
    company_location: {
      required: true,
      validator: {
        regEx: standardCharacters,
        error: 'You cannot use this character in this field.',
      },
    },
    restrictions: {
      required: false,
      validator: {
        regEx: /.{1,100}$/,
        error: 'Please keep the restrictions to under 100 characters.',
      },
    },
    link: {
      required: true,
      validator: {
        regEx: standardLink,
        error: 'Please enter a valid link or email address.',
      },
    },
    description: {
      required: true,
      validator: null,
    },
    tags: {
      required: false,
      validator: null,
    },
  };

  // handles suggestions
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    let suggestionsArray = [];

    post.tags.map((t) => {
      const tag = tags[t];

      if (tag) {
        const tagObject = {
          id: `${tag.id}`,
          text: tag.name,
        };

        suggestionsArray.push(tagObject);
      }
    });

    setSuggestions(suggestionsArray);
  }, [tags]);

  const handleSuggestions = (value) => {
    fetchTags(value);
  };

  // on tag enter
  const onTagEnter = (e) => {
    console.log(e);
  };

  // handles the submit function
  const submitCallback = (formState) => {
    sendProjectPreview(formState, post.projectId);
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    post.formState,
    validationStateSchema,
    submitCallback,
  );

  return (
    <>
      <Header white minimal />

      <div className="post-bg">
        <div className="post">
          <div className="post__headline">
            <h1>
              Step 1: <span className="main-green">Describe your project</span>.
            </h1>
            <p>
              Fill the fields correctly and add as much information as you can.
              This information will be used to find the best candidate to
              complete the project.
            </p>
          </div>

          <form className="post-form" onSubmit={handleOnSubmit}>
            <div className="post-form__content">
              <div className="post-form__row">
                <TextInput
                  name="title"
                  label="Project Title"
                  placeholder="E.g. 'front-end developer' or 'project manager'"
                  onChange={handleOnChange}
                  error={state['title'].error}
                  required
                  white
                  defaultValue={post.formState.title.value}
                />
              </div>

              <div className="post-form__row">
                <TextInput
                  name="restrictions"
                  label="Project Restrictions"
                  placeholder="E.g. 'Europe Only' or 'UTC -1 to UTC +4'"
                  onChange={handleOnChange}
                  error={state['restrictions'].error}
                  white
                  defaultValue={post.formState.restrictions.value}
                />
              </div>

              <div className="post-form__row">
                <TextInput
                  name="link"
                  label="How To Apply"
                  placeholder="Link to application page or email address"
                  onChange={handleOnChange}
                  error={state['link'].error}
                  required
                  white
                  defaultValue={post.formState.link.value}
                />
              </div>

              <div className="post-form__row">
                <TextEditor
                  name="description"
                  label="Project Description"
                  placeholder="Tell us a little bit about the project"
                  required
                  error={state['description'].error}
                  onChange={handleOnChange}
                  defaultValue={post.formState.description.value}
                />
              </div>

              <div className="post-form__row">
                <TagInput
                  label="Project Tags"
                  placeholder="Add a maximum of 5 tags for this project"
                  suggestions={suggestions}
                  onChange={(e) => handleSuggestions(e)}
                  onTagEnter={handleOnChange}
                  defaultValue={post.formState.tags.value}
                />
              </div>
            </div>

            <div className="post__headline">
              <h1>
                Step 2:{' '}
                <span className="main-green">Describe your company</span>.
              </h1>
              <p>
                If you have already posted a project on this platform before,
                use the same email address you used in the past and we will
                automatically link this project to the rest that belong to your
                company.
              </p>
            </div>

            <div className="post-form__content">
              <div className="post-form__row">
                <TextInput
                  name="company_email"
                  label="Company Email"
                  placeholder="We use this email to identify the company if you've posted before"
                  onChange={handleOnChange}
                  error={state['company_email'].error}
                  required
                  white
                  defaultValue={post.formState.company_email.value}
                />
              </div>

              <div className="post-form__row">
                <TextInput
                  name="company_name"
                  label="Company Name"
                  placeholder="E.g. 'Google'"
                  onChange={handleOnChange}
                  error={state['company_name'].error}
                  required
                  white
                  defaultValue={post.formState.company_name.value}
                />
              </div>

              <div className="post-form__row">
                <TextInput
                  name="company_location"
                  label="Company Location"
                  placeholder="E.g. Frankfurt, Germany"
                  onChange={handleOnChange}
                  error={state['company_location'].error}
                  required
                  white
                  defaultValue={post.formState.company_location.value}
                />
              </div>
            </div>
            <div className="post-form__row centered">
              <Button text="Preview Your Project" loading={post.loading} />
            </div>
          </form>
        </div>
      </div>

      <Footer hideTop />
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  tags: state.entities.tags,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: (value) => dispatch(fetchTags(value)),
    sendProjectPreview: (formState, projectId) =>
      dispatch(sendProjectPreview(formState, projectId)),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostProject);
