import express from "express";
import dbconfig from "../../utils/dbconfig.js";
import dbConfig from '../../utils/dbconfig.js';
let router = express.Router();

// 获取商店店铺
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
// 查询分类列表数据
router.post('/getClassify', (req, res, next) => {
    //从 type_class表中 取得相关tag数据

    checkTypeClass();
    async function checkTypeClass() {
        let tagData;
        let sql = "select * from type_class";

        tagData = await dbConfig.SySqlConnect(sql, []);
        if (tagData instanceof Array) {
            //数组 说明没出错 tag数据 从商家中 搜索出对应数据
            let resData = [];
            let tagPromise = await new Promise(async (resolve, reject) => {
                for (let i = 0; i < tagData.length; i++) {
                    let checkMerchant = "select type_name as name,count(*) as amount,type from merchant where type_class = ? group by type_name";
                    let sqlArr = [tagData[i].name];
                    let item = {};
                    let data = await dbConfig.SySqlConnect(checkMerchant, sqlArr);

                    if (data instanceof Array) {
                        item.tag = tagData[i].name;
                        if (data.length !== 0) {
                            item.items = data;
                        } else {

                            item.items = [];
                        }
                        resData.push(item);
                    } else {
                        console.log(data);
                        reject(null);
                    }

                }
                resolve(resData);

            });
            res.send(tagPromise);

        } else {
            //出错了
            console.log(tagData);
            res.send({
                status: 500,
                msg: '出错'
            });
            return;
        }
    }
})
//根据分类列表查询商家
router.post('/getMerchantByClassify', (req, res, next) => {
    //req 请求参数为 type
    let type = req.body.type;
    let sql = "select * from merchant where type = ?";
    let callback = function (err, data) {
        if (err) {
            console.log(err)
            res.send({
                status: 500,
                msg: '请求出错！'
            });
            return;
        }
        if (data.length !== 0) {
            res.send({
                status: 200,
                data
            });
        } else {
            res.send({
                status: 500,
                msg: 'NOT_DATA'
            });
        }
    }
    dbConfig.sqlConnect(sql, [type], callback);
})
//排序查询商家
router.post('/searchMerchantBySort', (req, res, next) => {
    //type是排序种类 详情看excel表
    let type = req.body.type;
    //classify 表示种类 比如 简餐 烧烤 小吃 奶茶
    let classify = req.body.classify;
    console.log('@classify', classify);
    let sql = '';
    let callback = function (err, data) {
        if (err) {
            console.log(err);
            res.send({
                status: 500,
                msg: '查询出错'
            })
            return;
        }
        if (data.length !== 0) {
            res.send({
                status: 200,
                data
            })
        } else {
            res.send({
                status: 500,
                msg: '空数据。。'
            });
        }

        return;
    }
    if (type === 'autoSort') {
        //智能排序。。。 呃。。？ 全部搜索吧
        sql = classify !== '' ? 'select * from merchant where type = ?' : 'select * from merchant';
    } else if (type === 'shortDistance') {
        //距离最近 即公里数最小 升序
        sql = classify !== '' ? 'select * from merchant where type= ? order by instance asc' :
            'select * from merchant order by instance asc';

    } else if (type === 'topSelling') {
        //销量最高
        sql = classify !== '' ? 'select * from merchant where type= ? order by sales desc' :
            'select * from merchant order by sales desc';
    } else if (type === 'lowestStartPrice') {
        //起送价最低
        sql = classify !== '' ? 'select * from merchant where type= ? order by de_conditions asc' :
            'select * from merchant order by de_conditions asc';

    } else if (type === 'fastDelivery') {
        //配送速度最快 配送时间越小 越有可能，，
        sql = classify !== '' ? 'select * from merchant where type= ? order by shipping_time asc' : 
        'select * from merchant order by shipping_time asc';

    } else if (type === 'highestScore') {
        //评分最高
        sql = classify !=='' ? 'select * from merchant where type= ? order by star desc' :
        'select * from merchant order by star desc';
    }
    if (classify !== '') {
        dbConfig.sqlConnect(sql, [classify], callback);
    } else {
        dbConfig.sqlConnect(sql, [], callback);

    }

})
export default router;