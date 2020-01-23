// actions - homepage
//

// external dependencies
//
const _ = require('lodash');
const axios = require('axios');
import { normalize } from 'normalizr';

import { tagSchema } from 'utils/schema';

export const fetchTags = (query = null) => (dispatch) => {
  let q = '';
  if (query) q = 'query=' + query;

  axios
    .get(`/api/v1/tags?${q}`)
    .then((response) => fetchTagsSuccess(response.data)(dispatch))
    .catch((error) => fetchTagsError(error)(dispatch));
};

const fetchTagsSuccess = (tags) => (dispatch) => {
  const normalizedData = normalize(tags, [tagSchema]);

  dispatch({
    type: 'FETCH_TAGS_SUCCESS',
    payload: normalizedData,
  });
};

const fetchTagsError = (error) => (dispatch) => {
  dispatch({ type: 'FETCH_TAGS_ERROR', error: error });
};
