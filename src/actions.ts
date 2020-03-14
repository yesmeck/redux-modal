import { SHOW, HIDE, DESTROY } from './actionTypes';

export function show<T = {}>(modal: string, props?: T) {
  return {
    type: SHOW,
    payload: {
      modal,
      props: props || {},
    },
  };
}

export function hide(modal: string) {
  return {
    type: HIDE,
    payload: {
      modal,
    },
  };
}

export function destroy(modal: string) {
  return {
    type: DESTROY,
    payload: {
      modal,
    },
  };
}
