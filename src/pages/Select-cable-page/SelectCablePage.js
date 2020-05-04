import React from 'react'
import './SelectCablePage.scss'
import { useRouteMatch } from 'react-router-dom'



const SelectCablePage = ({ history }) => {


    const { path, url } = useRouteMatch()

    return (
        <div className='select-cable-container'>

            <div className='select-cable-card' onClick={() => history.push(`${url}/coax`)}>
                <img src='images/coax_cables.jpg' alt='coax' />
                <span className='caption'>Коаксіальний кабель</span>
            </div>

            <div className='select-cable-card' onClick={() => history.push(`${url}/audio`)}>
                <img src='images/audio.jpg' alt='coax' />
                <span className='caption'>Аудіокабель</span>
            </div>

            <div className='select-cable-card' onClick={() => history.push(`${url}/audio`)}>
                <img src='images/audio.jpg' alt='coax' />
                <span className='caption'>Аудіокабель</span>
            </div>

        </div>




    )
}

export default SelectCablePage