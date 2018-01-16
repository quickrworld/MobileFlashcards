import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  View,
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
  constructor() {
    super()
    this.state = {
      title: ''
    }
  }
  changeText = (value) => {
    this.setState({title: value})
  }
  submit = () => {
    const { title } = this.state
    this.props.dispatch(addDeck(title))
    this.setState({title: ''})
    submitDeck({ title })
    this.props.navigation.navigate('AddCard')
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={'padding'}>
        <View>
          <Text>
            What is the title of your Deck?
          </Text>
        </View>
        <TextInput
          value={title}
          placeholder={'Title'}
          onChangeText={(value) => this.changeText(value)}/>
        <SubmitBtn onPress={this.submit}/>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck)