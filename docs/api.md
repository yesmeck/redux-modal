# API

## connectModal(name)

Connect a modal component to redux store.

### Arguments

* `name`(String): The modal name

### Returns

A React component class that injects modal state and `handleHide` action creator into your modal component.

### Example

```javascript
export default connectModal('myModal')(MyModal)
```

It will pass the modal state and a `handleHide` action creator as props to your modal component.

## reducer

The modal reducer. Should be given to mounted to your Redux state at `modal`.

### Example

```javascript
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

export default combineReducers({
  modal
})
```

## show(name)

The show modal action creator.

## hide(name)

The hide modal action creator.
