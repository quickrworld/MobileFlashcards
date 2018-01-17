import React, { Component } from 'react'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import QuizStart from './QuizStart'
import AddCard from './AddCard'
import QuizCard from './QuizCard'

const StackMain = StackNavigator({
  DeckList: {
    screen: DeckList,
  },
  QuizStart: {
    screen: QuizStart,
  },
  AddCard: {
    screen: AddCard,
  },
  QuizCard: {
    screen: QuizCard,
  }
})
class Main extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <StackMain/>
      </View>
    )
  }
}

export default Main