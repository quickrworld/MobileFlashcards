import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import decks from '../utils/data'
import {blue, lightPurp, white} from '../utils/colors'

class EmptyListScreen extends React.Component {
  render() {
    const { submitDecks } = this.props
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.heading}>This screen displays available decks</Text>
        <Text style={styles.heading}>There are no decks available</Text>
        <Text style={styles.message}>Add decks using the NEW DECK tab</Text>
        <Text style={styles.message}>You can also install example decks</Text>
        <TouchableOpacity style={styles.button} onPress={() => submitDecks(decks)}>
          <Text style={styles.buttonText}>Install example decks</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  messageContainer : {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: blue,
    borderWidth: 1,
    borderColor: lightPurp,
    borderRadius: 8,
    padding: 4,
    margin: 5,
  },
  heading : {
    color: white,
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    color: white,
    padding: 5,
    paddingBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonText: {
    color: white,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 16,
  },
  button: {
    borderColor: white,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
})

export default EmptyListScreen