import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import QuizStart from './QuizStart'
import AddCard from './AddCard'
import QuizCard from './QuizCard'

const StackMain = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: Platform.OS === 'ios'
      ? {
        title: 'DECKS',
      }
      : {
        header: null,
      }
  },
  QuizStart: {
    screen: QuizStart,
    navigationOptions: Platform.OS === 'ios'
      ? {
        title: 'Quiz Start',
      }
      : {
        header: null,
      }
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