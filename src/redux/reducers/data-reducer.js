import {SET_CABLE_TYPES, SET_CABLES, SET_CONNECTORS, SET_EDIT_ITEM, SET_PRODUCERS} from '../types'

const INITIAL_STATE = {

    cables: null,
    cablesMappedObj: null,

    connectors:null,
    connectorsMappedObj:null,

    editItem: null,

    cableTypes: null,
    cableTypesMappedObj: null,


    producers: null,
    producersMappedObj: null
};

export function dataReducer(state = INITIAL_STATE, action) {
    // debugger
    const { payload } = action;
    switch (action.type) {
        case SET_CABLES:
            return{

                ...state, cables: payload.cables, cablesMappedObj: payload.mappedObj
            };
        case SET_CONNECTORS:
            return{
                ...state, connectors: payload.connectors, connectorsMappedObj: payload.mappedObj
            };
        case SET_CABLE_TYPES:

            return{
                ...state, cableTypes: payload.types, cableTypesMappedObj: payload.typesObj
            };
        case SET_PRODUCERS:
            return{
                ...state, producers: payload.producers, producersMappedObj: payload.producersObj
            };
        case SET_EDIT_ITEM:
            return{
                ...state, editItem: payload
            };


        default:
            return state
    }

}