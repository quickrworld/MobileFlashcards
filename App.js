import React from 'react'
import { View } from 'react-native'
import { TabNavigator } from 'react-navigation'
import AddQuiz from './components/AddQuiz'
import Main from './components/Main'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'

const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'DECKS',
    }
  },
  AddQuiz: {
    screen: AddQuiz,
    navigationOptions: {
      title: 'NEW DECK',
    }
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(
      reducer,
      applyMiddleware(thunk),
    )
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Tabs />
        </View>
      </Provider>
    )
  }
}



