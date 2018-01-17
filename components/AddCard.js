import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { addCard } from '../actions'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = { question: '', answer: ''}
  changeQuestionText = (value) => {
    this.setState({question: value})
  }
  changeAnswerText = (value) => {
    this.setState({answer: value})
  }
  submit = () => {
    const title = this.props.state.editing
    const { question, answer } = this.state
    this.props.dispatch(addCard(title, question, answer,))
    this.setState({ question: '', answer: '' })
  }
  render() {
    const title = this.props.state.editing
    const { cards } = this.props.state.decks[title]
    const count = cards ? cards.length : 0
    const { question, answer } = this.state
    return (
      <View>
        <Text>{title}</Text>
        <Text>{count} Cards</Text>
        <TextInput
          placeholder={'Question'}
          value={question}
          onChangeText={(value) => this.changeQuestionText(value)}/>
        <TextInput
          placeholder={'Answer'}
          value={answer}
          onChangeText={(value) => this.changeAnswerText(value)}/>
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(AddCard)