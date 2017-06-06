import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class MyModal extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired
  };

  render() {
    const { show, handleHide, message } = this.props

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { message }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleHide}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleClose}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class DynamicModal extends Component {
  render() {
    const { name } = this.props
    const WrappedMyModal = connectModal({ name })(MyModal)
    return <WrappedMyModal />
  }
}
