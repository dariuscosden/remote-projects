import React, { useState } from 'react';

// external dependencies
//
const classNames = require('classnames');

const TextInput = (props) => {
  const { name, label, defaultValue, placeholder, white, required } = props;

  // value
  const [value, setValue] = useState(defaultValue || '');

  // focused
  const [focused, setFocused] = useState(false);

  // errored
  const [error, setError] = useState(false);

  // filleded
  const [filled, setFilled] = useState(false);

  // input
  const inputClassNames = classNames({
    'is-focused': focused,
    'is-white': white,
    'is-errored': error,
    'is-filled': filled,
  });

  // label
  const labelClassNames = classNames({
    'is-text': true,
    'is-focused': focused,
  });

  const validateInput = (e) => {
    const { validate } = props;

    const value = e.target.value;

    // removes focus
    setFocused(false);

    // validates
    if (validate) {
      const errorValue = validate(value);

      if (errorValue) {
        setError(errorValue);
        setFilled(false);
      } else {
        setError(false);
        setFilled(true);
      }
    } else {
      if (value) {
        setFilled(true);
      }
    }
  };

  return (
    <div className="text-input">
      <div className="label">
        <label className={labelClassNames}>
          {label}
          {required && <span className="error-red"> *</span>}
        </label>
      </div>
      <div className="input">
        <input
          type="text"
          name={name}
          className={inputClassNames}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={(e) => validateInput(e)}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {error ? (
        <div className="placeholder error">{error}</div>
      ) : (
        <div className="placeholder">{placeholder}</div>
      )}
    </div>
  );
};

export default TextInput;
