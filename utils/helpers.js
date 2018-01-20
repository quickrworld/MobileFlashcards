import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:StorageKey:1'
export const FLASHCARDS_NOTIFICATION_KEY = 'Flashcards:notifications:1'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Study today!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function clearDecks() {
  AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}

export default clearDecks

