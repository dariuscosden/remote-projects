// reducer - homepage
//

const initialState = {
  loading: false,
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
    case 'SET_POST_LOADING': {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case 'RESET_POST_LOADING': {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    case 'FETCH_TAGS_SUCCESS': {
      return Object.assign({}, state, {
        tags: action.payload.result,
      });
    }

    // project preview
    case 'SEND_PROJECT_PREVIEW': {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case 'SEND_PROJECT_PREVIEW_SUCCESS': {
      return Object.assign({}, state, {
        loading: false,
        projectId: action.payload.normalizedData.result[0],
        formState: action.payload.formState,
      });
    }

    case 'SEND_PROJECT_PREVIEW_ERROR': {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    // send payment intent
    case 'SEND_PAYMENT_INTENT': {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case 'SEND_PAYMENT_INTENT_SUCCESS': {
      return Object.assign({}, state, {
        client_secret: action.payload.client_secret,
        payment_intent_id: action.payload.payment_intent_id,
      });
    }

    case 'SEND_PAYMENT_INTENT_ERROR': {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    case 'SEND_PUBLISH_PROJECT_SUCCESS': {
      return initialState;
    }

    case 'SEND_PROJECT_PREVIEW_ERROR': {
      return Object.assign({}, state, {
        loading: false,
      });
    }
  }

  return state;
}
