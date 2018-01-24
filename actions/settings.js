import { FLASHCARDS_SETTINGS_KEY } from '../utils/helpers'
import {AsyncStorage} from 'react-native'

export const FETCH_SETTINGS_REQUEST = 'FETCH_SETTINGS_REQUEST'
export const FETCH_SETTINGS_FAILURE = 'FETCH_SETTINGS_FAILURE'
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS'
export const SUBMIT_SETTINGS_REQUEST = 'SUBMIT_SETTINGS_REQUEST'
export const SUBMIT_SETTINGS_FAILURE = 'SUBMIT_SETTINGS_FAILURE'
export const SUBMIT_SETTINGS_SUCCESS = 'SUBMIT_SETTINGS_SUCCESS'

export function fetchSettingsRequest() {
  return {
    type: FETCH_SETTINGS_REQUEST,
  }
}

export function fetchSettingsFailure(error) {
  return {
    type: FETCH_SETTINGS_FAILURE,
    error,
  }
}

export function fetchSettingsSuccess(settings) {
  return {
    type: FETCH_SETTINGS_SUCCESS,
    settings,
  }
}


export function fetchSettings() {
  return function(dispatch) {
    dispatch(fetchSettingsRequest())
    return AsyncStorage.getItem(
      FLASHCARDS_SETTINGS_KEY,
      (error, result) => {
        if (error) {
          dispatch(fetchSettingsFailure(error))
        } else {
          result = result || JSON.stringify({
            settings: {
              displaying: false,
            }
          })
          console.log('fetchSettings result', result)
          const settings = JSON.parse(result)
          dispatch(fetchSettingsSuccess(settings))
        }
      })
  }
}

export function submitSettingsRequest(settings) {
  return {
    type: SUBMIT_SETTINGS_REQUEST,
    settings,
  }
}

export function submitSettingsFailure(error) {
  return {
    type: SUBMIT_SETTINGS_FAILURE,
    error,
  }
}

export function submitSettingsSuccess(result) {
  return {
    type: SUBMIT_SETTINGS_SUCCESS,
    result,
  }
}

export function submitSettings(settings) {
  return function (dispatch) {
    console.log('***********submit settings*********', settings)
    dispatch(submitSettingsRequest(settings))
    return AsyncStorage.mergeItem(
      FLASHCARDS_SETTINGS_KEY,
      JSON.stringify(settings),
      (error) => {
        if(error) {
          dispatch(submitSettingsFailure(error))
        } else {
          dispatch(submitSettingsSuccess(error))
        }
      }
    )
  }
}
