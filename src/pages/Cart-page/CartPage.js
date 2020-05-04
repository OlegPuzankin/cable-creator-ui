import React from 'react';
import './CartPage.scss';
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/selectors/cart-selectors";
import { CartItem } from "../../components/CartItem/CartItem";
// import { useHistory } from 'react-router-dom'



export const CartPage = (props) => {


    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    // const history = useHistory()



    if (cartItems.length === 0)
        return <div className='empty-cart'>Корзина пуста</div>



    return (
        <div className='checkout-page bg-white'>
            <div className='checkout-header'>
                <span className='header-block-product'>Кабель</span>
                <span className='header-block-description'>Опис кабелю</span>
                <span className='header-block'>Маркер</span>
                <span className='header-block'>Кількість</span>
                <span className='header-block'>Ціна</span>
                <span className='header-block'>Видалити</span>
            </div>
            {
                cartItems.map((cartItem, idx) => <CartItem key={idx} cartItem={cartItem} />)
            }
            <div className='total'>
                <span>Total: ${cartTotal}</span>
            </div>

        </div>
    );
};