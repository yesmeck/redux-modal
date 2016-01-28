import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class HelloModal extends Component {
  render() {
    const { modal, handleHide } = this.props

    return (
      <Modal show={modal.show}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleHide}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connectModal('hello')(HelloModal)
