export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const QUIZ_START = 'QUIZ_START'
export const INIT_ANSWERING = 'INIT_ANSWERING'
export const NEXT_CARD = 'NEXT_CARD'
export const QUIZ_COMPLETE = 'QUIZ_COMPLETE'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

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