import React from 'react';
import './CloseIcon.scss'


export const CloseIcon = ({closeHandler}) => {
    return (
        <div className='close-icon' onClick={closeHandler}>
            <div className="material-icons"> close </div>
        </div>


    );
};