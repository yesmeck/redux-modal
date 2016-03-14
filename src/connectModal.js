import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import { init, hide, destroy } from './actions'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function connectModal({ name, resolve }) {
  return WrappedComponent => {
    class ConnectModal extends Component {
      static displayName = `ConnectModal(${getDisplayName(WrappedComponent)})`;

      static propTypes = {
        modal: PropTypes.object
      };

      static contextTypes = {
        store: PropTypes.object.isRequired
      };

      constructor(props, context) {
        super(props, context)

        const { modal } = props

        this.state = { show: modal && modal.show }
      }

      componentWillMount() {
        this.props.init(name)
      }

      componentWillReceiveProps(nextProps) {
        const { modal } = nextProps
        const { store } = this.context
        if (modal && modal.show) {
          if (resolve) {
            resolve({ store, params: modal.params }).then(() => {
              this.setState({ show: true })
            })
          } else {
            this.setState({ show: true })
          }
        } else {
          this.setState({ show: false })
        }
      }

      componentWillUnmount() {
        this.props.destroy(name)
      }

      handleHide = () => {
        this.props.hide(name)
      };

      render() {
        if (!this.state.show) { return null }

        const { modal, ...passedProps } = this.props

        return (
          <WrappedComponent {...passedProps} modal={modal} handleHide={this.handleHide} />
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
