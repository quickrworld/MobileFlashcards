import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './appConstants'

export function submitDeck ({ title, questions }) {
  if (title && title.trim().length > 0) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [title]: { title: title, questions: questions }
    }))
  }
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}
