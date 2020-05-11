import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import SelectCablePage from './pages/Select-cable-page/SelectCablePage';
import MainPage from './pages/MainPage/Main-page';
import Navigation from './components/Navigation/Navigation';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { UserProfilePage } from "./pages/UserProfilePage";
import { DashboardPage } from "./pages/Dashboard-page/DashboardPage";
import { CreateCablePage } from "./pages/CreateCablePage/CreateCablePage";
import { CartPage } from "./pages/Cart-page/CartPage";
import { ShoppingCartIcon } from "./UI/ShoppingCartIcon/ShoppingCartIcon";
import { useSelector } from "react-redux";
import { selectCountOfItems } from "./redux/selectors/cart-selectors";
import { useHistory } from 'react-router-dom'




function App() {
    const countCartItems = useSelector(selectCountOfItems);
    const history = useHistory();


    return (
        <>

            <Navigation />
            {countCartItems !== 0 && <ShoppingCartIcon size='text-4xl' count={countCartItems} clickHandler={() => history.push('/cart')} />}

            <div className='container mx-auto mt-4'>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/signIn" component={SignInPage} />
                    <Route path="/signUp" component={SignUpPage} />
                    <Route path="/select-cable" component={SelectCablePage} exact />
                    <Route path="/select-cable/:type" component={CreateCablePage} />
                    <Route path="/user-profile" component={UserProfilePage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/cart" component={CartPage} />

                    <Redirect to={'/'} />
                </Switch>

            </div>
        </>

    );
}

export default App;
