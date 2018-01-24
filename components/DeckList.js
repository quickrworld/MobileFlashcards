import React from  'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import {
  submitDecks
} from '../actions/decks'
import decks from '../utils/data'
import { lightPurp, white, blue, } from '../utils/colors'

function EmptyListScreen({submitDecks}) {
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
class DeckList extends React.Component {
  keyExtractor = (deck) => deck.title
  render() {
    const propDecks = (this.props.state &&
      this.props.state.decks &&
      this.props.state.decks.decks) || {}
    const decks = Object.keys(propDecks).reduce((decks, key) => {
      decks.push({
        title: key,
        count: propDecks[key] &&
               propDecks[key].cards &&
               propDecks[key].cards.length || 0,
      })
      return decks
    },[])
    renderItem = ({item}) => {
      return <Deck
        title={item.title}
        count={item.count}
        navigation={this.props.navigation}
      />
    }
    return (
      decks.length
        ? <FlatList
            data={decks}
            renderItem={renderItem}
            keyExtractor={this.keyExtractor}
          />
        : <EmptyListScreen submitDecks={this.props.submitDecks}/>
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

function mapStateToProps(state) {
  const { settings, decks } = state
  return { settings, decks, state }
}

function mapDispatchToProps(dispatch) {
  return {
    submitDecks: (decks) => dispatch(submitDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)