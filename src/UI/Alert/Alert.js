import React from 'react';
import './Alert.scss'

import { CloseIcon } from "../CloseIcon/CloseIcon";

export const Alert = ({ message, textColor = 'text-white', bgColor, cb }) => {

    const ref = React.useRef(null)

    function closeHandler(e) {
        e.persist()
        ref.current.classList.add('exiting')
        setTimeout(cb, 2000)
    }


    return (
        <div ref={ref} className={`alert-box ${textColor} ${bgColor}`}>
            <div className='alert-box__text'>
                {message}
            </div>
            <CloseIcon closeHandler={closeHandler} />
        </div>)
}