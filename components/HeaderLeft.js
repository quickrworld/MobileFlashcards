import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { blue, white } from '../utils/colors'
import { connect } from 'react-redux'

class HeaderLeft extends React.Component {
  render() {
    const { settings } = this.props
    const title = settings && settings.displaying
      ? 'Settings'
      : 'Home'
    return (
      <View style={[styles.viewContainer, {marginLeft: 16}]}>
        <Text style={[styles.titleText, {fontWeight: 'bold'}]}>{title}</Text>
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

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(HeaderLeft)
