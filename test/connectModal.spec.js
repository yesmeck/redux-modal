import expect, { createSpy } from 'expect'
import { mount } from 'enzyme'
import React, { Children, Component, PropTypes } from 'react'
import { createStore, combineReducers } from 'redux'
import connectModal from '../src/connectModal'
import reducer from '../src/reducer'
import { INIT, HIDE, DESTROY } from '../src/actionTypes'
import { show } from '../src/actions'

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

  let WrappedMyModal = connectModal({ name: 'myModal' })(MyModal)

  it('initialize modal state before mount', () => {
    const mockReducer = createSpy().andReturn({})
    const finalReducer = combineReducers({ modal: mockReducer })
    const store = createStore(finalReducer)

    mount(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )

    const calls = mockReducer.calls

    expect(calls[calls.length - 1].arguments).toEqual([
      {},
      { type: INIT, payload: { modal: 'myModal' } }
    ])
  })

  it('destroy modal state before unmount', () => {
    const mockReducer = createSpy().andReturn({})
    const finalReducer = combineReducers({ modal: mockReducer })
    const store = createStore(finalReducer)

    const wrapper = mount(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )

    wrapper.unmount()

    const calls = mockReducer.calls
    expect(calls[calls.length - 1].arguments).toEqual([
      {},
      { type: DESTROY, payload: { modal: 'myModal' } }
    ])
  })

  it('pass modal state to the given component', () => {
    const finalReducer = combineReducers({
      modal: () => ({ myModal: { show: true, params: {} } })
    })

    const store = createStore(finalReducer)

    const wrapper = mount(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )

    expect(wrapper.find(MyModal).props().modal).toEqual({ show: true, params: {} })
  })

  it('pass handleHide to the given component', () => {
    const initialState = { myModal: { params: {}, show: true } }
    const mockReducer = createSpy().andReturn(initialState)
    const finalReducer = combineReducers({ modal: mockReducer })
    const store = createStore(finalReducer)

    const wrapper = mount(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )

    wrapper.find(MyModal).props().handleHide()

    const calls = mockReducer.calls
    expect(calls[calls.length - 1].arguments).toEqual([
      initialState,
      { type: HIDE, payload: { modal: 'myModal' } }
    ])
  })

  it('reslove the promise before show', () => {
    const finalReducer = combineReducers({ modal: reducer })
    const store = createStore(finalReducer)
    const apiCall = createSpy().andReturn(new Promise(resolve => resolve()))

    WrappedMyModal = connectModal({
      name: 'myModal',
      reslove: apiCall
    })(MyModal)

    mount(
      <ProviderMock store={store}>
        <WrappedMyModal />
      </ProviderMock>
    )
    const params = { hello: 'Ava' }
    store.dispatch(show('myModal', params))
    expect(apiCall.calls[0].arguments).toEqual([ { store, params } ])
  })
})
