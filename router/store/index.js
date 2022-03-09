import express from "express";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();

router.post('/getStore',(req,res,next)=>{
    let checkSql = "select * from merchant";
    let callBack=function(err,data){
        let resData = {
            status:200,
            msg:'获取数据成功'
        }
        if (err) {
            console.log(err);
            return;
        }
        if (data.length !== 0) {
            resData.data=data;
            res.send(resData);
        }else{
            resData.msg="未知出错！！！！！"
            res.send(resData);
        }
    }
    dbConfig.sqlConnect(checkSql,[],callBack);
})

export default router;