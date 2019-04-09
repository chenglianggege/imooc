import React from 'react'
import axios from "axios"
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {loadData} from '../../redux/register.redux'

class Authroute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','register']
        const pathName = this.props.history.pathName

        if(publicList.indexOf(pathName)>-1){
            return null
        }

        //获取用户信息
        //是否登录
        //现在的URL地址 login就不需要跳转
        //用户的身份 boss法师ginus
        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200){
                    console.log(res.data)
                    if(res.data.code === 0){
                        //有登录信息
                        console.log(res.data.data)
                        this.props.loadData(res.data.data)
                    }else{
                        this.props.history.push('/login')
                    }
                }
                
            })
    }
    render(){
        return <h3>tiaozhuan</h3>
    }
}
Authroute = withRouter(Authroute)
Authroute = connect(
    state=>state.user,
    {loadData}
)(Authroute)
export default Authroute