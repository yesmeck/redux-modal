import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import { init, hide, destroy } from './actions'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function isPromise(thing) {
  return 'function' === typeof thing.then
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
        if (!modal || !modal.show) {
          return this.hide()
        }
        if (!resolve) {
          this.show()
        }
        if (resolve) {
          const resolveResult = resolve({ store, params: modal.params })
          if (!isPromise(resolveResult)) { return this.show() }
          resolveResult.then(() => {
            this.show()
          })
        }
      }

      componentWillUnmount() {
        this.props.destroy(name)
      }

      show() {
        this.setState({ show: true })
      }

      hide() {
        this.setState({ show: false })
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
