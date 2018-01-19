import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity, StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, submitDeck } from '../actions'
import {lightPurp, purple, white} from '../utils/colors'

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
      <KeyboardAvoidingView style={styles.mainContainer} behavior={'padding'}>
        <View>
          <Text style={styles.cardTitle}>
            What is the title of your Deck?
          </Text>
        </View>
        <View style={styles.inputPanel}>
          <TextInput
            multiline={true}
            style={styles.input}
            value={title}
            placeholder={'Title'}
            onChangeText={(value) => this.changeText(value)}/>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    fontSize: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: lightPurp,
    fontSize: 14,
    padding: 10,
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
    addDeck: (title) => dispatch(addDeck(title)),
    submitDeck: (title, cards=[]) => dispatch(submitDeck(title, cards)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)