import React from  'react'
import { FlatList } from 'react-native'
import Deck from './Deck'
import SettingsPanel from './SettingsPanel'
import EmptyListScreen from './EmptyListScreen'
import { connect } from 'react-redux'
import {
  submitDecks
} from '../actions/decks'

class DeckList extends React.Component {
  keyExtractor = (deck) => deck.title
  render() {
    const propDecks = (this.props.decks && this.props.decks.decks) || {}
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
    if (this.props.settings.displaying) {
      return (<SettingsPanel/>)
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

const mapStateToProps = ({ settings, decks }) => ({ settings, decks })

export default connect(mapStateToProps, { submitDecks })(DeckList)