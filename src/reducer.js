import Immutable from 'seamless-immutable'
import { INIT, SHOW, HIDE, DESTROY } from './actionTypes'

const initialState = Immutable({})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT:
      return state.merge({
        [action.payload.modal]: {
          show: false,
          params: {}
        }
      })
    case SHOW:
      return state.merge({
        [action.payload.modal]: {
          show: true,
          params: action.payload.params
        }
      })
    case HIDE:
      return state.merge({
        [action.payload.modal]: {
          show: false
        }
      })
    case DESTROY:
      return state.without(action.payload.modal)
    default:
      return state
  }
}
