import React from 'react';
import './ShoppingCartIcon.scss'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCountOfItems } from '../../redux/selectors/cart-selectors'

export const ShoppingCartIcon = ({ count, size, clickHandler }) => {
    const cartItems = useSelector(selectCartItems)
    const countCartItems = useSelector(selectCountOfItems)

    React.useEffect(() => {

        debugger
        const cartJSON = JSON.stringify(cartItems)  //update cart in local storage
        window.localStorage.setItem('cart', cartJSON) //update cart in local storage

    }, [cartItems, countCartItems])

    return (
        <div className='shopping-cart-container' onClick={clickHandler}>
            <span className={`material-icons ${size}`}>shopping_cart</span>
            <div className='shopping-cart-count'>
                <div className='text-xs font-bold'>{count}</div>
            </div>
        </div>

    );
};