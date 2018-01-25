import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import {
  nextCard,
  quizComplete,
  initAnswering,
} from '../actions/decks'
import {lightPurp, purple, white} from '../utils/colors'
import {
  clearLocalNotification,
  setLocalNotifications,
} from '../utils/helpers'

class QuizCard extends React.Component {
  state = {
    showAnswer: false,
    quizComplete: false,
    orientation: 'portrait',
  }
  handleDimensionsChange = ({ window }) => {
    this.setState({
      orientation: window.height > window.width ? 'portrait' : 'landscape'
    })
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
    const {height, width} = Dimensions.get('window')
    this.setState({
      orientation: height > width ? 'portrait' : 'landscape'
    })
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
  }
  toggleView = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }
  markCorrect = () => {
    this.moveNext(1)
  }
  markIncorrect = () => {
    this.moveNext(0)
  }
  moveNext = (scoreIncrement) => {
    const { viewing } = this.props.decks
    const count = this.props.decks.decks[viewing].cards.length
    const answering = this.props.decks.decks[viewing].answering
    this.toggleView()
    if (answering === (count - 1)) {
      this.setState({ quizComplete: true })
      this.props.quizComplete(viewing, scoreIncrement)
      clearLocalNotification()
        .then(setLocalNotifications({}))
    } else {
      this.props.nextCard(viewing, scoreIncrement)
    }
  }
  restartQuiz = () => {
    const { viewing } = this.props.decks
    this.props.initAnswering(viewing)
    this.setState({ showAnswer: false })
    this.setState({ quizComplete: false })
  }
  quizHome = () => {
    const { viewing } = this.props.decks
    this.props.initAnswering(viewing)
    this.setState({ showAnswer: false })
    this.setState({ quizComplete: false })
    this.props.navigation.navigate('QuizStart')
  }
  render() {
    const { viewing } = this.props.decks
    const deck = this.props.decks.decks[viewing]
    const count = this.props.decks.decks[viewing].cards.length
    const answering = this.props.decks.decks[viewing].answering
    const question = deck.cards[deck.answering].question
    const answer = deck.cards[deck.answering].answer
    const score = this.props.decks.decks[viewing].score || 0
    if(this.state.quizComplete) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{viewing}</Text>
            <Text style={styles.cardTitle}>Score: {score} / {count}</Text>
            {score === count && (<Text style={styles.cardTitle}>All correct!</Text>)}
            {score < count && (<Text style={styles.cardSubtitle}>Needs more practice</Text>)}
          </View>
          <View style={{flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.restartQuiz}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.quizHome}>
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.cardContainer]}>
          <View style={styles.statsContainer}>
            <Text style={[styles.location, {width:'50%'}]}>{answering + 1} of {count}</Text>
            <Text style={[styles.location, {width:'50%', textAlign:'right'}]}>Score {score}</Text>
          </View>
          <Text style={styles.cardTitle}>{viewing}</Text>
        </View>
        {!this.state.showAnswer &&
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
          </View>}
        {this.state.showAnswer &&
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>}
        {!this.state.showAnswer &&
        <TouchableOpacity
          style={styles.button}
          onPress={this.toggleView}>
          <Text style={styles.buttonText}>Show Answer</Text>
        </TouchableOpacity>}
        {this.state.showAnswer &&
        <View style={{flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row'}}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={this.toggleView}>
            <Text style={[styles.buttonText]}>Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'green'}]}
            onPress={this.markCorrect}>
            <Text style={[styles.buttonText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'red'}]}
            onPress={this.markIncorrect}>
            <Text style={[styles.buttonText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
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
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    paddingBottom: 0,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: lightPurp,
    padding: 4,
    margin: 10,
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 20,
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: lightPurp,
    padding: 5,
    margin: 10,
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '96%',
  },
  answerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  cardTitle: {
    color: purple,
    fontSize: 20,
    padding: 4,
    paddingTop: 0,
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
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    borderColor: white,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    paddingTop: 0,
    margin: 8,
    marginTop: 0,
    backgroundColor: lightPurp,
  },
  buttonPanel: {
    flexDirection: 'column',
  },
})

function mapStateToProps(state) {
  const { decks } = state
  return { decks  }
}

function mapDispatchToProps(dispatch) {
  return {
    initAnswering: (viewing) => dispatch(initAnswering(viewing)),
    nextCard: (viewing, scoreIncrement) => dispatch(nextCard(viewing, scoreIncrement)),
    quizComplete: (viewing, scoreIncrement) => dispatch(quizComplete(viewing, scoreIncrement))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCard)