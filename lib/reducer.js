'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
var actionTypes_1 = require('./actionTypes');
var initialState = {};
exports.default = function(state, action) {
  if (state === void 0) {
    state = initialState;
  }
  if (action === void 0) {
    action = {};
  }
  var _a, _b;
  switch (action.type) {
    case actionTypes_1.SHOW:
      return __assign(
        {},
        state,
        ((_a = {}),
        (_a[action.payload.modal] = {
          show: true,
          props: action.payload.props,
        }),
        _a)
      );
    case actionTypes_1.HIDE:
      return __assign(
        {},
        state,
        ((_b = {}),
        (_b[action.payload.modal] = __assign({}, state[action.payload.modal], {
          show: false,
        })),
        _b)
      );
    case actionTypes_1.DESTROY:
      var nextState = __assign({}, state);
      delete nextState[action.payload.modal];
      return nextState;
    default:
      return state;
  }
};
