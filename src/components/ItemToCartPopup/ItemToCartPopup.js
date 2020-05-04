import React from 'react';
import './ItemToCartPopup.scss';
import { Button } from "../../UI/Button/Button";
import { CloseIcon } from "../../UI/CloseIcon/CloseIcon";
import { useSelector } from "react-redux";
import { selectProducersMappedObj } from "../../redux/selectors/data-selectors";

export const ItemToCartPopup = ({ closeHandler, itemToCart, addItem, addItemAndGoToCart }) => {
    const producersMappedObj = useSelector(selectProducersMappedObj);
    const { selectedCable, connector_A, connector_B, length, price } = itemToCart

    return (

        <div className="item-to-cart">

            <div className='item-to-cart__title'>
                <div className='pl-4 font-bold mr-auto text-lg'>Конфігурація готового кабеля</div>
                <CloseIcon closeHandler={closeHandler} />
            </div>


            <div className='item-to-cart__item'>
                <span className='font-bold'>
                    Кабель: {`${producersMappedObj[selectedCable.producer].name} ${selectedCable.partNumber}`}
                </span>

                <span> - {selectedCable.desc}</span>

            </div>
            <div className='item-to-cart__item'>
                <span className='font-bold'>
                    Роз'єм A: {`${producersMappedObj[connector_A.producer].name} ${connector_A.partNumber}`}
                </span>
                <span> - {connector_A.desc}</span>
            </div>
            <div className='item-to-cart__item'>
                <span className='font-bold'>
                    Роз'єм B: {`${producersMappedObj[connector_B.producer].name} ${connector_B.partNumber}`}
                </span>
                <span> - {connector_B.desc}</span>
            </div>
            <div className='item-to-cart__item'>
                <span className='font-bold'>Довжина кабелю: </span>
                <span>{length}</span>
            </div>

            <div className='item-to-cart__item'>
                <span className='font-bold'>Ціна готового кабеля: </span>
                <span>{price}</span>
            </div>

            <div className='item-to-cart_buttons'>
                <Button clickHandler={addItem} bgColor='bg-blue'>
                    Додати та продовжити
                </Button>

                <div className='gap_1' />

                <Button clickHandler={addItemAndGoToCart} bgColor='bg-red'>
                    Додати та перейти до кошика
                </Button>
            </div>
        </div>


    );
};