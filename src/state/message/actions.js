// Message actions
//

export const setMessage = (message) => (dispatch) => {
  dispatch({
    type: 'SET_MESSAGE',
    payload: message,
  });
};

export const removeMessage = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_MESSAGE',
  });
};
