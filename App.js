import React from 'react'
import AppMain from './components/AppMain'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

class App extends React.Component {
  render() {
    const store = createStore(
      reducer,
      applyMiddleware(thunk),
    )
    return (
      <Provider store={store}>
        <AppMain/>
      </Provider>
    )
  }
}

export default App
