import React from 'react'
import './SelectCablePage.scss'
import { useRouteMatch } from 'react-router-dom'



const SelectCablePage = ({ history }) => {


    const { url } = useRouteMatch()

    function coaxSelect() {
        history.push({
            pathname: `${url}/coax`,
            state: { typeId: "oSEeipdzto3zsemlzMqY" }
        })

    }

    function audioSelect() {
        history.push({
            pathname: `${url}/audio`,
            state: { typeId: "ai6JYNgKZPClL443TfWE" }
        })

    }

    function ethernetSelect() {
        history.push({
            pathname: `${url}/ethernet`,
            state: { typeId: "R0sYiqlr3ErC9dCrbjZS" }
        })

    }

    return (
        <div className='select-cable-container'>

            <div className='select-cable-card' onClick={coaxSelect}>
                <img src='images/coax.jpg' alt='coax' />
                <span className='caption'>Коаксіальний кабель</span>
            </div>

            <div className='select-cable-card' onClick={audioSelect}>
                <img src='images/audio.jpg' alt='coax' />
                <span className='caption'>Аудіокабель</span>
            </div>

            <div className='select-cable-card' onClick={ethernetSelect}>
                <img src='images/ethernet.jpg' alt='coax' />
                <span className='caption'>Еthernet кабель</span>
            </div>

        </div>




    )
}

export default SelectCablePage




// 0: { id: "R0sYiqlr3ErC9dCrbjZS", type: "ethernet" }
// 1: { id: "ai6JYNgKZPClL443TfWE", type: "audio" }
// 2: { id: "oSEeipdzto3zsemlzMqY", type: "coax" }

    // () => history.push(`${url}/ethernet`)