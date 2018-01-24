import { FLASHCARDS_STORAGE_KEY } from '../utils/helpers'
import { AsyncStorage } from 'react-native'

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const QUIZ_START = 'QUIZ_START'
export const INIT_ANSWERING = 'INIT_ANSWERING'
export const NEXT_CARD = 'NEXT_CARD'
export const QUIZ_COMPLETE = 'QUIZ_COMPLETE'
export const FETCH_DECKS_REQUEST = 'FETCH_DECKS_REQUEST'
export const FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE'
export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS'
export const SUBMIT_DECK_REQUEST = 'SUBMIT_DECK_REQUEST'
export const SUBMIT_DECK_FAILURE = 'SUBMIT_DECK_FAILURE'
export const SUBMIT_DECK_SUCCESS = 'SUBMIT_DECK_SUCCESS'
export const SUBMIT_DECKS_REQUEST = 'SUBMIT_DECKS_REQUEST'
export const SUBMIT_DECKS_FAILURE = 'SUBMIT_DECKS_FAILURE'
export const SUBMIT_DECKS_SUCCESS = 'SUBMIT_DECKS_SUCCESS'

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard(title, question, answer) {
  return {
    type: ADD_CARD,
    title,
    question,
    answer,
  }
}

export function quizStart(title) {
  return {
    type: QUIZ_START,
    title,
  }
}

export function nextCard(title, increment) {
  return {
    type: NEXT_CARD,
    title,
    increment,
  }
}

export function quizComplete(title, increment) {
  return {
    type: QUIZ_COMPLETE,
    title,
    increment,
  }
}

export function initAnswering(title) {
  return {
    type: INIT_ANSWERING,
    title,
  }
}

export function fetchDecksRequest() {
  return {
    type:  FETCH_DECKS_REQUEST
  }
}

export function fetchDecksFailure(error) {
  return {
    type: FETCH_DECKS_FAILURE,
    error,
  }
}

export function fetchDecksSuccess(result) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks: result,
  }
}

export function fetchDecks() {
  return function (dispatch) {
    dispatch(fetchDecksRequest())
    return AsyncStorage.getItem(
      FLASHCARDS_STORAGE_KEY,
      (error, result) => {
        if (error) {
          dispatch(fetchDecksFailure(error))
        } else {
          result = result || '{ "decks": {} }'
          const { decks } = JSON.parse(result)
          dispatch(fetchDecksSuccess(decks))
        }
      })
  }
}

export function submitDeckRequest(title) {
  return {
    type:  SUBMIT_DECK_REQUEST,
    title,
  }
}

export function submitDeckFailure(error) {
  return {
    type: SUBMIT_DECK_FAILURE,
    error,
  }
}

export function submitDeckSuccess(result) {
  return {
    type: SUBMIT_DECK_SUCCESS,
    decks: result,
  }
}

export function submitDeck(title, cards=[]) {
  return function (dispatch) {
    dispatch(submitDeckRequest(title))
    return AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({decks: {[title]: {title: title, cards: cards.cards }}}),
      (error) => {
        if(error) {
          dispatch(submitDeckFailure(error))
        } else {
          dispatch(submitDeckSuccess(error))
        }
      }
    )
  }
}

export function submitDecksRequest(decks) {
  return {
    type:  SUBMIT_DECKS_REQUEST,
    decks,
  }
}

export function submitDecksFailure(error) {
  return {
    type: SUBMIT_DECKS_FAILURE,
    error,
  }
}

export function submitDecksSuccess(result) {
  return {
    type: SUBMIT_DECKS_SUCCESS,
    decks: result,
  }
}

export function submitDecks(decks) {
  return function (dispatch) {
    dispatch(submitDecksRequest(decks))
    return AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({ decks: decks }),
      (error) => {
        if(error) {
          dispatch(submitDecksFailure(error))
        } else {
          dispatch(submitDecksSuccess(error)) // error === null
        }
        dispatch(fetchDecks())
      }
    )
  }
}
