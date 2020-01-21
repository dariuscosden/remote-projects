// reducers - entities
//

const initialState = {
  contracts: {},
  companies: {},
  tags: {},
};

// entities reducer
export default function(state = initialState, action) {
  const { payload } = action;
  let newState = {
    ...state,
    contracts: { ...state.contracts },
    companies: { ...state.companies },
    tags: { ...state.tags },
  };

  switch (action.type) {
    case 'FETCH_CONTRACTS_SUCCESS':
      return _.merge(newState, payload.entities);
  }

  return state;
}
