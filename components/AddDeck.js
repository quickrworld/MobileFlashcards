import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}
class AddDeck extends Component {
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
      this.props.dispatch(addDeck({
        title,
        questions
      }))

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

export default connect()(AddDeck)