'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
exports.getDisplayName = getDisplayName;
function isPromise(thing) {
  try {
    return typeof thing.then === 'function';
  } catch (e) {
    return false;
  }
}
exports.isPromise = isPromise;
function isUndefined(thing) {
  return typeof thing === 'undefined';
}
exports.isUndefined = isUndefined;
