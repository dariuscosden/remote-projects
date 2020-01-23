// actions - homepage
//

// internal dependencies
//
import history from 'utils/history';

// external dependencies
//
const _ = require('lodash');
const axios = require('axios');
import { normalize } from 'normalizr';

import { projectSchema } from 'utils/schema';

export const sendProjectPreview = (formState, projectId) => (dispatch) => {
  // form data
  const formData = new FormData();
  _.keys(formState).map((field) => {
    formData.append(field, formState[field].value);
  });

  // project id
  if (projectId) formData.append('project_id', projectId);

  axios
    .post(`/api/v1/project-preview`, formData)
    .then((response) =>
      sendProjectPreviewSuccess(response.data, formState)(dispatch),
    )
    .catch((error) => sendProjectPreviewError(error)(dispatch));
};

const sendProjectPreviewSuccess = (projects, formState) => (dispatch) => {
  const normalizedData = normalize(projects, [projectSchema]);

  const payload = {
    normalizedData: normalizedData,
    formState: formState,
  };

  dispatch({
    type: 'SEND_PROJECT_PREVIEW_SUCCESS',
    payload: payload,
  });

  history.push('/post/preview');
};

const sendProjectPreviewError = (error) => (dispatch) => {
  dispatch({ type: 'SEND_PROJECT_PREVIEW_ERROR', error: error });
};
