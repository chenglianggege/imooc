//合并所有的reducer 并且返回

import {combineReducers} from 'redux'
import {user} from './redux/register.redux'


export default combineReducers({user})