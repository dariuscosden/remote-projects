import React, { useState } from 'react';

// internal dependencies
//
import TextInput from 'components/text-input';
import TextEditor from 'components/text-editor';
import Button from 'components/button';
import useForm from 'components/use-form';

import { validateEmpty, validateEmail } from 'utils/input-validators';

const Post = (props) => {
  // state schema
  const stateSchema = {
    title: { value: '', error: '' },
    company_name: { value: '', error: '' },
    company_email: { value: '', error: '' },
    company_location: { value: '', error: '' },
    restrictions: { value: '', error: '' },
    link: { value: '', error: '' },
    description: { value: '', error: '' },
  };

  const validationStateSchema = {
    title: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z0-9!@#$&()\\-`.+,/\"' ]*$/,
        error: 'You cannot use this character in this field.',
      },
    },
    company_name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z0-9!@#$&()\\-`.+,/\"' ]*$/,
        error: 'You cannot use this character in this field.',
      },
    },
    company_email: {
      required: true,
      validator: {
        regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        error: 'Please enter a valid email address.',
      },
    },
    company_location: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z0-9!@#$&()\\-`.+,/\"' ]*$/,
        error: 'You cannot use this character in this field.',
      },
    },
    restrictions: {
      required: false,
      validator: {
        regEx: /^.{1,5}/,
        error: 'Please keep the restrictions to under 100 characters.',
      },
    },
    link: {
      required: true,
      validator: {
        regEx: /^.{1,5}/,
        error: 'Please keep the application link to under 100 characters.',
      },
    },
    description: {
      required: true,
      validator: {
        regEx: /^.{1,1000}/,
        error: 'Please keep the description to under 1000 characters.',
      },
    },
  };

  // on submit
  const submitCallback = () => {
    console.log('submitted');
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    submitCallback,
  );

  return (
    <div className="post">
      <div className="post__headline">
        <h1>
          Post a <span className="main-green">project</span>.
        </h1>
      </div>

      <form className="post-form" onSubmit={handleOnSubmit}>
        <div className="post-form__content">
          <div className="post-form__row">
            <TextInput
              name="title"
              label="Project Title"
              placeholder="Something like 'web application front-end' or 'kubernetes implementation'"
              onChange={handleOnChange}
              error={state['title'].error}
              required
              white
            />
          </div>

          <div className="post-form__row">
            <TextInput
              name="company_name"
              label="Company Name"
              placeholder="Maybe 'Google'?"
              onChange={handleOnChange}
              error={state['company_name'].error}
              required
              white
            />
          </div>

          <div className="post-form__row">
            <TextInput
              name="company_email"
              label="Company Email"
              placeholder="We use this email to identify the company if you've posted before"
              onChange={handleOnChange}
              error={state['company_email'].error}
              required
              white
            />
          </div>

          <div className="post-form__row">
            <TextInput
              name="company_location"
              label="Company Location"
              placeholder="City and country is usually better"
              onChange={handleOnChange}
              error={state['company_location'].error}
              required
              white
            />
          </div>

          <div className="post-form__row">
            <TextInput
              name="restrictions"
              label="Restrictions"
              placeholder="For example: 'Europe Only' or 'UTC -1 to UTC +4'"
              onChange={handleOnChange}
              error={state['restrictions'].error}
              white
            />
          </div>

          <div className="post-form__row">
            <TextInput
              name="link"
              label="Application Link"
              placeholder="Link (or email) to where you want applicants to go"
              onChange={handleOnChange}
              error={state['link'].error}
              required
              white
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
            />
          </div>
        </div>
        <Button text="Proceed To Payment" />
      </form>
    </div>
  );
};

export default Post;
