import React from 'react';
import './CartItem.scss'
import { useSelector } from "react-redux";
import { selectProducersMappedObj } from "../../redux/selectors/data-selectors";
import { useDispatch } from 'react-redux'
import { clearItemFromCart, increaseQuantity, decreaseQuantity } from '../../redux/actions/cart-actions';


function getProductName(producer, partNumber, length, label) {

    return `${producer} ${partNumber} - ${length}m - #${label}`
}

function getCableType(cable) {
    switch (cable.type) {
        case process.env.REACT_APP_COAX_TYPE_ID:
            return 'Кабель коаксіальний'
        case process.env.REACT_APP_AUDIO_TYPE_ID:
            return 'Кабель аудіо'
        default:
            return 'Кабель'

    }
}


////////////////////////////////REACT COMPONENT////////////////////////////////////////
export const CartItem = ({ cartItem }) => {

    const dispatch = useDispatch();

    const { selectedCable: cable, connector_A, connector_B, quantity, length, label, price } = cartItem;
    const producersMappedObj = useSelector(selectProducersMappedObj);


    return (
        <div className='cart-item'>
            <span className='product'>
                {getProductName(producersMappedObj[cable.producer].name, cable.partNumber, length, label)}
            </span>
            <span className='description'>
                <div>
                    {`${getCableType(cable)}, ${producersMappedObj[cable.producer].name} ${cable.partNumber} (${cable.desc}.)`}
                </div>
                <div>
                    {`Роз'єм А - ${producersMappedObj[connector_A.producer].name} ${connector_A.partNumber}.`}
                </div>
                <div>
                    {`Роз'єм B - ${producersMappedObj[connector_B.producer].name} ${connector_B.partNumber}.`}
                </div>
                <div>
                    {`Довжина готового кабелю - ${length}`}
                </div>
            </span>
            <span className='label'>{label}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => dispatch(decreaseQuantity(cartItem.id))}>&#10094;</div>
                <span className='value'> {quantity} </span>
                <div className='arrow' onClick={() => dispatch(increaseQuantity(cartItem.id))}>&#10095;</div>
            </span>
            <span className='price'>{price}$</span>
            <div className='remove-button' onClick={() => dispatch(clearItemFromCart(cartItem.id))}>&#10006;</div>
        </div>
    );
};