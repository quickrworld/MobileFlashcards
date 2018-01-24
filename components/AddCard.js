import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native'
import {
  addCard,
  submitDeck
} from '../actions/decks'
import {lightPurp, purple, white} from '../utils/colors'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    orientation: 'portrait',
  }
  handleDimensionsChange = ({ window }) => {
    this.setState({orientation: window.height > window.width ? 'portrait' : 'landscape' })
    this.setState({windowWidth: window.width})
    this.setState({windowHeight: window.height})
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
    const {height, width} = Dimensions.get('window')
    this.setState({orientation: height > width ? 'portrait' : 'landscape' })
    this.setState({windowWidth: width})
    this.setState({windowHeight: height})
  }
  _keyboardDidShow = () => {
    this.setState({keyboard: true})
  }

  _keyboardDidHide = () => {
    this.setState({keyboard: false})
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  changeQuestionText = (value) => {
    this.setState({question: value})
  }
  changeAnswerText = (value) => {
    this.setState({answer: value})
  }
  submit = () => {
    const title = this.props.state.decks.editing
    const { question, answer } = this.state
    this.props.addCard(title, question, answer)
    this.props.submitDeck(title, this.props.state.decks.decks[title])
    this.setState({ question: '', answer: '' })
  }
  render() {
    const title = this.props.state.decks.editing
    const { cards } = this.props.state.decks.decks[title]
    const count = cards ? cards.length : 0
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.mainContainer}>
        {(!this.state.keyboard ||
          (this.state.orientation === 'portrait' && Platform.OS === 'ios')) &&
        <View style={[styles.cardContainer]}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>
            {count} {(count ===  1) && 'Card'}{(count !== 1) && 'Cards'}
          </Text>
        </View>}
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: this.state.orientation === 'portrait'
            ? 'column'
            : 'row'
        }}>
          <View style={styles.inputPanel}>
            <TextInput
              style={[styles.input, {
                width: this.state.orientation === 'portrait'
                  ? this.state.windowWidth - 40
                  : this.state.windowWidth - 140
              }]}
              placeholder={'Question'}
              value={question}
              onChangeText={(value) => this.changeQuestionText(value)}/>
            <TextInput
              style={[styles.input, {
                width: this.state.orientation === 'portrait'
                  ? this.state.windowWidth - 40
                  : this.state.windowWidth - 140
              }]}
              placeholder={'Answer'}
              value={answer}
              onChangeText={(value) => this.changeAnswerText(value)}/>
          </View>
          <TouchableOpacity
            style={[styles.button, {
              backgroundColor: (!(answer.trim().length > 0) || !(question.trim().length > 0))
                ? 'gray'
                : lightPurp,
            }]}
            onPress={this.submit}
            disabled={!(answer.trim().length > 0) || !(question.trim().length > 0)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 60}}/>
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
    padding: 5,
    margin: 5,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
  },
  cardTitle: {
    color: purple,
    fontSize: 16,
    padding: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: lightPurp,
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
  },
  buttonText: {
    color: white,
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
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
    padding: 4,
  },
  input: {
    padding: 4,
    margin: 4,
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
