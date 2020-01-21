// actions - homepage
//

// external dependencies
//
const _ = require('lodash');
const axios = require('axios');
import { normalize } from 'normalizr';

import { contractSchema } from 'utils/schema';

export const fetchContracts = () => (dispatch) => {
  axios
    .get(`/api/v1/contracts`)
    .then((response) => fetchContractsSuccess(response.data)(dispatch))
    .catch((error) => fetchContractsError(error)(dispatch));
};

const fetchContractsSuccess = (contracts) => (dispatch) => {
  const normalizedData = normalize(contracts, [contractSchema]);

  dispatch({
    type: 'FETCH_CONTRACTS_SUCCESS',
    payload: normalizedData,
  });
};

const fetchContractsError = (error) => (dispatch) => {
  dispatch({ type: 'FETCH_CONTRACTS_ERROR', error: error });
};
