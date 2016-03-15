import Immutable from 'seamless-immutable'
import { SHOW, HIDE, DESTROY } from './actionTypes'

const initialState = Immutable({})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW:
      return state.merge({
        [action.payload.modal]: {
          show: true,
          props: action.payload.props
        }
      })
    case HIDE:
      return state.merge({
        [action.payload.modal]: {
          show: false
        }
      }, { deep: true })
    case DESTROY:
      return state.without(action.payload.modal)
    default:
      return state
  }
}
