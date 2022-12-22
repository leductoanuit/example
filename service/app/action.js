// @flow
export const LANG_TOGGLE = 'LANG_TOGGLE';
export const APP_UPDATE = 'APP_UPDATE';
export const APP_CLEAN = 'APP_CLEAN';
export function toggleLangChanged(): any {
  return {
    type: LANG_TOGGLE,
    data: {},
  };
}

export function updateAppAction(data: any): any {
  return {
    type: APP_UPDATE,
    data,
  };
}

export function cleanAppAction(): any {
  return {
    type: APP_CLEAN,
    data: {},
  };
}
