// holds the initial state
const initialState = {};

// test reducer
export default function(state = initialState, action) {
  if (action.type == 'TEST_ACTION') {
    return {
      ...state,
      action: action.payload
    };
  }
  if (action.type == 'TEST_ACTION_2') {
    return {
      ...state,
      action2: action.payload
    };
  }

  return state;
}
