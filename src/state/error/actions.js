// Error actions
//

export const setError = (error) => (dispatch) => {
  dispatch({
    type: 'SET_ERROR',
    payload: error,
  });
};

export const removeError = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_ERROR',
  });
};
