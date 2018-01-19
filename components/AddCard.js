import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {addCard, submitDeck} from '../actions'
import {lightPurp, purple, white} from '../utils/colors'

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
      <KeyboardAvoidingView behavior={'padding'} style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{count} {(count ===  1) && 'Card'}{(count !== 1) && 'Cards'}</Text>
        </View>
        <View style={styles.inputPanel}>
          <TextInput
            style={styles.input}
            placeholder={'Question'}
            value={question}
            onChangeText={(value) => this.changeQuestionText(value)}/>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            value={answer}
            onChangeText={(value) => this.changeAnswerText(value)}/>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.submit}
            disabled={!(answer.trim().length > 0) || !(question.trim().length > 0)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: lightPurp,
    padding: 10,
    margin: 10,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  cardTitle: {
    color: purple,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: lightPurp,
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: white,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
  },
  button: {
    borderColor: white,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    margin: 8,
    backgroundColor: lightPurp,
  },
  inputPanel: {
    width: '90%',
    padding: 10,
  },
  input: {
    padding: 10,
  },
})

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