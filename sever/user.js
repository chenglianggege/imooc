const express = require('express')
const utilis = require("utility")
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

//定义内部返回值 不显示密码，版本号
const _filter = {pwd:0,__v:0}

Router.get('/list',function(req,res){

    //清空
    //User.remove({},function(e,d){})
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Salt(pwd)},_filter,function(err,doc){
        if(!doc){
            res.json({code:1,msg:'2b用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function(req,res){
    //注册
    const {user,pwd,type} = req.body
    User.findOne({user},function(err,doc){
        if(doc){
            res.json({code:1,msg:'用户名已存在'})
        }
        const userModel = new User({user,type,pwd:md5Salt(pwd)})
        userModel.save(function(e,d){
            if(e){
                res.json({code:1,msg:"后端出错了"})
            }
            const {user,type,_id} = d
            res.cookie('userid' , _id)
            res.json({code:0,data:{user,type,_id}})
        })
        /* 
            //creat无法立即获取_id 序列号
            User.create({user,type,pwd:md5Salt(pwd)},function(err,doc){
            if(err){
                res.json({code:1,msg:"后端出错了"})
            }
            return res.json({code:0})
        }) */
    })
}) 
Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return  res.json({code:1})
    }
    //return  res.json({code:0})
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"后台罢工了"})
        }    
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
function md5Salt(p){
    const salt = '28sx8shj1ladnkasa[[[asdad2'
    return utilis.md5(utilis.md5(p+salt))
}
module.exports = Router