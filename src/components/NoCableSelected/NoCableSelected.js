import React from 'react';
import './NoCableSelected.scss'
import { useLocation } from 'react-router-dom'

const titles = {
    oSEeipdzto3zsemlzMqY: 'Конфігуратор коаксіального кабелю',
    ai6JYNgKZPClL443TfWE: 'Конфігуратор аудіокабелю',
    R0sYiqlr3ErC9dCrbjZS: 'Конфігуратор ethernet кабелю'
}


export const NoCableSelected = () => {
    const { typeId } = useLocation().state
    return (
        <>

            <div className='w-full text-xl uppercase ml-3'>{titles[typeId]}</div>
            <div className='no-cable-selected-msg'>
                <div className="material-icons text-5xl mr-2">swap_horiz</div>
                <div className='uppercase text-xl'>
                    Виберіть необхідний кабель та коннектори
            </div>
            </div>
        </>

    );
}

