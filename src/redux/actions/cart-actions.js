import { ADD_ITEM_TO_CART, CLEAR_ITEM_FROM_CART, DECREASE_QUANTITY, INCREASE_QUANTITY } from "../types";



export const addItemToCart = (item) => ({ type: ADD_ITEM_TO_CART, payload: item })
export const decreaseQuantity = (itemId) => ({ type: DECREASE_QUANTITY, payload: itemId })
export const increaseQuantity = (itemId) => ({ type: INCREASE_QUANTITY, payload: itemId })
export const clearItemFromCart = (itemId) => ({ type: CLEAR_ITEM_FROM_CART, payload: itemId })





