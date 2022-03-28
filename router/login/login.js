import express from "express";
import dbConfig from '../../utils/dbconfig.js';
import jwt from 'jsonwebToken';
import fetch from 'node-fetch';
import {
    nanoid
} from 'nanoid/async'
const __dirname = 'http://localhost:5115';
// const __dirname = 'http://124.222.90.62:5115';

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
                let img = __dirname + '/public/images/defalut_avatar.jpg';
                console.log(img);
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
                        let iMsgSql = "insert into user_msg(id,money,integrate,preferential_number,area,areaId) values(?,?,?,?,?,?)";
                        let iMsgArr = [id, 0, 0, 0, '未定位', 0];
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

})
// 获取所有 城市信息
router.post('/getCitys', (req, res, next) => {
    let checkSql = "select * from citys where abbr like ?"
    let checkSqlArr = ['A%', 'B%', 'C%', 'D%', 'E%', 'F%', 'G%', 'H%', 'J%', 'K%', 'L%', 'M%', 'N%', 'P%', 'Q%', 'R%', 'S%', 'T%', 'W%', 'X%', 'Y%', 'Z%'];
    let resData = {};
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(ip);
    getCitys(checkSql, checkSqlArr).then(data => {
        resData = data;
        if (JSON.stringify(resData) !== '{}') {
            res.send(resData);
            return
        } else {
            res.send({
                msg: '失败',
                err: '未知错误'
            });
            return
        }
    });

})
// 获取用户IP地址 然后进行定位
router.post('/getIp', (req, res, next) => {
    let ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    let data = getAddress();


    // data.then(datas =>{
    //     console.log('进入响应');
    //     res.send(datas);
    //     return
    // })

    async function getAddress() {
        let response = await fetch(`https://api.map.baidu.com/location/ip?ak=AuNgnw8TBDiyjBMYroGHphbef4PaTSMw&ip=${ip}&coor=bd09ll`);
        let datas = response.json();
        let obj = {};

        datas.then(data => {
            try {
                console.log("@data", data);
                if (data.status === 0) {

                    console.log('已成功获取定位信息');

                    obj.city = data.address.split('|')[2];
                    obj.code = data.content.address_detail.city_code;
                    obj.status = 200;
                    console.log('@obj', obj);
                    res.send(obj);

                } else {
                    console.log('获取定位信息出错');
                    obj.status = 2;
                    obj.msg = "获取失败 百度服务器内部错误";
                    res.send(obj);

                }
            } catch (e) {
                obj.status = 2;
                obj.msg = '运行时错误'
                console.log(e);

                res.send(obj);
            }

        });



    };
    /*
    then( async(result) => {
            
            let data = await new Promise((resolve,reject)=>{
                result.json().then(data => {
                    console.log(data);
    
                    if (data.status === 0) {
                        console.log('定位成功');
    
                        let obj = {}
                        let city = data.address.split('|')[2];
    
                        obj.city = city;
                        obj.code = data.address_detail.city_code;
                        obj.status = 200;
                        resolve(obj);
                    } else {
                        obj.status = 2;
                        reject(obj);
                    }
                        
                })
            })*/
})

//获取数据库中所有城市的数据
async function getCitys(checkSql, checkSqlArr) {
    let obj = {};
    let data = null;
    for (const iterator of checkSqlArr) {
        let abbr = iterator.split('%')[0];
        data = await dbConfig.SySqlConnect(checkSql, iterator);

        obj[abbr] = data;
    }
    return obj;
}

//#region
/* 
//采集大佬的定位数据吧！
router.post('/copy', (req, res, next) => {
    let reqData = req.body;
    let insertSql = "insert into citys(pinyin,is_map,longitude,latitude,sort,area_code,abbr,name,id) values(?,?,?,?,?,?,?,?,?)";
    let callBack = function (err, data) {
        if (err) {
            console.log('本轮插入失败啦');
            return
        }
        if (data.affectedRows === 1) {
            console.log('插入本轮成功');
        }
    }
    insertData(reqData, insertSql, callBack);
    res.send({
        msg: '搞完啦 有没有报错我也不知道'
    });
    return;
})

 function insertData(reqData, insertSql, callBack) {

    const element = reqData;

    element.forEach( async obj => {
        let insertArr = [];
        for (const key2 in obj) {
            if (Object.hasOwnProperty.call(obj, key2)) {
                const item = obj[key2];
                insertArr.push(item);
            }
        }
        let promise = await dbConfig.SySqlConnect(insertSql, insertArr, callBack);
    });


}*/
// #endregion
export default router;