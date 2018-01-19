import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, initAnswering } from '../actions'
import {white, purple, lightPurp, blue, gray, orange, pink, red} from '../utils/colors'

class QuizStart extends React.Component {
  onAddCard = () => {
    this.props.addDeck(this.props.title)
    this.props.navigation.navigate('AddCard')
  }
  onStartQuiz = () => {
    this.props.initAnswering(this.props.title)
    this.props.navigation.navigate('QuizCard')
  }
  render() {
    const { title, count } = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{count} {(count ===  1) && 'Card'}{(count !== 1) && 'Cards'}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={this.onAddCard}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onStartQuiz}
            disabled={count < 1}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
})

function mapStateToProps(state) {
  return {
    title: state.viewing,
    count: (state.decks[state.viewing] &&
      state.decks[state.viewing].cards &&
      state.decks[state.viewing].cards.length) || 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (title) => dispatch(addDeck(title)),
    initAnswering: (title) => dispatch(initAnswering(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizStart)