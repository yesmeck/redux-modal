# API

## connectModal(config)

Connect a modal component to redux store.

### Arguments

* `config`(Object)
  * `name`(String)(Require) The modal name.
  * `resolve`(Function) Things you want to resolve before show your modal, if return a promise, the modal will show after the promise resolved.
  * `destroyOnHide`(Bool) Weather destroy the modal state and umount the modal after hide.

### Returns

A React component class that injects modal state and `handleHide` action creator into your modal component.

### Example

```javascript
export default connectModal({ name: 'myModal' })(MyModal)
```

It will pass the modal state and a `handleHide` action creator as props to your modal component.

## reducer

The modal reducer. Should be given to mounted to your Redux state at `modal`.

### Example

```javascript
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

export default combineReducers({
  ...yourOtherReducers,
  modal
})
```

## show(name, props)

The show modal action creator.

### Arguments

* `name`(String) The name of modal to show.
* `props`(Object) Props pass to your modal.

## hide(name)

The hide modal action creator.

### Arguments

* `name`(String) The name of modal to hide.
