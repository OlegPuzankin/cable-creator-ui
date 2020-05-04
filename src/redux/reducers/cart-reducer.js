import { CLEAR_ITEM_FROM_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, ADD_ITEM_TO_CART } from "../types";


const INITIAL_STATE = {
    cartItems: []

};


export function cartReducer(state = INITIAL_STATE, action) {
    // debugger
    const { payload } = action;
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            debugger
            return {
                ...state, cartItems: [...state.cartItems, payload]

            };
        case INCREASE_QUANTITY:
            debugger
            return {
                ...state, cartItems: increaseQty(state.cartItems, payload)

            };
        case DECREASE_QUANTITY:
            return {
                ...state, cartItems: decreaseQty(state.cartItems, payload)

            };
        case CLEAR_ITEM_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(i => i.id !== payload)

            };




        default:
            return state
    }

}

function increaseQty(cartItems, itemId) {
    const result = cartItems.map(i => {
        if (i.id === itemId) {
            i.quantity++
            return i
        }
        else
            return i
    })
    debugger

    return result

}
function decreaseQty(cartItems, itemId) {

    const item = cartItems.find(i => i.id === itemId)

    if (item.quantity === 1)
        return cartItems.filter(i => i.id !== itemId)
    else {
        return cartItems.map(i => {
            if (i.id === itemId) {
                i.quantity--
                return i
            }
            else
                return i
        })
    }
}