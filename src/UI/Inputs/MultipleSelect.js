import React from 'react';
import cn from "classnames";



export const MultipleSelect = ({  label, id, items, touched, error, handleChange, onBlur, value, selectedValues }) => {
    // console.log('selectedValues',selectedValues);
    // console.log('value',value);

    const applyError = touched && error;


    return (

        <div className="md:flex md:items-center mb-6 ">
            <div className="md:w-1/4">
                <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor={id}>
                    {label}
                </label>
                {selectedValues && <div className='block text-gray-100 md:text-right mb-1 md:mb-0 pr-4'>Selected: {selectedValues}</div>}
            </div>
            <div className="md:w-3/4 relative">
                <select
                    onChange={handleChange}
                    onBlur={onBlur}
                    value={value}
                    className={cn("form-input", 'multiple-select', {'form-input-error':applyError})}
                    multiple={true}
                    id={id}>

                    {

                        items.map(i=>{
                            return <option value={i.value} key={i.value}>{i.displayText}</option>
                        })
                    }

                </select>


            </div>

        </div>

    );
};

