import React from 'react';
import './FormInput.scss'
import cn from 'classnames'


export const FormInput = ({ handleChange, label, id, error, touched, ...otherProps }) => {

    const applyError = touched && error;
    // console.log('form input', touched, error)
    return (

        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
                <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor={id}>
                    {label}
                </label>
            </div>
            <div className="md:w-3/4 leading-3">
                <input
                    // className="form-input py-2 px-4 text-gray-700"
                    className={cn("form-input", {'form-input-error':applyError})}
                    id={id}
                    onChange={handleChange}
                    {...otherProps}/>
            </div>
        </div>
    );
};