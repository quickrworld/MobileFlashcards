import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'
import AddQuiz from './AddQuiz'
import Main from './Main'
import { connect } from 'react-redux'
import {
  fetchDecks
} from '../actions/decks'
import clearDecks from '../utils/helpers'

const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'DECKS',
    }
  },
  AddQuiz: {
    screen: AddQuiz,
    navigationOptions: {
      title: 'NEW DECK',
    }
  }
})

class AppMain extends React.Component {
  componentDidMount() {
    clearDecks()
    this.props.fetchDecks()
  }
  render() {
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDecks: () => dispatch(fetchDecks()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMain)



