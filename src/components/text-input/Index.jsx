import React, { useState, useRef, useEffect } from 'react';

// external dependencies
//
const classNames = require('classnames');

const TextInput = (props) => {
  const mounted = useRef();

  const {
    name,
    label,
    defaultValue,
    placeholder,
    white,
    required,
    disabled,
    error,
    onChange,
  } = props;

  // firstBlur
  const [firstBlur, setFirstBlur] = useState(false);

  // value
  const [value, setValue] = useState(defaultValue || '');

  // focused
  const [focused, setFocused] = useState(false);

  // filled
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

  // handles input change
  const handleInputChange = (e) => {
    setValue(e.target.value);

    if (!firstBlur && error) setFirstBlur(true);

    if ((onChange && firstBlur) || error) onChange(e);

    if (e.target.value && !error && firstBlur) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  };

  const handleBlur = (e) => {
    if (!firstBlur) {
      setFirstBlur(true);
      onChange(e);
    }

    if (!e.target.value && !error) {
      setFocused(false);
    }

    if (e.target.value && !error) {
      setFilled(true);
    }
  };

  // component did update
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (error) {
        setFilled(false);
      }

      if (value && !error && firstBlur) setFilled(true);
    }
  });

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
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleBlur(e)}
          disabled={disabled}
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
