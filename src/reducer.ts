import { SHOW, HIDE, DESTROY } from './actionTypes';
import { ReduxModalState } from './interface';

const initialState = {};

export default (state: ReduxModalState = initialState, action: any = {}) => {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [action.payload.modal]: {
          show: true,
          props: action.payload.props,
        },
      };
    case HIDE:
      return {
        ...state,
        [action.payload.modal]: {
          ...state[action.payload.modal],
          show: false,
        },
      };
    case DESTROY:
      const nextState = { ...state };
      delete nextState[action.payload.modal];
      return nextState;
    default:
      return state;
  }
};
