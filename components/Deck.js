import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { quizStart } from '../actions/index'
import { lightPurp, purple, } from '../utils/colors'

class Deck extends React.Component {
  onPress = () => {
    this.props.quizStart(this.props.title)
    this.props.navigation.navigate('QuizStart')
  }
  render() {
    const { title, count, cards } = this.props
    return (
      <View style={styles.deckContainer}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{count} Cards</Text>
          <Text>{JSON.stringify(cards)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    padding: 5,
    paddingTop: 20,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: purple,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 16,
    color: lightPurp,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    quizStart: (title) => dispatch(quizStart(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)

