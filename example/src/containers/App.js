import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'react-bootstrap'
import HelloModal from './HelloModal'

class App extends Component {
  handleClick = () => {
    this.props.show('hello', { name: 'Ava' })
  };

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleClick}>Launch demo modal</Button>
        <HelloModal />
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({ show }, dispatch)
  })
)(App)

