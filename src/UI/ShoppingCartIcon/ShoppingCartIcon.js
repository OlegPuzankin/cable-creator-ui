import React from 'react';
import './ShoppingCartIcon.scss'

export const ShoppingCartIcon = ({count, size, clickHandler}) => {
    return (
        <div className='shopping-cart-container' onClick={clickHandler}>
            <span className={`material-icons ${size}`}>shopping_cart</span>
            <div className='shopping-cart-count'>
                <div className='text-xs font-bold'>{count}</div>
            </div>
        </div>

    );
};