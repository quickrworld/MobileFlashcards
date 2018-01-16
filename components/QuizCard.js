import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

class QuizCard extends React.Component {
  state = {
    showAnswer: false
  }
  toggleView = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }
  render() {
    const { viewing } = this.props.state
    const deck = this.props.state.decks[viewing]
    const count = this.props.state.decks[viewing].cards.length
    const answering = this.props.state.decks[viewing].answering
    const question = deck.cards[deck.answering].question
    const answer = deck.cards[deck.answering].answer
    console.log('state', this.props.state)
    return(
      <View>
        <Text>{viewing}</Text>
        <Text>{answering+1} of {count}</Text>
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
          <TouchableOpacity>
            <Text>Correct</Text>
          </TouchableOpacity>}
        {this.state.showAnswer &&
          <TouchableOpacity>
            <Text>Incorrect</Text>
          </TouchableOpacity>}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(QuizCard)