import Axios from "axios";

import {getRedirectPAth} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    pwd:'',
    type:''
}


export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPAth(action.payload),isAuth:true,...state.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPAth(action.payload),isAuth:true,...state.payload}
        case LOAD_DATA:
            return {...state,...action.payload}    
        case ERROR_MSG:
            return {...state,msg:action.msg,isAuth:false}
        default:
            return state
    }
}
function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
export function loadData(userinfo){
    console.log(userinfo)
    return {type:LOAD_DATA,payload:userinfo}
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        Axios.post('/user/login',{user,pwd})
            .then(res=>{
                console.log(res)
                if(res.status === 200 &&res.data.code ===0){
                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function regisger({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!repeatpwd){
        return errorMsg('账号密码不能为空')
    }
    if(pwd!==repeatpwd){
        return errorMsg("两次密码不一致")
    }
    return dispatch=>{
        Axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    dispatch(registerSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}