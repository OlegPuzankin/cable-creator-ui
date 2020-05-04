import React from 'react';
import cn from "classnames";



export const Select = ({ label, touched, error, id, items, handleChange, value, name, onBlur } ) => {



    const applyError = touched && error;
    // console.log('select apply error', applyError, name)
    // console.log('name:', name, 'touched:', touched)

    return (

        <div className="md:flex md:items-center mb-6 ">
            <div className="md:w-1/4">
                <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor={id}>
                    {label}
                </label>
                {/*{selectedValues && <div className='block text-gray-100 md:text-right mb-1 md:mb-0 pr-4'>Selected: {selectedValues}</div>}*/}
            </div>
            <div className="md:w-3/4 relative">
                <select
                    onChange={handleChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    className={cn("form-input", {'form-input-error':applyError})}
                    id={id}>
                   <option value='select'>Select item</option>
                    {

                        items.map(i=>{
                            return <option  value={i.value} key={i.value}>{i.displayText}</option>
                        })
                    }

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>

            </div>

        </div>

    );
}

