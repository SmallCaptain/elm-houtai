import express from "express";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();


router.post('/getUserMsg', (req, res, next) => {
    // 返回 图像路径？     余额信息
    console.log(`req.user`, req.user);
    let checkMsgSql = "select money,integrate,preferential_number,img,phone,recive_area,recive_area_detail from user_msg,user where user.id = ?";
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
    }
    dbConfig.sqlConnect(checkMsgSql, checkMsgSqlArr, checkMsgSQLCallback);
});


export default router;