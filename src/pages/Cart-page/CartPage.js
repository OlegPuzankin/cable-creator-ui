import React from 'react';
import './CartPage.scss';
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/selectors/cart-selectors";
import { CartItem } from "../../components/CartItem/CartItem";
import { useHistory } from 'react-router-dom'
import { GoBackIcon } from '../../UI/GoBackIcon/GoBackIcon'
import { Loader } from '../../UI/Loader/Loader'



export const CartPage = (props) => {


    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const isInitialize = useSelector(state => state.ui.isInitialize);

    const history = useHistory()


    ////////////////////render//////////////////////


    if (isInitialize) {
        return (
            <div className='loader-background'>
                <div className='loader-container'>
                    <Loader />
                </div>
            </div>)
    }



    if (cartItems.length === 0) {
        return (
            <>
                <div className='empty-cart'>Корзина пуста</div>
                <GoBackIcon clickHandler={() => history.goBack()} size='text-4xl' />
            </>)
    }




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
            <GoBackIcon clickHandler={() => history.goBack()} size='text-4xl' />

        </div>
    );
};