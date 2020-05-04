import {combineReducers} from 'redux'
import {uiReducer} from './reducers/ui-reducer'
import { userReducer } from './reducers/user-reducer'
import {dataReducer} from "./reducers/data-reducer";
import {cartReducer} from "./reducers/cart-reducer";

export const rootReducer = combineReducers({
    ui:uiReducer,
    user:userReducer,
    data:dataReducer,
    cart:cartReducer
})
