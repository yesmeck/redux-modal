import React, { Component, PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class HelloModal extends Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired
  };

  handleClose = () => {
    this.props.handleHide()
  };

  render() {
    const { modal: { show, params } } = this.props

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { params.name }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleClose}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connectModal({
  name: 'hello',
  resolve: () => {
    return new Promise((resolve) => {
      console.log('resloving async task')
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
})(HelloModal)
