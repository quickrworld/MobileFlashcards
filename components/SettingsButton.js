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
          style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

styles = StyleSheet.create({
  button: {
    padding: 4,
    marginRight: 16,
    backgroundColor: blue,
    borderRadius: 4,
  },
  buttonText: {
    color: white,
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
