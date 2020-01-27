import React, { useState, useRef, useEffect } from 'react';

// external dependencies
//
const classNames = require('classnames');

const RadioInput = (props) => {
  const mounted = useRef();

  const {
    name,
    options,
    defaultValue,
    white,
    required,
    disabled,
    onChange,
  } = props;

  // value
  const [value, setValue] = useState(defaultValue || '');

  // label
  const labelClassNames = classNames({
    'is-radio': true,
  });

  // sets value in formState on initial render
  useEffect(() => {
    const event = {
      target: {
        name: name,
        value: defaultValue,
      },
    };

    onChange(event);
  }, []);

  return (
    <div className="radio-input">
      {options.map((o, i) => {
        return (
          <div key={i} className="radio-input__container">
            <div className="label">
              <label
                htmlFor={`option_${i}`}
                className="radio-input__inner-label"
              >
                {o}
              </label>
            </div>
            <input
              type="radio"
              id={`option_${i}`}
              name={name}
              value={o}
              disabled={disabled}
              defaultChecked={o === defaultValue}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioInput;
