import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  QUIZ_START,
  INIT_ANSWERING,
  NEXT_CARD, QUIZ_COMPLETE
} from '../actions'

function decks(state = {}, action) {
  const { cards, decks, title, question, answer, increment } = action
  switch (action.type) {
    case RECEIVE_DECKS:
      const result = {
        ...state,
        decks: {
          ...state.decks,
          ...decks
        },
      }
      return result
    case ADD_DECK:
      if (state.decks[title]) {
        return {
          ...state,
          editing: title,
          viewing: title,
        }
      }
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: { title: title, cards: cards }
        },
        editing: title, // why is this still required?
        viewing: title, // we plan to navigate to the home of the quiz just added
      }
    case INIT_ANSWERING:
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: {
            ...state.decks[title],
            answering: 0,
            score: 0,
          }
        }
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
    case QUIZ_START:
      return {
        ...state,
        viewing: title,
      }
    case NEXT_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: {
            ...state.decks[title],
            answering: state.decks[title].answering + 1, // TODO: check limit
            score: state.decks[title].score
              ? state.decks[title].score + increment
              : increment
          }
        }
      }
    case QUIZ_COMPLETE:
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: {
            ...state.decks[title],
            // answering: state.decks[title].answering + 1, // TODO: check limit
            score: state.decks[title].score
              ? state.decks[title].score + increment
              : increment
          }
        }
      }
    default:
      return state
  }
}

export default decks
