import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_QUESTION:
      const questions = Array.from(state[action.title].questions)
      questions.push(action.question)
      return {
        ...state,
        [action.title]: {
          [action.title]: action.title,
          questions: questions
        }
      }
    default:
      return state
  }
}

export default decks

