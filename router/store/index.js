import express from "express";
import dbconfig from "../../utils/dbconfig.js";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();

//获取商店店铺
router.post('/getStore', (req, res, next) => {
    let checkSql = "select * from merchant";
    let callBack = function (err, data) {
        let resData = {
            status: 200,
            msg: '获取数据成功'
        }
        if (err) {
            console.log(err);
            return;
        }
        if (data.length !== 0) {
            resData.data = data;
            res.send(resData);
        } else {
            resData.msg = "未知出错！！！！！"
            res.send(resData);
        }
    }
    dbConfig.sqlConnect(checkSql, [], callBack);
})
// 获取商店物品
router.post('/getStoreItems', (req, res, next) => {
    // 第一次查询 获取商品type字段 后续根据type字段去查询出数据
    let typeSql = "select type from commoditys where merchant_id = ? group by type ";
    let id = req.body.id;
    let typeCallBack = function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        if (data.length !== 0) {
            getItems(data).then(data => {
                let resData = data;
                if (resData.length !== 0) {
                    res.send(resData);
                } else
                    res.send({
                        status: 200,
                        msg: '没有数据哦',
                        data: []
                    })
            });

        } else
            res.send({
                status: 200,
                msg: '没有数据哦',
                data: []
            })
    }
    dbConfig.sqlConnect(typeSql, [id], typeCallBack);

    async function getItems(typeArray) {
        let dataArray = [];
        let selSql = "select * from commoditys where type = ?";

        for (let i = 0; i < typeArray.length; i++) {
            let data = await dbconfig.SySqlConnect(selSql, typeArray[i].type);
            dataArray.push(data);

        }

        return dataArray;
    }
})
// 模糊查询商店店铺
router.post('/searchStore', (req, res, next) => {
    let keyword = `%${req.body.keyword}%`;
    let checksql = "select * from merchant where name like ?";
    let callBack = function (err, data) {
        if (err) {
            console.log(err);
            res.send('null');
            return;
        }
        res.send(data);
        return;
    }
    dbConfig.sqlConnect(checksql, [keyword], callBack);
})

export default router;