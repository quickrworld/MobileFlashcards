import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {addCard, submitDeck} from '../actions'

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
    this.props.addCard(title, question, answer)
    this.props.submitDeck(title, this.props.state.decks[title])
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
        <Text>{count} {(count ===  1) && 'Card'}{(count !== 1) && 'Cards'}</Text>
        <TextInput
          placeholder={'Question'}
          value={question}
          onChangeText={(value) => this.changeQuestionText(value)}/>
        <TextInput
          placeholder={'Answer'}
          value={answer}
          onChangeText={(value) => this.changeAnswerText(value)}/>
        <TouchableOpacity
          onPress={this.submit}
          disabled={!(answer.trim().length > 0) || !(question.trim().length > 0)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (title, question, answer) => dispatch(addCard(title, question, answer)),
    submitDeck: (title, cards=[]) => dispatch(submitDeck(title, cards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)