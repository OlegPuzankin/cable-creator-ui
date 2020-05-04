import { SET_CURRENT_USER } from '../types'

const INITIAL_STATE = {
    user: null
};

export function userReducer(state = INITIAL_STATE, action) {
    const { payload } = action;
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state, user: payload
            }

        default:
            return state

    }


}