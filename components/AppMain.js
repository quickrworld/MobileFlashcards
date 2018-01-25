import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'
import AddQuiz from './AddQuiz'
import Main from './Main'
import { connect } from 'react-redux'
import {
  fetchDecks,
} from '../actions/decks'
import {
  fetchSettings,
} from '../actions/settings'
import clearDecks, {setLocalNotification} from '../utils/helpers'
import { clearLocalNotifications } from '../utils/helpers'
import { setLocalNotifications } from '../utils/helpers'

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
  state = {
    decksCleared: false,
  }
  componentDidMount() {
    this.props.fetchSettings()
    this.props.fetchDecks()
  }
  componentWillReceiveProps(nextProps) {
    if((this.state.decksCleared === false) &&
      (nextProps.settings.deleteDataOnRestart !== this.props.settings.deleteDataOnRestart) &&
      nextProps.settings.deleteDataOnRestart) {
      clearDecks().then(this.props.fetchDecks())
    }
    this.setState({ decksCleared: true }) // too late to clear decks this launch
    if((nextProps.settings.notifications !== this.props.settings.notifications) &&
        !nextProps.settings.notifications) {
        clearLocalNotifications()
    } else {
      setLocalNotifications()
    }
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
  const { settings } = state
  return { settings }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDecks: () => dispatch(fetchDecks()),
    fetchSettings: () => dispatch(fetchSettings()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMain)



