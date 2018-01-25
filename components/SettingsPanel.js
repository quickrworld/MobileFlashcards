import React from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { white, lightPurp, red} from '../utils/colors'
import { connect } from 'react-redux'
import {fetchSettings, submitSettings} from '../actions/settings'

class SettingsPanel extends React.Component {
  notificationsValueChange = (value) => {
    this.props.submitSettings({ notifications: value })
    this.props.fetchSettings()
  }
  deleteDataOnRestartValueChange = (value) => {
    this.props.submitSettings({ deleteDataOnRestart: value })
    this.props.fetchSettings()
  }
  render() {
    return(
      <View style={{paddingTop: 8,}}>
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
      </View>
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

function mapStateToProps(state) {
  const { settings } = state
  return {
    settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitSettings: (settings) => dispatch(submitSettings(settings)),
    fetchSettings: () => dispatch(fetchSettings()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel)