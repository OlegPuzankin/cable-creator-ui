import React from 'react'
import axios from 'axios'

const MainPage = () => {

    async function sendEmail() {
        try {

            const response = axios.post('http://localhost:3000/send_email', {
                firstName: 'Fred',
                lastName: 'Flintstone'
            })
        }
        catch (error) {
            console.log(error)

        }

    }


    return (
        <>
            <div className='flex bg-gray-400 h-80vh'>
                <button onClick={sendEmail}>Send</button>

                Main Page
            </div>

        </>

    )
}

export default MainPage