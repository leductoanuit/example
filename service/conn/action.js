export const API_HELLO = 'API_HELLO';
export const API_HELLO_COMP = 'API_HELLO_COMP';
export const API_HELLO_ERR = 'API_HELLO_ERR';

export function helloAction() {
  return {
    type: API_HELLO,
    data: {},
  };
}
