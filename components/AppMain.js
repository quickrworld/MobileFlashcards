import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
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
import { clearDecks } from '../utils/helpers'
import { disableLocalNotifications } from '../utils/helpers'
import { clearLocalNotifications } from '../utils/helpers'
import { setLocalNotifications } from '../utils/helpers'
import { Constants } from 'expo'
import { purple } from '../utils/colors'

function MyStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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
        // clearLocalNotifications()
        disableLocalNotifications()
    } else {
      setLocalNotifications()
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={purple} barStyle={'light-content'}/>
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

const mapStateToProps = ({ settings }) => ({ settings })

function mapDispatchToProps(dispatch) {
  return {
    fetchDecks: () => dispatch(fetchDecks()),
    fetchSettings: () => dispatch(fetchSettings()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMain)



