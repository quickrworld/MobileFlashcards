import {
  ADD_DECK,
  ADD_CARD,
  QUIZ_START,
  INIT_ANSWERING,
  NEXT_CARD,
  QUIZ_COMPLETE,
  SUBMIT_DECK_REQUEST,
  SUBMIT_DECK_SUCCESS,
  SUBMIT_DECK_FAILURE,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_FAILURE,
  SUBMIT_DECKS_REQUEST,
  SUBMIT_DECKS_SUCCESS,
  SUBMIT_DECKS_FAILURE,
} from '../actions/decks'

function decks(state = {}, action) {
  const { cards, decks, title, question, answer, increment } = action
  switch (action.type) {
    case FETCH_DECKS_REQUEST:
      return {
        ...state,
        syncing: true,
      }
    case FETCH_DECKS_SUCCESS:
      return {
        decks: {
          ...decks,
        },
        syncing: false,
      }
    case FETCH_DECKS_FAILURE:
      return {
        ...state,
        syncing: false,
      }
    case SUBMIT_DECK_REQUEST:
      return {
        ...state,
        syncing: true,
      }
    case SUBMIT_DECK_SUCCESS:
      return {
        ...state,
        syncing: false,
      }
    case SUBMIT_DECK_FAILURE:
      return {
        ...state,
        syncing: false,
      }
    case SUBMIT_DECKS_REQUEST:
      return {
        ...state,
        syncing: true,
      }
    case SUBMIT_DECKS_SUCCESS:
      return {
        ...state,
        syncing: false,
      }
    case SUBMIT_DECKS_FAILURE:
      return {
        ...state,
        syncing: false,
      }
    case ADD_DECK:
      if (state.decks && state.decks[title]) {
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
          [title]: { title: title, cards: cards || [] }
        },
        editing: title,
        viewing: title, // navigate to home of the quiz just added
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
      return {
        ...state,
        decks: {
          ...newDecks,
        },
      }
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
            answering: state.decks[title].answering + 1,
            score: state.decks[title].score
              ? state.decks[title].score + increment // TODO: check limit
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
            score: state.decks[title].score
              ? state.decks[title].score + increment // TODO: check limit
              : increment
          }
        }
      }
    default:
      return state
  }
}

export default decks
