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
                        username: data[0].user_name,
                        userId: data[0].id
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
                let isql = "insert into user(id,user_name,user_password,status,img,phone) values(?,?,?,?,?,?)";
                let isqlArr = [];
                let id = null;
                let status = 1;
                let img = __dirname + '/public/images/defalut_avatar.jpg'
                let iscallBack = function (err, data) {
                    if (err) {
                        console.log('插入语句链接出错啦');
                        return
                    }
                    if (data.affectedRows === 1) {
                        console.log(`data.username`, reqData.username);
                        console.log(`id`, id);
                        // 注册成功！
                        // 往 user_msg表中初始化数据
                        let iMsgSql = "insert into user_msg(id,money,integrate,preferential_number,area,recive_area,recive_area_detail) values(?,?,?,?,?,?,?)";
                        let iMsgArr = [id, 0, 0, 0, '未定位', '未设置','未设置'];
                        let iMsgArrCallback = function (err, data) {
                            if (err) {
                                console.log('插入语句链接出错啦', err);
                                return
                            }
                            console.log('初始化user_msg成功');
                        }
                        dbConfig.sqlConnect(iMsgSql, iMsgArr, iMsgArrCallback);
                        res.send({
                            status: true,
                            msg: '注册成功！！',
                            token: jwt.sign({
                                username: reqData.username,
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
                    isqlArr.push('无');

                    dbConfig.sqlConnect(isql, isqlArr, iscallBack)
                });
            }
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)

});
export default router;