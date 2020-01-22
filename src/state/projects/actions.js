// actions - homepage
//

// external dependencies
//
const _ = require('lodash');
const axios = require('axios');
import { normalize } from 'normalizr';

import { projectSchema } from 'utils/schema';

export const fetchProjects = () => (dispatch) => {
  axios
    .get(`/api/v1/projects`)
    .then((response) => fetchProjectsSuccess(response.data)(dispatch))
    .catch((error) => fetchProjectsError(error)(dispatch));
};

const fetchProjectsSuccess = (projects) => (dispatch) => {
  const normalizedData = normalize(projects, [projectSchema]);

  dispatch({
    type: 'FETCH_PROJECTS_SUCCESS',
    payload: normalizedData,
  });
};

const fetchProjectsError = (error) => (dispatch) => {
  dispatch({ type: 'FETCH_PROJECTS_ERROR', error: error });
};
