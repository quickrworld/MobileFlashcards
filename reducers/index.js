import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
  const { cards, decks, title, question, answer } = action

  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...decks
        },
      }
    case ADD_DECK:
      if (state.decks[title]) {
        return {
          ...state,
          editing: title,
        }
      }
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: { title: title, cards: cards }
        },
        editing: title,
      }
    case ADD_CARD:
      const newDecks = Object.assign({}, state.decks)
      Object.keys(newDecks).forEach((key) => {
        if (key === title) {
          const cards = newDecks[key].cards ? newDecks[key].cards : []
          cards.push({question, answer})
          newDecks[key].cards = cards
        }
      })
      const value = {
        ...state,
        decks: {
          ...newDecks,
        },
      }
      return value
    default:
      return state
  }
}

export default decks
