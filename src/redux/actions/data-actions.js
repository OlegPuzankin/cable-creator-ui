import {SET_CABLE_TYPES, SET_CABLES, SET_CONNECTORS, SET_EDIT_ITEM, SET_PRODUCERS} from "../types";

export const setEditItem=(item) =>({type:SET_EDIT_ITEM, payload: item })

export const setCables=(cables) =>({type:SET_CABLES, payload: cables })
export const setConnectors=(connectors) =>({type:SET_CONNECTORS, payload: connectors })
export const setCableTypes=(types) =>({type:SET_CABLE_TYPES, payload: types })
export const setProducers=(producers) =>({type:SET_PRODUCERS, payload: producers })


