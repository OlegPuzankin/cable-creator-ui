import { TOGGLE_IS_INITIALIZE, TOGGLE_IS_LOADING, TOGGLE_ONLINE, TOGGLE_POPUP } from '../types'

const INITIAL_STATE = {
    showPopup: false,
    isOnline: true,
    isLoading: false,
    isInitialize: false

};

export function uiReducer(state = INITIAL_STATE, action) {
    const { payload } = action;
    switch (action.type) {
        case TOGGLE_POPUP:
            return {
                ...state, showPopup: !state.showPopup
            };
        case TOGGLE_ONLINE:
            return {
                ...state, isOnline: payload
            };
        case TOGGLE_IS_LOADING:
            return {
                ...state, isLoading: payload
            };
        case TOGGLE_IS_INITIALIZE:
            return {
                ...state, isInitialize: payload
            };

        default:
            return state

    }


}