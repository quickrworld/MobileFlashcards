import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { submitDeck } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}
export default class AddDeck extends Component {
  state = {
    title: '',
    questions: []
  }
  changeText = (value) => {
    this.setState({title: value})
  }
  submit = () => {
    const { title, questions } = state

    if (title && title.trim().length > 0) {
      // Update Redux

      this.setState({title: ''})

      // Navigate to AddCard

      submitDeck({ title, questions })

      // Save to AsyncStorage
    }
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <Text>
          What is the title of your Deck?
        </Text>
        <TextInput
          value={title}
          onChangeText={(value) => this.changeText(value)}/>
        <SubmitBtn onPress={this.submit}/>
      </KeyboardAvoidingView>
    )
  }
}