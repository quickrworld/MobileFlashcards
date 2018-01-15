import React from  'react'
import { FlatList, View, Text } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

function EmptyListScreen() {
  return (
    <View>
      <Text>There are no quiz decks yet</Text>
      <Text>Add decks using the NEW DECK tab</Text>
    </View>
  )
}
class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(receiveDecks({}))
  }
  keyExtractor = (deck) => deck.title
  render() {
    const propDecks = (this.props.state && this.props.state.decks) || {}
    const decks = Object.keys(propDecks).reduce((decks, key) => {
      decks.push({
        title: key,
        count: propDecks[key] && propDecks[key].cards && propDecks[key].cards.length || 0,
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
        : <EmptyListScreen/>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(DeckList)