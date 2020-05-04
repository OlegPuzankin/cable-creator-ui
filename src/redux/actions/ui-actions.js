import {TOGGLE_POPUP, SET_DISPLAY_NAME, TOGGLE_ONLINE, TOGGLE_IS_LOADING, TOGGLE_IS_INITIALIZE} from "../types";


export const togglePopup=() =>({type:TOGGLE_POPUP })
export const toggleOnline=(status) =>({type:TOGGLE_ONLINE, payload: status })
export const toggleIsLoading=(isLoading) =>({type:TOGGLE_IS_LOADING, payload: isLoading })
export const toggleIsInitialize=(isInitialize) =>({type:TOGGLE_IS_INITIALIZE, payload: isInitialize })





