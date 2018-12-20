// requires stuff
const axios = require('axios');

// test action
export const testAction = () => dispatch => {
  dispatch({
    type: 'TEST_ACTION',
    payload: { test: 'action' }
  });
};

// test action2
export const testAction2 = () => dispatch => {
  dispatch({
    type: 'TEST_ACTION_2',
    payload: { test2: 'action2' }
  });
};
