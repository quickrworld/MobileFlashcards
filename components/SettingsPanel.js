import React from 'react'
import { Text, View, Switch, StyleSheet, Animated } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { white, lightPurp, red} from '../utils/colors'
import { connect } from 'react-redux'
import {fetchSettings, submitSettings} from '../actions/settings'

class SettingsPanel extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start();
  }
  notificationsValueChange = (value) => {
    this.props.submitSettings({ notifications: value })
    this.props.fetchSettings()
  }
  deleteDataOnRestartValueChange = (value) => {
    this.props.submitSettings({ deleteDataOnRestart: value })
    this.props.fetchSettings()
  }
  render() {
    let { fadeAnim } = this.state;
    return(
      <Animated.View style={{paddingTop: 8, opacity: fadeAnim, ...this.props.style }}>
        <View style={styles.item}>
          <Entypo name={'notification'} size={24} style={{
            paddingTop: 4, color: lightPurp}}/>
          <Text>  </Text>
          <Text style={styles.itemLabel}>
            Notifications
          </Text>
          <Switch
            value={this.props.settings && this.props.settings.notifications}
            onValueChange={this.notificationsValueChange}/>
        </View>
        <View style={styles.item}>
          <MaterialIcons name={'delete-sweep'} size={24} style={{
            paddingTop: 4, color: red}}/>
          <Text>  </Text>
          <Text style={styles.itemLabel}>
            Delete data on restart
          </Text>
          <Switch
            value={this.props.settings && this.props.settings.deleteDataOnRestart}
            onValueChange={this.deleteDataOnRestartValueChange}/>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 8,
    padding: 12,
    backgroundColor: white,
    borderRadius: 8,
  },
  itemLabel: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 1,
  }
})

const mapStateToProps = ({ settings }) => ({ settings })

function mapDispatchToProps(dispatch) {
  return {
    submitSettings: (settings) => dispatch(submitSettings(settings)),
    fetchSettings: () => dispatch(fetchSettings()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel)