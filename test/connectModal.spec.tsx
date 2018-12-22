import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStore, combineReducers } from 'redux';
import { mount } from 'enzyme';
import connectModal from '../src/connectModal';
import reducer from '../src/reducer';
import { show, hide, destroy } from '../src/actions';
import { InjectedProps } from '../src/interface';
import { Provider } from 'react-redux';

describe('connectModal', () => {
  class Modal extends React.Component<{ show: boolean }> {
    static propTypes = {
      show: PropTypes.bool.isRequired,
    };

    render() {
      const { show } = this.props;
      return <div>{show}</div>;
    }
  }

  interface MyModalProps extends InjectedProps {
    hello?: string;
  }

  class MyModal extends React.Component<MyModalProps> {
    render() {
      const { show } = this.props;

      return <Modal show={show} />;
    }
  }

  const SampleModal = connectModal({ name: 'myModal' })(MyModal);
  let WrappedMyModal = SampleModal;

  afterEach(() => {
    WrappedMyModal = SampleModal;
  });

  it('render null at first mount', () => {
    const finalReducer = () => ({ modal: {} });
    const store = createStore(finalReducer);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    expect(wrapper.html()).toEqual(null);
  });

  it('mount modal after dispatch show action', () => {
    const finalReducer = combineReducers({ modal: reducer });
    const store = createStore(finalReducer);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    expect(wrapper.html()).toEqual(null);

    store.dispatch(show('myModal'));
    wrapper.update();

    expect(wrapper.find(MyModal).length).toEqual(1);
  });

  it('destroy after dispatch hide action if destroyOnHide is true', () => {
    const finalReducer = combineReducers({ modal: reducer });
    const store = createStore(finalReducer);
    WrappedMyModal = connectModal({ name: 'myModal', destroyOnHide: true })(
      MyModal
    );

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    store.dispatch(show('myModal'));
    store.dispatch(hide('myModal'));

    expect(wrapper.html()).toEqual(null);
  });

  it('can mount modal reducer to a custom location in state', () => {
    const finalReducer = combineReducers({ customModals: reducer });
    const store = createStore(finalReducer);
    WrappedMyModal = connectModal({
      name: 'myModal',
      getModalState: state => state.customModals,
    })(MyModal);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    expect(wrapper.html()).toEqual(null);

    store.dispatch(show('myModal'));
    wrapper.update();

    expect(wrapper.find(MyModal).length).toEqual(1);
  });

  it('destroy modal state before unmount', () => {
    const mockReducer = jest.fn(() => ({}));
    const finalReducer = combineReducers({ modal: mockReducer });
    const store = createStore(finalReducer);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    wrapper.unmount();

    expect(mockReducer).toBeCalledWith({}, destroy('myModal'));
  });

  it('pass modal state to the given component', () => {
    const finalReducer = combineReducers({
      modal: () => ({ myModal: { show: true, props: {} } }),
    });

    const store = createStore(finalReducer);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    expect(wrapper.find(MyModal).props().show).toEqual(true);
  });

  it('pass handleHide to the given component', () => {
    const initialState = { myModal: { props: {}, show: true } };
    const mockReducer = jest.fn(() => initialState);
    const finalReducer = combineReducers({ modal: mockReducer });
    const store = createStore(finalReducer);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    wrapper
      .find(MyModal)
      .props()
      .handleHide();

    expect(mockReducer).toBeCalledWith(initialState, hide('myModal'));
  });

  it('resolve the promise before show', () => {
    const finalReducer = combineReducers({ modal: reducer });
    const store = createStore(finalReducer);
    const apiCall = jest.fn(() => new Promise(resolve => resolve()));

    WrappedMyModal = connectModal({
      name: 'myModal',
      resolve: apiCall,
    })(MyModal);

    mount(
      <Provider store={store}>
        <WrappedMyModal />
      </Provider>
    );

    const props = { hello: 'Ava' };

    store.dispatch(show('myModal', props));

    expect(apiCall).toBeCalledWith({ props });
  });

  it('should pass props to wrapped modal', () => {
    const finalReducer = combineReducers({
      modal: () => ({ myModal: { show: true, props: {} } }),
    });
    const store = createStore(finalReducer);

    WrappedMyModal = connectModal({ name: 'myModal' })(MyModal);

    const wrapper = mount(
      <Provider store={store}>
        <WrappedMyModal hello="ava" />
      </Provider>
    );

    expect(wrapper.find(MyModal).props().hello).toEqual('ava');
  });
});
