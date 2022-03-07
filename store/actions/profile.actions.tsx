import { UserData } from '../../types'

export const SET_USER_DATA = 'SET_USER_DATA'

export const setUserData = (userData: UserData) => ({
  type: SET_USER_DATA,
  payload: userData
})