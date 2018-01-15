import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './appConstants'

export function submitDeck ({ title }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title }
  }))
}

export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((value) => { return JSON.parse(value)})
  // const value = AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  // return value
}
