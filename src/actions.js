import { SHOW, HIDE, DESTROY } from "./actionTypes";

export function show(modal, props = {}) {
  return {
    type: SHOW,
    payload: {
      modal,
      props
    }
  };
}

export function hide(modal) {
  return {
    type: HIDE,
    payload: {
      modal
    }
  };
}

export function destroy(modal) {
  return {
    type: DESTROY,
    payload: {
      modal
    }
  };
}
