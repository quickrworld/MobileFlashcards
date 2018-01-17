import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { nextCard } from '../actions/index'
import { quizComplete } from '../actions/index'
import {initAnswering} from '../actions'

class QuizCard extends React.Component {
  state = {
    showAnswer: false,
    quizComplete: false,
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
    const { viewing } = this.props.state
    const count = this.props.state.decks[viewing].cards.length
    const answering = this.props.state.decks[viewing].answering
    this.toggleView()
    if (answering === (count - 1)) {
      this.setState({ quizComplete: true })
      this.props.dispatch(quizComplete(viewing, scoreIncrement))
    } else {
      this.props.dispatch(nextCard(viewing, scoreIncrement))
    }
  }
  restartQuiz = () => {
    const { viewing } = this.props.state
    this.props.dispatch(initAnswering(viewing))
    this.setState({ showAnswer: false })
    this.setState({ quizComplete: false })
  }
  quizHome = () => {
    const { viewing } = this.props.state
    this.props.dispatch(initAnswering(viewing))
    this.setState({ showAnswer: false })
    this.setState({ quizComplete: false })
    this.props.navigation.navigate('QuizStart')
  }
  render() {
    const { viewing } = this.props.state
    const deck = this.props.state.decks[viewing]
    const count = this.props.state.decks[viewing].cards.length
    const answering = this.props.state.decks[viewing].answering
    const question = deck.cards[deck.answering].question
    const answer = deck.cards[deck.answering].answer
    const score = this.props.state.decks[viewing].score || 0
    if(this.state.quizComplete) {
      return (<View>
        <Text>{viewing}</Text>
        <Text>Score: {score} / {count}</Text>
        {score === count && (<Text>All correct!</Text>)}
        <TouchableOpacity onPress={this.restartQuiz}>
          <Text>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.quizHome}>
          <Text>Quiz Home</Text>
        </TouchableOpacity>
      </View>)
    }
    return (<View>
      <Text>{viewing}</Text>
      <Text>{answering + 1}/{count}</Text>
      <Text>Score: {score}</Text>
      {!this.state.showAnswer &&
      <Text>{question}</Text>}
      {this.state.showAnswer &&
      <Text>{answer}</Text>}
      {!this.state.showAnswer &&
      <TouchableOpacity onPress={this.toggleView}>
        <Text>Answer</Text>
      </TouchableOpacity>}
      {this.state.showAnswer &&
      <TouchableOpacity onPress={this.toggleView}>
        <Text>Question</Text>
      </TouchableOpacity>}
      {this.state.showAnswer &&
      <TouchableOpacity onPress={this.markCorrect}>
        <Text>Correct</Text>
      </TouchableOpacity>}
      {this.state.showAnswer &&
      <TouchableOpacity onPress={this.markIncorrect}>
        <Text>Incorrect</Text>
      </TouchableOpacity>}
    </View>)
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(QuizCard)