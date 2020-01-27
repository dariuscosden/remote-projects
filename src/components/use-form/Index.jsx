import { useState, useEffect, useCallback } from 'react';

// internal dependencies
//
import { stripHtml } from 'utils/functions';

const useForm = (stateSchema, validationSchema = {}, callback) => {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // updates fields on initial render
  useEffect(() => {
    const formTouched = Object.keys(stateSchema).some((k) => {
      return stateSchema[k].value !== '';
    });

    if (formTouched) {
      updateFields();
    }
  }, []);

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true);
  }, []);

  // For every change in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some((key) => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationSchema]);

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    (event) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      let error = '';
      if (validationSchema[name].required) {
        if (!stripHtml(value)) {
          error = 'This is a required field and cannot be left blank.';
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error;
        }
      }

      setState((prevState) => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema],
  );

  // update fields with validation
  const updateFields = () => {
    Object.keys(state).map((key) => {
      let error = '';
      let value = state[key].value;
      if (validationSchema[key].required) {
        if (!value) {
          error = 'This is a required field and cannot be left blank.';
        } else {
          error = '';
        }
      }

      if (
        validationSchema[key].validator !== null &&
        typeof validationSchema[key].validator === 'object'
      ) {
        if (value && !validationSchema[key].validator.regEx.test(value)) {
          error = validationSchema[key].validator.error;
        } else if (value && validationSchema[key].validator.regEx.test(value)) {
          error = '';
        }
      }

      setState((prevState) => ({
        ...prevState,
        [key]: { value, error },
      }));
    });
  };

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      updateFields();

      // Make sure that validateState returns false
      // Before calling the submit callback function
      if (!validateState()) {
        callback(state);
      }
    },
    [state],
  );

  return { state, disable, handleOnChange, handleOnSubmit };
};

export default useForm;
