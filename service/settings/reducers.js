import {SETTINGS_SAVE} from './actions';
const initialState = {
  //apiUrl: 'http://localhost:8100',
  apiUrl: '/pos-api',
  apiVersion: 'v1',
  lang: 'en',
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_SAVE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
