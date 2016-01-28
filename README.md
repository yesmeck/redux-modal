```javascript
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showModal, connectModal } from 'redux-modal'

@connect(
  null,
  dispatch => ({
    ...bindActionCreators({ showModal }, dispatch)
  })
)
class App extens Component {
  handleShow = () => {
    this.props.showModal('myModal')
  }

  render(
    <div>
      <button onClick={this.handleShow}>Show Modal</button>
    </div>
  )
}

function loadData(dispatch, getState, params, cb) {

}

@connectModal('myModal', { onOpen: loadData })
class MyModal extens Component {
  render(
    <ModalComponent show>
      <div className="content">Hello</div>
    </ModalComponent>
  )
}
```
