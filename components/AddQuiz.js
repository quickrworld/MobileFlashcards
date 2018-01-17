import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import QuizStart from './QuizStart'
import QuizCard from './QuizCard'

const Stack = StackNavigator({
  Deck: {
    screen: AddDeck,
  },
  AddCard: {
    screen: AddCard,
  },
  QuizStart: {
    screen: QuizStart,
  },
  QuizCard: {
    screen: QuizCard,
  }
})
class AddQuiz extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Stack/>
      </View>
    )
  }
}

export default AddQuiz