import React from 'react';
import cn from "classnames";

export const TextArea = ({handleChange, label, id, error, touched, ...otherProps}) => {

    const applyError = touched && error;
    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/4">
                <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor={id}>
                    {label}
                </label>
            </div>
            <div className="md:w-3/4">
              <textarea
                  className={cn("form-input", {'form-input-error': applyError})}
                  id={id}
                  onChange={handleChange}
                  {...otherProps}/>
            </div>
        </div>
    );
};