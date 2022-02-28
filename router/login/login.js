import express from "express";
import dbConfig from '../../utils/dbconfig.js';
import jwt from 'jsonwebToken';
import path from 'path';
import {
    nanoid
} from 'nanoid/async'
const __dirname = 'http://localhost:5115'
let router = express.Router();

// 登录账号
router.post('/loginUser', (req, res, next) => {
    let sql = "select * from user where user_name = ?"
    let sqlArr = [];
    let reqData = req.body;
    let secretKey = 'mnnu'
    sqlArr.push(reqData.username)
    console.log(req.user);
    let callBack = (err, data) => {
        if (err) {
            console.log('链接出错')
            console.log(err);
        } else {
            console.log('链接未出错');
            // 判断 是否存在该用户名的账号
            if (data.length !== 0) {
                let msg = {
                    status: true,
                    msg: '密码正确',
                    token: null
                }
                // 说明查找到了
                // 比对密码是否正确
                if (reqData.password === data[0].user_password) {
                    // 参数1 用户的信息对象
                    // 参数2 加密的密钥
                    // 参数3 配置对象，可以配合当前token有效期
                    const token = jwt.sign({
                        username: data.username,
                        userId: data.id
                    }, secretKey, {
                        expiresIn: '10h'
                    });
                    msg.token = token;
                    res.send(msg);
                    return
                } else if (reqData.password !== data[0].user_password) {
                    msg.msg = '密码错误';
                    msg.status = false;
                    res.send(msg);
                    return
                } else {
                    msg.msg = '该账号已被封禁'
                    msg.status = false;
                    res.send(msg);
                    return
                }
            } else {
                // 否则表示没该用户 对其进行注册 id 用户名 密码 状态
                let isql = "insert into user(id,user_name,user_password,status,img) values(?,?,?,?,?)";
                let isqlArr = [];
                let id = null;
                let status = 1;
                let img = __dirname+'/public/images/defalut_avatar.jpg'
                console.log(`img`, img);
                let iscallBack = function (err, data) {
                    if (err) {
                        console.log('插入语句链接出错啦');
                        return
                    }
                    if (data.affectedRows === 1) {
                        // 注册成功！
                        res.send({
                            status: true,
                            msg: '注册成功！！',
                            token: jwt.sign({
                                username: data.username,
                                userId: id
                            }, secretKey, {
                                expiresIn: '10h'
                            })
                        });
                        return
                    }
                }

                async function createId() {
                    id = await nanoid();

                    return id
                }
                createId().then(id => {
                    isqlArr.push(id)
                    isqlArr.push(reqData.username);
                    isqlArr.push(reqData.password);
                    isqlArr.push(status);
                    isqlArr.push(img);

                    dbConfig.sqlConnect(isql, isqlArr, iscallBack)
                });
            }
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)

});
export default router;