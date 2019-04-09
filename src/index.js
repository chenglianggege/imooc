import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducers.js'
import './config'
import Login from './containter/login/login.js';
import Register from './containter/register/register.js';
import AuthRouter from './component/authroute/authroute'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f 
))
function Boss(){
    return <h2>boss</h2>
}
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
            <AuthRouter></AuthRouter>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)





