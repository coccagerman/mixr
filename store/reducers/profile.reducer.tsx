import { UserData } from '../../types'
import { SET_USER_DATA } from '../actions/profile.actions'

const INITIAL_STATE = { userData: null as any }

const ProfileReducer = (state = INITIAL_STATE, action: { type: string; payload: UserData }) => {
  switch (action.type) {
    case SET_USER_DATA: return { userData: action.payload }
    default: return state
  }
}

export default ProfileReducer