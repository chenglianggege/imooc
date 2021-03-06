const mongoose = require('mongoose')
//连接MongoDB，并且使用imooc这个集合
const DB_URL = "mongodb://localhost:27017/imooc-chat"
mongoose.connect(DB_URL,{ useNewUrlParser: true },function(err){
    if(err){
        console.log('connnect error'+err)
    }else{
        console.log('connnect success')
    }
});


const models = {
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人简介
        'desc':{'type':String},
        //职位
        'tittle':{'type':String},
        //公司 钱
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}