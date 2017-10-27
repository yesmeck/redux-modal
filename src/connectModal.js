import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import { hide, destroy } from "./actions";
import { getDisplayName, isPromise, isUndefined } from "./utils";

const INITIAL_MODAL_STATE = {};

export default function connectModal({
  name,
  getModalState = state => state.modal,
  resolve,
  destroyOnHide = true
}) {
  return WrappedComponent => {
    class ConnectModal extends Component {
      static displayName = `ConnectModal(${getDisplayName(WrappedComponent)})`;

      static propTypes = {
        modal: PropTypes.object.isRequired
      };

      static contextTypes = {
        store: PropTypes.object.isRequired
      };

      constructor(props, context) {
        super(props, context);

        const { modal: { show } } = props;

        this.state = { show };
      }

      componentWillReceiveProps(nextProps) {
        const { modal } = nextProps;
        const { store } = this.context;

        if (isUndefined(modal.show)) {
          return this.unmount();
        }

        if (!modal.show) {
          return destroyOnHide ? this.props.destroy(name) : this.hide();
        }

        if (!resolve) {
          this.show();
        }

        if (resolve) {
          const resolveResult = resolve({ store, props: modal.props });
          if (!isPromise(resolveResult)) {
            return this.show();
          }
          resolveResult.then(() => {
            this.show();
          });
        }
      }

      componentWillUnmount() {
        this.props.destroy(name);
      }

      show() {
        this.setState({ show: true });
      }

      hide() {
        this.setState({ show: false });
      }

      unmount() {
        this.setState({ show: undefined });
      }

      handleHide = () => {
        this.props.hide(name);
      };

      handleDestroy = () => {
        this.props.destroy(name);
      };

      render() {
        const { show } = this.state;
        const { modal, hide, destroy, ...ownProps } = this.props;

        if (isUndefined(show)) {
          return null;
        }

        return (
          <WrappedComponent
            {...ownProps}
            {...modal.props}
            show={show}
            handleHide={this.handleHide}
            handleDestroy={this.handleDestroy}
          />
        );
      }
    }

    return connect(
      state => ({
        modal: getModalState(state)[name] || INITIAL_MODAL_STATE
      }),
      dispatch => ({ ...bindActionCreators({ hide, destroy }, dispatch) })
    )(hoistStatics(ConnectModal, WrappedComponent));
  };
}
