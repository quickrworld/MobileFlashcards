import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:StorageKey:1'

function clearDecks() {
  AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}

export default clearDecks