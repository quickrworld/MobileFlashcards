import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './appConstants'

export function submitDeck ({ title }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: []
  }))
}
