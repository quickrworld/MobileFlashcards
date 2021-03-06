import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { testing } from './phase'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:StorageKey:1'
export const FLASHCARDS_SETTINGS_KEY = 'MobileFlashcards:SettingsKey:1'

export const FLASHCARDS_NOTIFICATION_KEY = 'Flashcards:notifications:1'

export function disableLocalNotifications() {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(clearLocalNotifications)
}

export function clearLocalNotifications() {
  return Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({status}) => {
      if(status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()
      }
    })
}

export const createNotification = () => ({
  title: 'Study today!',
  body: "📣 don't forget to study!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: true,
    vibrate: true,
  },
})

export function setLocalNotifications(schedule) {
  !schedule && testing
    ? schedule = {
        repeat: 'hour', // 'hour', 'day',
        hour: 0, // 0..23
        minute: 0, // 0..59
      }
    : schedule = {
      repeat: 'day', // 'hour', 'day',
      hour: 20, // 0..23
      minute: 0, // 0..59
    }
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null || testing) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let dailySchedule = new Date()
              dailySchedule.setDate(dailySchedule.getDate() + 1)
              dailySchedule.setHours(schedule.hour)
              dailySchedule.setMinutes(schedule.minute)

              const hourlySchedule = new Date()
              hourlySchedule.setHours(hourlySchedule.getHours() + 1)
              hourlySchedule.setMinutes(schedule.minute)

              const minuteSchedule = new Date()
              minuteSchedule.setHours(minuteSchedule.getHours())
              minuteSchedule.setMinutes(minuteSchedule.getMinutes() + 5)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                // {
                //   time: minuteSchedule,
                //   repeat: 'minute',
                // }
                {
                  time: schedule.repeat === 'hour'
                          ? hourlySchedule
                          : dailySchedule,
                  repeat: schedule.repeat,
                }
              )
              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearDecks() {
  return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}

// export default clearDecks

