'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var actionTypes_1 = require('./actionTypes');
function show(modal, props) {
  if (props === void 0) {
    props = {};
  }
  return {
    type: actionTypes_1.SHOW,
    payload: {
      modal: modal,
      props: props,
    },
  };
}
exports.show = show;
function hide(modal) {
  return {
    type: actionTypes_1.HIDE,
    payload: {
      modal: modal,
    },
  };
}
exports.hide = hide;
function destroy(modal) {
  return {
    type: actionTypes_1.DESTROY,
    payload: {
      modal: modal,
    },
  };
}
exports.destroy = destroy;
