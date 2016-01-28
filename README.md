# Redux Modal

Redux based modal.

Works with any React Modal Components.

## Setup

### Installation

```
npm install --save re-notif
```

### Mount reducer

```
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

export default combineReducers({
  modal
  ...other reducers
})
```

### Create modal component

```javascript
import { Modal } from 'some-modal-compoent'

class MyModal extens Component {
  render(
    const { modal: { show } } = this.props

    <Modal show>
      <div class="header">Hello</div>
      <div className="content">World</div>
      <div class="actions">
        <button onClick=>Close</button>
      </div>
    </Modal>
  )
}

export default connectModal('myModal')
```

### Lunch your modal component

```javascript
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show as showModal } from 'redux-modal'

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
```
