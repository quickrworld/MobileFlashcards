import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AddDeck from './AddDeck'
import AddCard from './AddCard'

const Stack = StackNavigator({
  Deck: {
    screen: AddDeck,
    navigationOptions: Platform.OS === 'ios'
      ? {
          title: 'New Deck',
        }
      : {
          header: null,
        }
  },
  Card: {
    screen: AddCard,
    navigationOptions: Platform.OS === 'ios'
      ? {
          title: 'New Card',
        }
      : {
          header: null,
        }
  },
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