import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { LoginSuccess} from './redux/AuthActions'


const reducer = combineReducers({
    userLogin: LoginSuccess,
})


const userInfoFromStorage = localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null




const initialState = {
    userLogin: { user: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store