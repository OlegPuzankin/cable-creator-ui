import React from 'react'
import './Button.scss'


export const Button = ({clickHandler, children, textColor = 'text-white', bgColor, type = 'button', disabled=false}) => {
    return (
        <>
            <button onClick={clickHandler}
                    className={`btn ${textColor} ${bgColor}-500 hover:${bgColor}-700`}
                    type={type}
                    disabled={disabled}
            >
                {children}
            </button>
        </>

    )
}
