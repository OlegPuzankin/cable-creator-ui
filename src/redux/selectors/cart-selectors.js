import { createSelector } from 'reselect'

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (data) => data.cartItems
);

export const selectCountOfItems = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.length
);


export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity * cartItem.price, 0)
)

