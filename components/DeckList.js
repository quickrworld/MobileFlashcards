import React from  'react'
import { ScrollView, Text } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    const decks = {
      deck1: {
        title: 'deck1',
        cards:[
          {question: 'question1', answer: 'answer1'},
          {question: 'question2', answer: 'answer2'}
        ]
      },
      deck2: {
        title: 'deck2',
        cards:[
          {question: 'question3', answer: 'answer3'},
          {question: 'question4', answer: 'answer4'}
        ]
      },
      deck3: {
        title: 'deck3',
        cards:[
          {question: 'question5', answer: 'answer5'},
          {question: 'question6', answer: 'answer6'},
          {question: 'question7', answer: 'answer7'}
        ]
      },
      deck4: {
        title: 'deck4',
        cards:[
          {question: 'question8', answer: 'answer8'},
          {question: 'question9', answer: 'answer9'},
          {question: 'question10', answer: 'answer10'}
        ]
      },
      deck5: {
        title: 'deck5',
        cards:[
          {question: 'question11', answer: 'answer11'},
          {question: 'question12', answer: 'answer12'},
          {question: 'question13', answer: 'answer13'}
        ]
      },
      deck6: {
        title: 'deck6',
        cards:[
          {question: 'question14', answer: 'answer14'},
          {question: 'question15', answer: 'answer15'},
          {question: 'question16', answer: 'answer16'}
        ]
      },
      deck7: {
        title: 'deck7',
        cards:[
          {question: 'question17', answer: 'answer17'},
          {question: 'question18', answer: 'answer18'},
          {question: 'question19', answer: 'answer19'}
        ]
      },
      deck8: {
        title: 'deck8',
        cards:[
          {question: 'question20', answer: 'answer20'}
        ]
      },
      deck9: {
        title: 'deck9',
        cards:[
          {question: 'question21', answer: 'answer21'}
        ]
      },
      deck10: {
        title: 'deck10',
        cards:[
          {question: 'question22', answer: 'answer22'}
        ]
      },
    }
    dispatch(receiveDecks(decks))
  }
  render() {
    const decks = Object.keys(this.props.state).reduce((decks, title) => {
      decks.push({title: title, count: this.props.state[title].cards.length})
      return decks
    },[])
    return (
      <ScrollView>
        {decks.map((deck) => {
          return (
            <Deck key={deck.title} title={deck.title} count={deck.count}/>
          )
        })}
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(DeckList)