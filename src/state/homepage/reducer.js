// reducer - homepage
//

const initialState = {
  fetched: false,
  projects: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS': {
      return Object.assign({}, state, {
        fetched: true,
        projects: [action.payload.result],
      });
    }
  }

  return state;
}
