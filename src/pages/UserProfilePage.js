import React from 'react';
import {FirebaseContext} from "../firebase/firebaseContext";
import {Button} from "../UI/Button/Button";
import {useDispatch} from "react-redux";

export const UserProfilePage = ({history}) => {
    const {user, firebase} = React.useContext(FirebaseContext)
    const dispatch = useDispatch()


    async function handleLogout(e) {
        debugger
        e.preventDefault()

        await firebase.logout()
        // dispatch(setDisplayName(null))
        history.push('/')
    }

    console.log(user)


    if (!user)
        return null

    return (


        <div className="w-1/2 bg-white shadow overflow-hidden sm:rounded-lg mx-auto mt-10">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Information
                </h3>
                {/*<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">*/}
                {/*    Personal details and application.*/}
                {/*</p>*/}
            </div>
            <div>
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                            {user.displayName}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                            E-mail
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                            {user.email}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className='text-center my-8'>
                <Button bgColor='bg-blue' clickHandler={handleLogout}>Logout</Button>
            </div>
        </div>

    );
};