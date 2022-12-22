// @flow
import {LANG_TOGGLE, APP_UPDATE, APP_CLEAN} from './action';
type State = {
  langChanged: boolean,
  search: string,
  pages: any,
  prodRec: any,
  errorRec: any,
};
const initialState: State = {
  langChanged: false,
  search: '',
  pages: {},
  prodRec: {},
  prodRecMd:{},
  errorRec: {},
  facFilter: {},
};

export default function appReducer(
  state: State = initialState,
  action: any,
): any {
  switch (action.type) {
    case LANG_TOGGLE: {
      return {
        ...state,
        langChanged: !state.langChanged,
      };
    }
    case APP_UPDATE: {
      // console.log('update app data action', action);
      return {
        ...state,
        ...action.data,
      };
    }
    case APP_CLEAN: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
