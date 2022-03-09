import express from 'express';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import expressJwt from 'express-jwt';

const __dirname = path.resolve();
// 设定app服务器
const app = express();
// 定义token加密密钥
const secretKey = 'mnnu';
// token配置项
const tokenOptions = {
    secret: secretKey,
    algorithms: ['HS256'],
}
// 使用相关中间件 全局设定app

// 解决histroy路由问题
app.use(history());
// 设定静态资源托管
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static(path.join(__dirname, '/public')));
//解决跨域
app.use(cors({}));
// app.use((req, res, next) => {
//     console.log(`req.url`, req.url);
//     next();
// });
// 位置放到路由最后
// 将jwt字符串还原成json对象的中间件 unless 指定接口不需要访问权限 正则匹配 
app.use(expressJwt(tokenOptions).unless({
    path: [/^\/login\//, /^\/public\//, /^\/$/]
}))
// 处理图片的问题
app.get('/public/images/*', function (req, res) {
    res.sendFile(__dirname + "/" + req.url);
    console.log("Request for " + req.url + " received.");
})
// 允许解析 json和urlencoded数据
app.use(express.urlencoded({
    extended: false,
    limit:'1000mb'
}));
app.use(express.json({
    limit:'1000mb'
}));

// 路由设置
import login from './router/login/login.js'
app.use('/login', login);
import reset from './router/reset/reset.js'
app.use('/login', reset);
import user from './router/user/user.js'
app.use('/user', user);
// 商家部分
import merchant from './router/store/index.js'
app.use('/merchant',merchant);

// 错误中间件 在所有路由之后
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            msg: '令牌G了'
        });
    }
    console.log(err);
    res.send({
        status: 500,
        msg: '未知错误'
    });
    next();
})
app.listen(5115, () => {
    console.log(`服务器已成功运行端口5115`)
})