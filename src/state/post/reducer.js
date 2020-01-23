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
  }

  return state;
}
