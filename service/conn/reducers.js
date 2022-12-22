import {API_HELLO, API_HELLO_COMP, API_HELLO_ERR} from './action';

const initialState = {
  isLoading: false,
  isOK: false,
};

export default function connReducer(state = initialState, action) {
  switch (action.type) {
    case API_HELLO:
      return {
        ...state,
        isOK: false,
        isLoading: true,
      };
    case API_HELLO_COMP:
      return {
        ...state,
        isLoading: false,
        isOK: true,
      };
    case API_HELLO_ERR:
      return {
        ...state,
        isLoading: false,
        isOK: false,
      };
    default:
      return state;
  }
}
