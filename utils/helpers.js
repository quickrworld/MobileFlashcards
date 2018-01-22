import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { testing } from './phase'

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
      if (data === null || testing) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let productionSchedule = new Date()
              productionSchedule.setDate(productionSchedule.getDate() + 1)
              productionSchedule.setHours(20)
              productionSchedule.setMinutes(0)
              let productionCycle = 'day'
              const testingSchedule = new Date()
              testingSchedule.setHours(testingSchedule.getHours() + 1)
              testingSchedule.setMinutes(0)
              const testingCycle = 'hour'
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: testing ? testingSchedule : productionSchedule,
                  repeat: testing ? testingCycle : productionCycle,
                }
              )
              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function clearDecks() {
  if (false) { // false in production
    AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
  }
}

export default clearDecks

