import { SHOW, HIDE, DESTROY } from "./actionTypes";

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [action.payload.modal]: {
          show: true,
          props: action.payload.props
        }
      };
    case HIDE:
      return {
        ...state,
        [action.payload.modal]: {
          ...state[action.payload.modal],
          show: false
        }
      };
    case DESTROY:
      return {
        ...state,
        [action.payload.modal]: undefined
      };
    default:
      return state;
  }
};
