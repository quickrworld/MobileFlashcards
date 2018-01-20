import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, submitDeck } from '../actions'
import {lightPurp, purple, white} from '../utils/colors'

class AddDeck extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      orientation: 'portrait',
    }
  }
  handleDimensionsChange = ({ window }) => {
    this.setState({orientation: window.height > window.width ? 'portrait' : 'landscape' })
    this.setState({windowWidth: window.width})
    this.setState({windowHeight: window.height})
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
    // Set the correct orientation at first mount. (No change event is fired).
    const {height, width} = Dimensions.get('window')
    this.setState({orientation: height > width ? 'portrait' : 'landscape' })
    this.setState({windowWidth: width})
    this.setState({windowHeight: height})
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
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
      <KeyboardAvoidingView behavior='padding' style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <Text style={[styles.cardTitle]}>
            What is the title of your Deck?
          </Text>
        </View>
        <View style={{
          flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row',
        }}>
          <View style={[styles.inputPanel, {
              width: this.state.orientation === 'portrait' ? '96%' : '75%',
            }]}>
            <TextInput
              style={[styles.input, {width: this.state.windowWidth - 20}]}
              value={title}
              placeholder={'Title'}
              onChangeText={(value) => this.changeText(value)}/>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={this.submit}
              disabled={title.trim().length === 0}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:40}}/>
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
    width: 89,
    backgroundColor: lightPurp,
  },
  inputPanel: {
    width: '96%',
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