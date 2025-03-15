import { configureStore, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import reducer from './reducers'

const store = configureStore({
    reducer: reducer,
    middleware: () => new Tuple(thunk),
})

export default store