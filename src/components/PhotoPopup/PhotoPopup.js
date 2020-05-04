import React from 'react';
import './PhotoPopup.scss'
import {CloseIcon} from "../../UI/CloseIcon/CloseIcon";


export const PhotoPopup = ({imageUrl, productTitle, closeHandler}) => {
    return (
        <div className="popup-photo ">
            <div className='flex items-center'>
                <h3 className='pl-2 font-bold mr-auto'>
                    {productTitle}
                </h3>
                <div className='m-1'>
                    <CloseIcon closeHandler={closeHandler}/>
                </div>

            </div>
            <img src={imageUrl} alt="" className='bg-center'/>
        </div>
    );
};