import React from 'react'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'
import {regisger} from "../../redux/register.redux"
import Logo from '../../component/logo/logo'

//import '../../reducers'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type : 'genius'
        }
        this.handRegister = this.handRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handRegister(){
        this.props.regisger(this.state)
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        
        return (
            <div>
                <Logo></Logo>
                <h2>注册页</h2>
                <WingBlank>
                    <List>
                        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                        {this.props.msg?<p className="err-msg">{this.props.msg}</p>:null}
                        <InputItem 
                            onChange = {v=>this.handleChange("user",v)}
                        >用户名</InputItem>
                        <InputItem
                            onChange = {v=>this.handleChange("pwd",v)}  
                            type="password"                      
                        >密码</InputItem>
                        <InputItem
                            onChange = {v=>this.handleChange("repeatpwd",v)}
                            type="password"
                        >确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem 
                            checked={this.state.type == "genius"}
                            onChange={v=>this.handleChange('type','genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem 
                            checked={this.state.type == "boss"}
                            onChange={v=>this.handleChange('type','boss')}
                        >
                            Boss
                        </RadioItem>
                        <WhiteSpace></WhiteSpace>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick = {this.handRegister}>注册</Button>
                    </List>
                </WingBlank>
                
            </div>
        )
    }
}
Register = connect(
    state=>state.user,
    {regisger}
)(Register)
export default Register