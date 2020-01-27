const initialState = {
  message: '',
};

// message
export default function(state = initialState, action) {
  if (action.type == 'SET_MESSAGE') {
    return Object.assign({}, state, {
      message: action.message,
    });
  }

  if (action.type == 'REMOVE_MESSAGE') {
    return Object.assign({}, state, {
      message: null,
    });
  }

  if (action.message) {
    const { message } = action;

    return Object.assign({}, state, {
      message: message,
    });
  }

  return state;
}
