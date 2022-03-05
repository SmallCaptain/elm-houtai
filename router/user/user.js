import express from "express";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();

// 获取用户信息
router.post('/getUserMsg', (req, res, next) => {
    // 返回 图像路径？     余额信息
    console.log(`req.user`, req.user);
    let checkMsgSql = "select money,integrate,preferential_number,img,phone from user_msg,user where user.id = ?";
    let checkMsgSqlArr = [];
    checkMsgSqlArr.push(req.user.userId);
    let checkMsgSQLCallback = function (err, data) {
        if (err) {
            console.log('出错', err);
            return err;
        }

        let resData = {
            user: {
                ...data[0]
            }
        }
        res.send(resData);
        return;
    }
    dbConfig.sqlConnect(checkMsgSql, checkMsgSqlArr, checkMsgSQLCallback);
});
// 查看地址
router.post('/getAddress', (req, res, next) => {
    let checkSql = "select recive_area,recive_area_detail,use_phone,recive_name from user_address where id = ?";
    let checkSqlArr = [];
    let callBack = function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        res.send(data);
        return;
    }

    let id = req.user.userId;
    checkSqlArr.push(id);
    dbConfig.sqlConnect(checkSql, checkSqlArr, callBack);
});
// 插入新收货地址数据
router.post('/addAddress', (req, res, next) => {
    let isSql = "insert into user_address(id,recive_name,recive_area,recive_area_detail,use_phone) values(?,?,?,?,?)";
    let isSqlArr = [];
    let userId = req.user.userId;
    let reqData = req.body;
    console.log(reqData);
    isSqlArr.push(userId);
    for (const key in reqData) {
        if (Object.hasOwnProperty.call(reqData, key)) {
            const element = reqData[key];
            isSqlArr.push(element);
        }
    }
    let callBack = function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        if (data.affectedRows === 1) {
            res.send({
                status: 200,
                msg: '数据插入成功啦'
            });
            return
        } else {
            res.send({
                status: 500,
                msg: '数据插入失败。。。'
            });
            return
        }
    }
    dbConfig.sqlConnect(isSql, isSqlArr, callBack);
});
// 删除
router.post('/delItem', (req, res, next) => {
    let delSql = "delete from user_address where id = ? and recive_area = ? and recive_area_detail = ? and use_phone =? and recive_name = ?";
    let delSqlArr = [];
    let id = req.user.userId;
    let reqData = req.body;
    let callBack = function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        if (data.affectedRows >= 1) {
            res.send({
                status: 200,
                msg: '删除成功'
            });
        } else {
            res.send({
                status: 500,
                msg: '删除失败了'
            });
        }
    }
    console.log(reqData);
    if (reqData.length >= 0) {
        reqData.forEach(item => {
            delSqlArr = [id];
            for (const key in item) {

                const element = item[key];
                delSqlArr.push(element);

            }
            console.log(delSqlArr);
            if (delSqlArr.length > 1) {
                dbConfig.sqlConnect(delSql, delSqlArr, callBack);
            }
        });
    }
})
// 修改用户名
router.post('/chageUserName',(req,res,next)=>{
    // 先查询 是否存在 要修改后的用户名 存在就不让改 避免同名
    let checkSql = "select * from user where user_name = ?";
    let checkSqlArr = [];
    let userName = req.body.userName;
    let id = req.user.userId;
    checkSqlArr.push(userName);
    let checkCallBack = function(err,data){
        if (err) {
            console.log(err);
            return;
        }
        if (data.length===0) {
            let updSql = "update user set user_name = ? where id = ?";
            let updArr = [];
            let updCallBack = function(err,data){
                if (err) {
                    console.log(err);
                    return
                }
                if (data.affectedRows === 1) {
                    res.send({
                        status:200,
                        msg:'修改用户名成功~'
                    });
                    return;
                }else
                    res.send({
                        status:400,
                        msg:'未知错误'
                    });
                    return;
            }
            updArr.push(userName);
            updArr.push(id);

            dbConfig.sqlConnect(updSql,updArr,updCallBack);
        }else{
            res.send({
                status:500,
                msg:'已存在同用户名,修改失败'
            });
            return
        }
    };
    dbConfig.sqlConnect(checkSql,checkSqlArr,checkCallBack);
})
// 修改头像
router.post('/chageAvatar',(req,res,next)=>{
    console.log(req.body);
})

export default router;