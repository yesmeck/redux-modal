import React, { Component, PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class HelloModal extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired
  };

  handleClose = () => {
    this.props.handleHide()
  };

  render() {
    const { show, name } = this.props

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { name }
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
