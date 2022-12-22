type State = {};
const initialState: State = {};

export default function globalReducer(
  state: State = initialState,
  action: any,
): any {
  switch (action.type) {
    default:
      return state;
  }
}
