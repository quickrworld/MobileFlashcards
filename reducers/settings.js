import {
  FETCH_SETTINGS_REQUEST,
  FETCH_SETTINGS_FAILURE,
  FETCH_SETTINGS_SUCCESS,
  SUBMIT_SETTINGS_REQUEST,
  SUBMIT_SETTINGS_FAILURE,
  SUBMIT_SETTINGS_SUCCESS,
} from '../actions/settings'

function settings(state={}, action) {
  const { settings } = action
  switch(action.type) {
    case FETCH_SETTINGS_REQUEST:
      return state
    case FETCH_SETTINGS_FAILURE:
      return state
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        ...settings,
        syncing: false,
      }
    case SUBMIT_SETTINGS_REQUEST:
      return state
    case SUBMIT_SETTINGS_FAILURE:
      return state
    case SUBMIT_SETTINGS_SUCCESS:
      return state
    default:
      return state
  }
}

export default settings
