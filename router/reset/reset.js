import express from "express";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();

//用户重置密码
router.post('/reset', function (req, res, next) {
    let reqData = req.body;
    let selSql = 'select * from user where user_name = ?';
    let selSqlArr = [];
    selSqlArr.push(reqData.username);
    let callBack = function (err, data) {
        let msg = {
            msg: '修改成功',
            status: true
        }
        if (err) {
            console.log('出错');
            console.log(err);
            return
        }
        console.log('链接正常');

        console.log(data);
        if (data.length !== 0) {
            //说明查询到了
            if (data[0].user_password === reqData.oldPassword) {
                // 密码正确 修改密码
                let updSql = "update user set user_password = ? where user_name = ?";
                let updSqlArr = [];
                console.log(reqData);
                updSqlArr.push(reqData.newPassword);
                updSqlArr.push(reqData.username);
                let upCallback = function(err,data){
                    if (err) {
                        console.log(err);
                        return
                    }
                    if (data.affectedRows === 1) {
                        res.send(msg);
                        return
                    }else{
                        console.log('修改失败 G');
                    }
                }
                dbConfig.sqlConnect(updSql,updSqlArr,upCallback);

            } else {
                // 密码错误修改失败
                msg.msg = '密码错误'
                msg.status = false
                res.send(msg);
            }
        } else {
            // 说明不存在这个用户
            msg.msg = '用户不存在！';
            msg.status = false;
            res.send(msg);
            return
        }

    }

    dbConfig.sqlConnect(selSql, selSqlArr, callBack);
})


export default router;