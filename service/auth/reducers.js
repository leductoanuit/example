// @flow
import {AUTH, INVALIDATE, LOGOUT} from './action';
type State = {
  isAuth: boolean,
  token: string,
  username: string,
  error: any,
  lang: string,
  sysRoles: any[],
  sysPerms: any[],
};

const initialState = {
  isAuth: false,
  token: '',
  username: '',
  error: null,
  lang: 'en',
  sysRoles: [],
  sysPerms: [],
};

export default function authReducer(
  state: State = initialState,
  action: any,
): any {
  switch (action.type) {
    case AUTH: {
      // console.log('action data', action.data);
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    }
    case INVALIDATE: {
      return {
        ...state,
        isAuth: false,
      };
    }
    case LOGOUT: {
      console.log('logging out');
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
