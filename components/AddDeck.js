import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, submitDeck } from '../actions'

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
    this.props.addDeck(title)
    this.setState({title: ''})
    this.props.submitDeck(title)
    this.props.navigation.navigate('QuizStart')
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
        <TouchableOpacity
          onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (title) => dispatch(addDeck(title)),
    submitDeck: (title, cards=[]) => dispatch(submitDeck(title, cards)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)