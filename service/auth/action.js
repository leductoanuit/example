// @flow
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const INVALIDATE = 'INVALIDATE';

export function authAction(data: any): any {
  return {
    type: AUTH,
    data,
  };
}

export function invalidateAction(): any {
  return {
    type: INVALIDATE,
    data: {},
  };
}

export function logoutAction(): any {
  return {
    type: LOGOUT,
    data: {},
  };
}
