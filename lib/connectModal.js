'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var PropTypes = require('prop-types');
var redux_1 = require('redux');
var react_redux_1 = require('react-redux');
var actions_1 = require('./actions');
var utils_1 = require('./utils');
var hoistStatics = require('hoist-non-react-statics');
var INITIAL_MODAL_STATE = {};
function connectModal(_a) {
  var name = _a.name,
    _b = _a.getModalState,
    getModalState =
      _b === void 0
        ? function(state) {
            return state.modal;
          }
        : _b,
    resolve = _a.resolve,
    _c = _a.destroyOnHide,
    destroyOnHide = _c === void 0 ? true : _c;
  return function(WrappedComponent) {
    var ConnectModal = /** @class */ (function(_super) {
      __extends(ConnectModal, _super);
      function ConnectModal() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = {
          show: _this.props.modal.show,
        };
        _this.handleHide = function() {
          _this.props.hide(name);
        };
        _this.handleDestroy = function() {
          _this.props.destroy(name);
        };
        return _this;
      }
      ConnectModal.prototype.componentWillReceiveProps = function(nextProps) {
        var _this = this;
        var modal = nextProps.modal;
        if (utils_1.isUndefined(modal.show)) {
          return this.unmount();
        }
        if (!modal.show) {
          return destroyOnHide ? this.props.destroy(name) : this.hide();
        }
        if (!resolve) {
          this.show();
        }
        if (resolve) {
          var resolveResult = resolve({ props: modal.props });
          if (!utils_1.isPromise(resolveResult)) {
            return this.show();
          }
          resolveResult.then(function() {
            _this.show();
          });
        }
      };
      ConnectModal.prototype.componentWillUnmount = function() {
        this.props.destroy(name);
      };
      ConnectModal.prototype.show = function() {
        this.setState({ show: true });
      };
      ConnectModal.prototype.hide = function() {
        this.setState({ show: false });
      };
      ConnectModal.prototype.unmount = function() {
        this.setState({ show: undefined });
      };
      ConnectModal.prototype.render = function() {
        var show = this.state.show;
        var _a = this.props,
          modal = _a.modal,
          hide = _a.hide,
          destroy = _a.destroy,
          ownProps = __rest(_a, ['modal', 'hide', 'destroy']);
        if (utils_1.isUndefined(show)) {
          return null;
        }
        return React.createElement(
          WrappedComponent,
          __assign({}, ownProps, modal.props, {
            show: show,
            handleHide: this.handleHide,
            handleDestroy: this.handleDestroy,
          })
        );
      };
      ConnectModal.displayName =
        'ConnectModal(' + utils_1.getDisplayName(WrappedComponent) + ')';
      ConnectModal.propTypes = {
        modal: PropTypes.object.isRequired,
      };
      return ConnectModal;
    })(React.Component);
    return react_redux_1.connect(
      function(state) {
        return {
          modal: getModalState(state)[name] || INITIAL_MODAL_STATE,
        };
      },
      function(dispatch) {
        return __assign(
          {},
          redux_1.bindActionCreators(
            { hide: actions_1.hide, destroy: actions_1.destroy },
            dispatch
          )
        );
      }
    )(hoistStatics(ConnectModal, WrappedComponent));
  };
}
exports.default = connectModal;
