import { DISPLAY_SPINNER, CLEAR_SPINNER,TOGGLE_SIDEBAR ,GET_USER,UPDATE_USER } from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_SPINNER) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CLEAR_SPINNER) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type ===GET_USER) {
    return {
      ...state,
      user:action.payload.data,
    };
  }
  if (action.type ===UPDATE_USER) {
    return {
      ...state,
      user:action.payload.data,
    };
  }
};
export default reducer;
