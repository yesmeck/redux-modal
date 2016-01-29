import expect, { createSpy } from 'expect'
import TestUtils from 'react-addons-test-utils'
import React, { Children, Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import connectModal from '../src/connectModal'
import { INIT, HIDE, DESTROY } from '../src/actionTypes'

describe('connectModal', () => {
  class ProviderMock extends Component {
    static childContextTypes = {
      store: PropTypes.object.isRequired
    };

    getChildContext() {
      return { store: this.props.store }
    }

    render() {
      return Children.only(this.props.children)
    }
  }

  class Modal extends Component {
    static propTypes = {
      show: PropTypes.bool.isRequired
    };

    render() {
      const { show } = this.props
      return (
        <div>{show}</div>
      )
    }
  }

  class MyModal extends Component {
    render() {
      const { modal: { show } } = this.props

      return (
        <Modal show={show} />
      )
    }
  }

  const WrappedMyModal = connectModal('myModal')(MyModal)

  it('initialize modal state before mount', () => {
    const modalReducer = createSpy().andReturn({})
    const reducer = combineReducers({ modal: modalReducer })
    const store = createStore(reducer)

    TestUtils.renderIntoDocument(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )
    const calls = modalReducer.calls
    expect(calls[calls.length - 1].arguments).toEqual([
      {},
      { type: INIT, payload: { modal: 'myModal' } }
    ])
  })

  it('destroy modal state before unmount', () => {
    const modalReducer = createSpy().andReturn({})
    const reducer = combineReducers({ modal: modalReducer })
    const store = createStore(reducer)

    var container = document.createElement('div')
    ReactDOM.render(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    , container)
    ReactDOM.unmountComponentAtNode(container)

    const calls = modalReducer.calls
    expect(calls[calls.length - 1].arguments).toEqual([
      {},
      { type: DESTROY, payload: { modal: 'myModal' } }
    ])
  })

  it('pass modal state to the given component', () => {
    const reducer = combineReducers({
      modal: () => ({ myModal: { show: true, params: {} } })
    })

    const store = createStore(reducer)

    const container = TestUtils.renderIntoDocument(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )
    const stub = TestUtils.findRenderedComponentWithType(container, MyModal)

    expect(stub.props.modal).toEqual({ show: true, params: {} })
  })

  it('pass handleHide to the given component', () => {
    const initialState = { myModal: { params: {}, show: true } }
    const modalReducer = createSpy().andReturn(initialState)
    const reducer = combineReducers({ modal: modalReducer })
    const store = createStore(reducer)

    const container = TestUtils.renderIntoDocument(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )
    const stub = TestUtils.findRenderedComponentWithType(container, MyModal)
    stub.props.handleHide()
    const calls = modalReducer.calls
    expect(calls[calls.length - 1].arguments).toEqual([
      initialState,
      { type: HIDE, payload: { modal: 'myModal' } }
    ])
  })
})
