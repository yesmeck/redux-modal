import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'react-bootstrap'
import BootstrapModal from './BootstrapModal'
import { Button as AntdButton } from 'antd'
import AntdModal from './AntdModal'
import hocModal from './hocModal'

class App extends Component {
  handleOpen = name => () => {
    this.props.show(name, { message: `This is a ${name} modal` })
  };

  render() {
    const HOCModal = hocModal('hoc')

    return (
      <div>
        <p>
          <Button bsStyle="primary" onClick={this.handleOpen('bootstrap')}>Launch bootstrap modal</Button>
          <BootstrapModal />
        </p>
        <br />
        <p>
          <AntdButton type="primary" onClick={this.handleOpen('antd')}>Launch antd modal</AntdButton>
          <AntdModal />
        </p>
        <br />
        <p>
          <Button bsStyle="primary" onClick={this.handleOpen('hoc')}>Launch hoc modal</Button>
          <HOCModal />
        </p>
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

