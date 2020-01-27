const initialState = {
  message: null,
};

// error
export default function(state = initialState, action) {
  if (action.type == 'SET_ERROR') {
    return Object.assign({}, state, {
      message: action.payload,
    });
  }

  if (action.type == 'REMOVE_ERROR') {
    return Object.assign({}, state, {
      message: null,
    });
  }

  if (action.error || action.error === '') {
    const { error } = action;

    let message = 'Something went wrong. Please try again.';

    if (error.response) {
      message = error.response.data.message;
    }

    if (action.error === '') message = null;

    return Object.assign({}, state, {
      message: message,
    });
  }

  return state;
}
