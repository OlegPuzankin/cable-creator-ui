import React from 'react'

import { FormInput } from '../UI/Inputs/FormInput'

import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../firebase/firebaseContext'
import { Button } from '../UI/Button/Button'

const SignInPage = (props) => {
    console.log(props, 'sign in props');
    const [state, setState] = React.useState({ email: '', password: '', errorSignIn: '' });

    const dispatch = useDispatch()
    // const errorSignIn = useSelector(state => state.user.errorSignIn)
    // const user = useSelector(state => state.user.user)

    const { firebase, user } = React.useContext(FirebaseContext)


    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const user = await firebase.login(state.email, state.password)
            debugger
            // dispatch(setDisplayName(user.displayName))


        } catch (e) {
            setState({ ...state, errorSignIn: e.message })

        }

    }

    async function handleSignInWithGoogle(e) {
        e.preventDefault()
        try {
            const user = await firebase.loginWithGoogle()
            // dispatch(setDisplayName(user.displayName))
        } catch (e) {
            setState({ ...state, errorSignIn: e.message })
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    if (user)
        props.history.push('/')

    return (

        <div className='mt-16 w-2/3 bg-gray-600 rounded mx-auto p-8 pr-12'>
            <div className='text-red-500 text-center h-8'>{state.errorSignIn}</div>
            <form onSubmit={handleSubmit}>
                <div className='text-white text-center mb-6 text-lg uppercase'>Log in to your account</div>
                <FormInput value={state.email}
                    autoComplete='off'
                    type="email"
                    id="email"
                    label='Email'
                    name='email'
                    // placeholder='email'
                    handleChange={handleChange} />
                <FormInput value={state.password}
                    autoComplete='off'
                    type="password"
                    id="password"
                    label='Password'
                    handleChange={handleChange}
                    name='password' />

                <div className='flex justify-end'>
                    <div className='mr-4'>
                        <Button type={'submit'} clickHandler={handleSubmit} bgColor='bg-blue'>Sign in</Button>
                    </div>

                    <Button clickHandler={handleSignInWithGoogle} bgColor='bg-red'>Sign with google</Button>
                </div>


                <div className='mt-4 text-white cursor-pointer text-right font-bold hover:text-green-500 transition duration-200'
                    onClick={() => props.history.push('/signUp')}>
                    Need to create account?
                </div>


            </form>
        </div>
    )
}

export default SignInPage