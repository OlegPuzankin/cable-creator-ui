import React from 'react';
import './GoBackIcon.scss'


export const GoBackIcon = ({ clickHandler, size }) => {
    return (
        <div className='back-icon-container' onClick={clickHandler}>
            <span className={`material-icons ${size}`}>arrow_back</span>
        </div>
    );


}

