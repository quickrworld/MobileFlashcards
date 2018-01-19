import React from  'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { submitDecks } from '../actions'
import decks from '../utils/data'
import { lightPurp, white, blue, } from '../utils/colors'

function EmptyListScreen({submitDecks}) {
  return (
    <View style={styles.container}>
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
    const propDecks = (this.props.state && this.props.state.decks) || {}
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
  container : {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: blue,
  },
  heading : {
    color: white,
    padding: 10,
    fontSize: 18,
  },
  message: {
    color: white,
    padding: 10,
    paddingBottom: 25,
    fontSize: 18,
  },
  buttonText: {
    color: white,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 20,
  },
  button: {
    borderColor: white,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
})

function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    submitDecks: (decks) => dispatch(submitDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)