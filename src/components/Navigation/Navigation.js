import React from 'react'
import './Navigation.scss'
import { Link, NavLink } from 'react-router-dom'
import { FirebaseContext } from '../../firebase/firebaseContext'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from "../../UI/Button/Button";
import { UserProfileIcon } from "../../UI/UserProfileIcon/UserProfileIcon";



const Navigation = () => {
    const { user } = React.useContext(FirebaseContext);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const history = useHistory();
    const location = useLocation();



    function redirectToLoginPage(e) {
        e.preventDefault();

        history.push('/signIn')
    }
    //check if user is admin
    React.useEffect(() => {

        if (!user) {
            setIsAdmin(false);
            return
        }

        if (user.uid === process.env.REACT_APP_ADMIN_ID)
            setIsAdmin(true)
        // else
        //     setIsAdmin(false)
    }, [user]);


    if (location.pathname.includes('/dashboard'))
        return null;


    return (
        <>

            <nav className="nav-container">
                <div className="flex items-center">

                    <Link to='/' className='logo-container'>Cable creator</Link>

                    <div className="flex items-center">
                        <NavLink to="/select-cable"
                            activeClassName='nav-link-selected'
                            className="nav-link ">
                            Кабельний конфігуратор
                        </NavLink>
                        <NavLink to="/about us"
                            activeClassName='nav-link-selected'
                            className="nav-link  ">
                            Про нас
                        </NavLink>
                        <NavLink to="/info"
                            activeClassName='nav-link-selected'
                            className="nav-link  ">
                            Інформація
                        </NavLink>

                        {isAdmin &&
                            <NavLink to="/dashboard"
                                activeClassName={'nav-link-selected'}
                                className="nav-link ">
                                DASHBOARD
                        </NavLink>}
                    </div>
                </div>


                <div className='flex items-center'>

                    {user
                        ? (<div className='flex'
                            onClick={() => history.push('/user-profile')}>
                            <UserProfileIcon size='text-5xl' />
                        </div>)

                        : <Button clickHandler={redirectToLoginPage} bgColor='bg-blue'>Login</Button>
                    }
                </div>
            </nav>


        </>

    )
};

export default Navigation