export const SETTINGS_SAVE = 'SETTINGS_SAVE';

export function saveSettingsAction(data) {
  return {
    type: SETTINGS_SAVE,
    data,
  };
}
