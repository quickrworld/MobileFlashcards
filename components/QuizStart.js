import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, initAnswering } from '../actions'

class QuizStart extends React.Component {
  onAddCard = () => {
    this.props.dispatch(addDeck(this.props.title))
    this.props.navigation.navigate('AddCard')
  }
  onStartQuiz = () => {
    this.props.dispatch(initAnswering(this.props.title))
    this.props.navigation.navigate('QuizCard')
  }
  render() {
    const { title, count } = this.props
    return (
      <View>
        <Text>{title}</Text>
        <Text>{count} {(count ===  1) && 'Card'}{(count !== 1) && 'Cards'}</Text>
        <TouchableOpacity onPress={this.onAddCard}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onStartQuiz}
          disabled={count < 1}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.viewing,
    count: (state.decks[state.viewing] &&
      state.decks[state.viewing].cards &&
      state.decks[state.viewing].cards.length) || 0
  }
}

export default connect(mapStateToProps)(QuizStart)