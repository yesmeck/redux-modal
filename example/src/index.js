import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import DevTools from './containers/DevTools';

const logger = createLogger()

const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(logger),
    DevTools.instrument()
  )
)

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
