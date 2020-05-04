import React from 'react';
import './NoCableSelected.scss'

export const NoCableSelected = ({ type }) => {
    console.log(type)

    let headerJSX = null

    if (type === 'coax')
        headerJSX = <div className='w-full text-xl uppercase ml-3'>Конфігуратор коаксіального кабелю</div>

    else if (type === 'audio')
        headerJSX = <div className='w-full text-xl uppercase'>Конфігуратор аудіокабелю</div>

    return (
        <>

            {headerJSX}
            <div className='no-cable-selected-msg'>
                <div className="material-icons text-5xl mr-2">swap_horiz</div>
                <div className='uppercase text-xl'>
                    Виберіть необхідний кабель та коннектори
            </div>
            </div>
        </>

    );
}

