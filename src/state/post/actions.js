// actions - homepage
//

// external dependencies
//
const _ = require('lodash');
const axios = require('axios');
import { normalize } from 'normalizr';

// internal dependencies
//
import history from 'utils/history';

import { projectSchema } from 'utils/schema';

// SEND PROJECT REVIEW
//
export const sendProjectPreview = (formState, projectId) => (dispatch) => {
  // form data
  const formData = new FormData();
  _.keys(formState).map((field) => {
    formData.append(field, formState[field].value);
  });

  // project id
  if (projectId) formData.append('project_id', projectId);

  axios
    .post(`/api/v1/project_preview`, formData)
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

// SEND PAYMENT INTENT
//
export const sendPaymentIntent = (source, email) => (dispatch) => {
  // form data
  const formData = new FormData();
  formData.append('source', source);
  formData.append('email', email);

  axios
    .post(`/api/v1/payment_intent`, formData)
    .then((response) => sendPaymentIntentSuccess(response.data)(dispatch))
    .catch((error) => sendPaymentIntentError(error)(dispatch));
};

const sendPaymentIntentSuccess = (response) => (dispatch) => {
  dispatch({
    type: 'SEND_PAYMENT_INTENT_SUCCESS',
    payload: {
      client_secret: response.client_secret,
      payment_intent_id: response.payment_intent_id,
    },
  });
};

const sendPaymentIntentError = (error) => (dispatch) => {
  dispatch({ type: 'SEND_PAYMENT_INTENT_ERROR', error: error });
};

// SEND PUBLISH PROJECT
//
export const sendPublishProject = (id) => (dispatch) => {
  // form data
  const formData = new FormData();
  formData.append('id', id);

  axios
    .post(`/api/v1/publish_project`, formData)
    .then((response) => sendPublishProjectSuccess(response.data)(dispatch))
    .catch((error) => sendPublishProjectError(error)(dispatch));
};

const sendPublishProjectSuccess = (projects) => (dispatch) => {
  const normalizedData = normalize(projects, [projectSchema]);

  dispatch({
    type: 'SEND_PUBLISH_PROJECT_SUCCESS',
    payload: normalizedData,
  });

  history.push('/');
};

const sendPublishProjectError = (error) => (dispatch) => {
  dispatch({ type: 'SEND_PUBLISH_PROJECT_ERROR', error: error });
};
