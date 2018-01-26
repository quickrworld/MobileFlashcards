import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { submitSettings, fetchSettings } from '../actions/settings'
import { blue, white } from '../utils/colors'
import { connect } from 'react-redux'

class SettingsButton extends React.Component {
  onPress = () => {
    const { settings } = this.props
    this.props.submitSettings({
      displaying: !(settings && settings.displaying)
    })
    this.props.fetchSettings()
  }
  render() {
    const { settings } = this.props
    const title = settings && settings.displaying
        ? 'Done'
        : 'Settings'
    return (
      <View>
        <TouchableOpacity
          onPress={this.onPress}
          style={styles.viewContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

styles = StyleSheet.create({
  viewContainer: {
    padding: 4,
    marginRight: 16,
    borderRadius: 4,
  },
  titleText: {
    color: blue,
    padding: 4,
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton)
