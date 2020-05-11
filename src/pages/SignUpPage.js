import React from 'react'
import { FormInput } from '../UI/Inputs/FormInput'
import { FirebaseContext } from '../firebase/firebaseContext'
import { Button } from "../UI/Button/Button";


const SignUpPage = (props) => {
    const [state, setState] = React.useState({ email: '', password: '', name: '', errorSignUp: '' });
    const { firebase } = React.useContext(FirebaseContext)


    function handleChange(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await firebase.register(state.name, state.email, state.password)
            props.history.push('/')
        }

        catch (e) {
            setState({ ...state, errorSignUp: e.message })
        }
    }

    return (
        <div className='mt-16 w-2/3 bg-gray-900 rounded mx-auto p-8 pr-12'>
            <div className='text-red-500 text-center h-8'>{state.errorSignUp}</div>
            <form onSubmit={handleSubmit}>
                <div className='text-white text-center mb-3 text-lg'>Sign up form</div>
                <FormInput value={state.name}
                    autoComplete='off'
                    type="text"
                    id='name'
                    label='User name'
                    name='name'
                    // placeholder='User name'
                    handleChange={handleChange} />
                <FormInput value={state.email}
                    autoComplete='off'
                    type="email"
                    id="email"
                    label='E-mail'
                    name='email'
                    placeholder='email'
                    handleChange={handleChange} />
                <FormInput value={state.password}
                    autoComplete='off'
                    type="password"
                    id="password"
                    label='Password'
                    handleChange={handleChange}
                    name='password' />
                <div className='text-center'>
                    <Button bgColor='bg-blue' clickHandler={handleSubmit} type='submit'>Create account</Button>
                </div>



            </form>
        </div>
    )
}

export default SignUpPage