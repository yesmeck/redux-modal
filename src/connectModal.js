import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import { init, hide, destroy } from './actions'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default name => {
  return WrappedComponent => {
    const defaultModal = { show: false, params: {} }

    class ConnectModal extends Component {
      static displayName = `ConnectModal(${getDisplayName(WrappedComponent)})`;

      static propTypes = {
        modal: PropTypes.object
      };

      componentWillMount() {
        this.props.init(name)
      }

      componentWillUnmount() {
        this.props.destroy(name)
      }

      handleHide = () => {
        this.props.hide(name)
      };

      render() {
        const modal = this.props.modal || defaultModal

        return (
          <WrappedComponent modal={modal} handleHide={this.handleHide} />
        )
      }
    }

    return connect(
      state => ({
        modal: state.modal[name]
      }),
      dispatch => ({ ...bindActionCreators({ init, hide, destroy }, dispatch) })
    )(hoistStatics(ConnectModal, WrappedComponent))
  }
}
