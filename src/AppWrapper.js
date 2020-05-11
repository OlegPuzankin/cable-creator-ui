import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { FirebaseContext } from './firebase/firebaseContext'
import { firebase } from './firebase/firebase'
import useAuth from './hooks/useAuth'
import { setCurrentUser } from "./redux/actions/user-actions";
import { useInitData } from "./hooks/useInitData";


const AppWrapper = () => {


    // const [cables, setCables] = React.useState([])

    const user = useAuth();
    if (user) {
        store.dispatch(setCurrentUser(user))
    }
    //INIT AND SUBSCRIBE FOR UPDATING DATA
    useInitData()



    return (

        <Provider store={store}>

            <FirebaseContext.Provider value={{ user, firebase }}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FirebaseContext.Provider>
        </Provider>
    );
}

export default AppWrapper;