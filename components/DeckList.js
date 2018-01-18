import React from  'react'
import { FlatList, View, Text } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { TouchableOpacity } from 'react-native'

function EmptyListScreen({loadDefaultDecks}) {
  const defaultDecks = {
    'Deck1': {
      title: 'Deck1',
      cards: [{
        question:'Q1',
        answer:'A1'
      }],
    },
    'Deck2': {
      title: 'Deck2',
      cards: []
    },
  }
  return (
    <View>
      <Text>There are no quiz decks yet</Text>
      <Text>Add decks using the NEW DECK tab</Text>
      <TouchableOpacity onPress={() => loadDefaultDecks(defaultDecks)}>
        <Text>Or add a few default decks</Text>
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
        : <EmptyListScreen loadDefaultDecks={this.props.receiveDecks}/>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)