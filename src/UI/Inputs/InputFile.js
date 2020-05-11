import React from 'react';


export const SelectFile = ({ handleChange, label, id, selectedFile = null, ...otherProps }) => {


    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
                <label className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {label}
                </label>
            </div>
            <div className="md:w-3/4">
                <label htmlFor={id} className='btn bg-gray-600 p-2'>Select file</label>
                <input
                    id={id}
                    onChange={handleChange}
                    className='hidden'
                    {...otherProps} />
                {selectedFile
                    ? <span className='ml-2'>{selectedFile.name}</span>
                    : <span className='ml-2'>No file selected</span>
                }
            </div>
        </div>
    );
};




