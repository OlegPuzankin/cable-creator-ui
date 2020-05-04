import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from "./rootReducer"
import logger from 'redux-logger'
import thunk from 'redux-thunk'


const sagaMiddleware = createSagaMiddleware()


const middleware = [sagaMiddleware, thunk];

if (process.env.NODE_ENV === 'development')
    middleware.push(logger)

export const store = createStore(rootReducer, applyMiddleware(...middleware));
