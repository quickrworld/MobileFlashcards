import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  const { title, question, answer, deck, decks } = action
  // const { cards } = state[title].cards
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...deck,
      }
    case ADD_CARD:
      cards.push({
        question,
        answer,
      })
      return {
        ...state,
        [action.title]: {
          title,
          cards,
        }
      }
    default:
      return state
  }
}

export default decks

