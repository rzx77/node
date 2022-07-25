// node后端服务器

// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const Tes = require('./api/Tes')
const express = require('express') // express框架
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

// const router=require('./router')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// 后端api路由
app.use('/api/Tes', Tes) 

// 监听端口
app.listen(3000, () => {
    console.log('3000 running');
}) // 监听server3000端口

