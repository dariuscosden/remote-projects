// reducer - homepage
//

const initialState = {
  fetched: false,
  contracts: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CONTRACTS_SUCCESS': {
      return Object.assign({}, state, {
        fetched: true,
        contracts: [action.payload.result],
      });
    }
  }

  return state;
}
