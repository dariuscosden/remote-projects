// reducers - entities
//

const initialState = {
  projects: {},
  companies: {},
  tags: {},
};

// entities reducer
export default function(state = initialState, action) {
  const { payload } = action;
  let newState = {
    ...state,
    projects: { ...state.projects },
    companies: { ...state.companies },
    tags: { ...state.tags },
  };

  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
      return _.merge(newState, payload.entities);
  }

  return state;
}
