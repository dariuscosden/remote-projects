// reducer - homepage
//

const initialState = {
  tags: [],
  projectId: null,
  formState: {
    title: { value: '', error: '' },
    company_name: { value: '', error: '' },
    company_email: { value: '', error: '' },
    company_location: { value: '', error: '' },
    restrictions: { value: '', error: '' },
    link: { value: '', error: '' },
    description: { value: '', error: '' },
    tags: { value: '', error: '' },
  },
  client_secret: null,
  payment_intent_id: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TAGS_SUCCESS': {
      return Object.assign({}, state, {
        tags: action.payload.result,
      });
    }

    case 'SEND_PROJECT_PREVIEW_SUCCESS': {
      return Object.assign({}, state, {
        projectId: action.payload.normalizedData.result[0],
        formState: action.payload.formState,
      });
    }

    case 'SEND_PAYMENT_INTENT_SUCCESS': {
      return Object.assign({}, state, {
        client_secret: action.payload.client_secret,
        payment_intent_id: action.payload.payment_intent_id,
      });
    }

    case 'SEND_PUBLISH_PROJECT_SUCCESS': {
      return initialState;
    }
  }

  return state;
}
