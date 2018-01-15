import React from 'react'
import { View } from 'react-native'
import { TabNavigator } from 'react-navigation'
import AddQuiz from './components/AddQuiz'
import DeckList from './components/DeckList'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
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
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <Tabs />
        </View>
      </Provider>
    )
  }
}
