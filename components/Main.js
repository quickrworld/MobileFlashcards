import React, { Component } from 'react'
import { View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import QuizStart from './QuizStart'
import AddCard from './AddCard'
import QuizCard from './QuizCard'
import SettingsButton from './SettingsButton'
import HeaderLeft from './HeaderLeft'

const StackMain = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerRight: (
        <SettingsButton/>
      ),
      headerLeft: (
        <HeaderLeft/>
      )
    },
  },
  QuizStart: {
    screen: QuizStart,
    navigationOptions: {
      title: 'Quiz'
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'New Card'
    }
  },
  QuizCard: {
    screen: QuizCard,
    navigationOptions: {
      title: 'Question',
    },
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