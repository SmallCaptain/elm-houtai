import express from "express";
import dbConfig from '../../utils/dbconfig.js';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import dbconfig from "../../utils/dbconfig.js";
import {
    nanoid
} from 'nanoid/async';

const __dirname = path.resolve();
const imgSrc = 'http://localhost:5115';
// const imgSrc = 'http://124.222.90.62:5115';
let router = express.Router();

// 获取用户信息
router.post('/getUserMsg', (req, res, next) => {
    // 返回 图像路径？     余额信息
    let checkMsgSql = "select money,integrate,preferential_number,img,phone from user_msg,user where user.id = ? and user.id = user_msg.id";
    let checkMsgSqlArr = [];
    console.log('@userid', req.user.userId);
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
        console.log('@resData:', resData);
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
// 删除地址
router.post('/delItem', (req, res, next) => {
    let delSql = "delete from user_address where id = ? and recive_area = ? and recive_area_detail = ? and use_phone =? and recive_name = ?";
    let delSqlArr = [];
    let id = req.user.userId;
    let reqData = req.body;

    if (reqData.length >= 0) {
        delItem(reqData);
    }
    async function delItem(reqData) {
        let flag = true;
        for (let i = 0; i < reqData.length; i++) {
            delSqlArr = [id];
            for (const key in reqData[i]) {
                const element = reqData[i][key];
                delSqlArr.push(element);
            }
            if (delSqlArr.length > 1) {
                let re = await dbConfig.SySqlConnect(delSql, delSqlArr);
                if (re.affectedRows >= 1) {
                    //ok
                } else {
                    //影响为0 G！

                    flag = false;
                    break;
                }
            }
        }
        //  console.log("@flag",flag);
        if (flag) {
            res.send({
                status: 200,
                msg: '删除成功'
            });
            return;
        } else {
            res.send({
                status: 500,
                msg: '删除失败了'
            });
            return;
        }
    }
})
// 修改用户名
router.post('/chageUserName', (req, res, next) => {
    // 先查询 是否存在 要修改后的用户名 存在就不让改 避免同名
    let checkSql = "select * from user where user_name = ?";
    let checkSqlArr = [];
    let userName = req.body.userName;
    let id = req.user.userId;
    checkSqlArr.push(userName);
    let checkCallBack = function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        if (data.length === 0) {
            let updSql = "update user set user_name = ? where id = ?";
            let updArr = [];
            let updCallBack = function (err, data) {
                if (err) {
                    console.log(err);
                    return
                }
                if (data.affectedRows === 1) {
                    res.send({
                        status: 200,
                        msg: '修改用户名成功~'
                    });
                    return;
                } else
                    res.send({
                        status: 400,
                        msg: '未知错误'
                    });
                return;
            }
            updArr.push(userName);
            updArr.push(id);

            dbConfig.sqlConnect(updSql, updArr, updCallBack);
        } else {
            res.send({
                status: 500,
                msg: '已存在同用户名,修改失败'
            });
            return
        }
    };
    dbConfig.sqlConnect(checkSql, checkSqlArr, checkCallBack);
})
// 修改头像
router.post('/chageAvatar', (req, res, next) => {
    let dir = path.join(__dirname, '/public/images');
    let form = formidable({
        multiples: false,
        uploadDir: dir,
        keepExtensions: true,
        maxFieldsSize: (2 * 1024 * 1024),
        encoding: 'utf-8'
    });
    form.parse(req, function (err, fields, files) {
        let msg = '';
        let extname = path.extname(files.file.filepath);
        let newFileName = req.user.userId + extname;
        let newPath = dir + '\\' + newFileName;
        let oldPath = files.file.filepath;
        if (err) {
            console.log(err);
            msg = {
                err: 1,
                msg: '文件解析失败了。。'
            }
            return
        }
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.log(err);
                throw Error('文件变更名出错。。')
            }
            let updSql = "update user set img = ? where id = ?"
            let id = req.user.userId;
            let src = imgSrc + '/public/images' + '/' + newFileName;
            let callback = function (err, data) {
                if (err) {
                    console.log(err);
                    return
                }
                if (data.affectedRows === 1) {
                    msg = {
                        status: 200,
                        msg: 'success！',
                        src: src
                    }
                    res.send(msg);
                    return
                } else {
                    msg = {
                        status: 400,
                        msg: '失败。。。！'
                    }
                    res.send(msg);
                    return
                }
            }
            dbconfig.sqlConnect(updSql, [src, id], callback);
            return;

        })
    })

})
// 获取红包优惠信息
router.post('/RedPacket', (req, res, next) => {
    let id = req.user.userId;
    let checkSql = "select * from red_packet where user_id = ?";
    let checkSqlArr = [];
    let resData = {
        totalNum: 0,
        deadNum: 0,
        redPacketInfo: []
    }
    let checkCallBack = function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('@红包数据:', data);
        if (data.length !== 0) {
            // 存在数据时进行处理
            let newArr = [];

            data.forEach(item => {
                let beforeTime = item.dead_time;
                let nowTime = new Date();
                let dead_time = item.dead_time;
                let getTime = beforeTime - nowTime;
                item.dead_time = dealDate(dead_time);
                if (getTime > 0) {
                    let day = parseInt(getTime / (1000 * 3600 * 24));
                    if (day < 7) {
                        resData.deadNum++;
                    }
                    item.leav_time = day;
                } else {
                    item['leav_time'] = 0;
                    item.stale_dated = 1;
                }
                newArr.push(item);
            });
            resData.redPacketInfo = newArr;
            resData.totalNum = newArr.length;

            res.send(resData);
            return;
        } else {
            res.send([]);
            return;
        }
    }
    checkSqlArr.push(id);
    dbConfig.sqlConnect(checkSql, checkSqlArr, checkCallBack);
})
//下订单功能
router.post('/orderForm', (req, response, next) => {
    let userId = req.user.userId;
    let merchantId = req.body.shoppingCart.storeId;
    let cartData = req.body.shoppingCart.data;
    let address = req.body.address;
    let is_deal = req.body.is_deal;
    // console.log('@userId:', userId);
    // console.log('@merchantId:', merchantId);
    // console.log('@cartData:', cartData);
    // console.log('@address:', address);
    // console.log('@is_deal:', is_deal);
    /*要做的事情
      1.往order表 订单表 插入一条数据 日期 截止日期 订单总价格等需要自己计算
      2.往order_address 中插入收货地址等信息
      3.根据cartData 以及生成的订单id 往order_item里插入数据 当 is_meal 为 0时
        还需往 order_item_property 中分别插入本订单各个商品的属性于属性值

    */
    //生成订单id
    try {
        createOrderId().then(async data => {
            let order_id = data;
            let total_price = 0;
            // 计算商品总价格
            cartData.forEach(item => {
                total_price += item.counts * item.item.price;
            })
            //查询商品配送费
            let checkShippingFee = "select shipping_fee from merchant where id = ?"
            let shipping_fee = await dbConfig.SySqlConnect(checkShippingFee, [merchantId]);
            total_price += shipping_fee[0].shipping_fee;
            // 创建发期日期
            let create_date = Date.now();
            // 创建订单截止日期
            let dead_date = create_date + (15 * 60 * 1000);

            // console.log('@order_id:', order_id);
            // console.log(`@total_price:`, total_price);
            // console.log('@create_date:', create_date.toString());
            // 把数据插入order表中
            let inOrderSql = "insert into order_form(order_id,user_id,merchant_id,total_price,create_time,dead_time,is_deal,is_dead) values(?,?,?,?,?,?,?,?)";
            let inOrderArr = [order_id, userId, merchantId, total_price, create_date.toString(), dead_date.toString(), is_deal, 0];
            let res = await dbConfig.SySqlConnect(inOrderSql, inOrderArr);

            if (res.affectedRows >= 1) {
                console.log('订单插入成功')
                //订单插入成功后 再将 收货信息 插入收货表
                let insOrderAddress = "insert into order_address(order_id,order_ship_address,recive_area,recive_area_detail,use_phone,recive_name) values(?,?,?,?,?,?)";
                let insOrderAddressArr = [order_id, '暂无', address.recive_area, address.recive_area_detail, address.use_phone, address.recive_name];
                let addressRes = await dbConfig.SySqlConnect(insOrderAddress, insOrderAddressArr);
                if (addressRes.affectedRows >= 1) {
                    console.log('收货人地址插入成功');
                } else {
                    console.log('收货人地址插入失败')
                }
                //将商品 分别插入对应商品表中
                let insItem = "insert into order_item(order_id,item_order_id,item_id,is_meal,amounts,type) values(?,?,?,?,?,?)"
                let callback = function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    if (data.affectedRows >= 1) {
                        console.log('商品插入成功')
                    }
                }
                for (let i = 0; i < cartData.length; i++) {
                    let order_item_id = await nanoid();
                    let sqlArr = [order_id, order_item_id, cartData[i].item.id, cartData[i].item.is_meal, cartData[i].counts, cartData[i].item.type];
                    dbConfig.sqlConnect(insItem, sqlArr, callback);
                    if (cartData[i].item.is_meal === 0) {
                        //如果为规格商品 0
                        // console.log(cartData[i].item.classify_detail);
                        let type_name = cartData[i].item.classify_detail.type_name;
                        let type_keys = cartData[i].item.classify_detail.type_keys;
                        // 插入至 order_item_property
                        let inSql = "insert into order_item_property(order_id,item_order_id,order_item_property,order_item_property_name,order_item_property_value,type)" +
                            "values(?,?,?,?,?,?)"
                        for (let j = 0; j < type_keys.length; j++) {
                            let arr = [order_id, order_item_id, type_keys[j].type_key, type_keys[j].type_key_name, type_keys[j].type_key_value, type_name]

                            dbconfig.sqlConnect(inSql, arr, callback)
                        }
                    }
                }
            } else {
                console.log('订单失败')
                console.log(res);
            }
            response.send({
                code: 0,
                msg: 'ok'
            });
        });
    } catch (e) {
        console.log('出错:');
        console.log(e)
        response.send({
            code: 500,
            msg: '出错'
        });
    }


    async function createOrderId() {
        let id = await nanoid();

        return id;
    }

})
//获取订单列表功能
router.post('/getOrderList', (req, res, next) => {
    //1.通过 userId 查询 order_form表 ---->取得订单id 时间 商家id 价格等
    //2 在 1 的基础上查找出商家名称
    //3.通过 1 取得 order_id 查询order_address 取得订单地址
    //4.通过 1 取得 order_id 查询 order_item   取得订单商品
    //5.在 4 的基础上 查找订单商品（规格）的属性
    let user_id = req.user.userId;
    let resData = []; //该数据是响应的数据
    // 联合查询语句 同时满足  1 2要求
    let checkOrderSql = 'SELECT order_id,name,merchant_id,total_price,create_time,dead_time,is_deal,is_dead,img,shipping_fee FROM order_form,merchant where user_id = ? and merchant.id = order_form.merchant_id';

    checkData();
    async function checkData() {
        let orderForm = await dbConfig.SySqlConnect(checkOrderSql, [user_id]);

        if (orderForm.length !== 0) {
            for (let item of orderForm) {
                let resObj = {
                    ...item
                };
                //获取address
                let addressSql = "select * from order_address where order_id = ?";
                let address = await dbConfig.SySqlConnect(addressSql, [resObj.order_id]);
                resObj.address = address[0];

                //查询商品
                let checkShopItem = "select item_order_id,item_id,type,is_meal,amounts from order_item where order_id = ?";
                let itemDatas = await dbConfig.SySqlConnect(checkShopItem, [resObj.order_id]);
                resObj.itemDatas = [];
                // console.log('@itemDatas:',itemDatas);
                for (let item of itemDatas) {
                    let priceSql = "select price,name from commoditys where id = ?"
                    let single_prcie = await dbConfig.SySqlConnect(priceSql,[item.item_id]);
                    item.single_prcie = single_prcie[0].price;
                    item.name = single_prcie[0].name;

                    if (item.is_meal === 0) {
                        //为0说明为规格数据 需要找出其属性值
                        let propertySql = "select order_item_property,order_item_property_name,order_item_property_value,type from order_item_property where item_order_id = ?";
                        let propertyDatas = await dbConfig.SySqlConnect(propertySql, [item.item_order_id]);
                        item.classify_detail = [];
                        // console.log('@property:',propertyDatas);

                        for (let propertyObj of propertyDatas) {
                            item.classify_detail.push(propertyObj);
                        }
                        // console.log('@classify_detail:', item.classify_detail);
                    }
                    resObj.itemDatas.push(item);
                }
                resData.push(resObj);
            }
            res.send({
                code:0,
                msg:'ok~',
                data:resData
            });
        } else {
            res.send({
                code: 0,
                msg: '没有订单数据'
            });
        }
    }

})
//订单支付
router.post('/sureOrder',(req,res,next)=>{
    let order_id = req.body.order_id;
    let chageSql = "update order_form set is_deal = ? where order_id = ?"
    let callback=function(err,data){
        if (err) {
            console.log(err);
            res.send({
                code:500,
                msg:'订单失败。。'
            })
            return;
        }
        if (data.affectedRows >= 1) {
            console.log('订单支付成功~')
            res.send({
                code:0,
                msg:'订单支付成功'
            })
            return;
        }else{
            console.log('订单支付失败')
            res.send({
                code:0,
                msg:'订单支付成功'
            })
            return;
        }
    }
    
    dbconfig.sqlConnect(chageSql,[1,order_id],callback);
})
//订单超时
router.post('/orderDeadPay',(req,res,next)=>{
    let order_id = req.body.order_id;
    let chageSql = "update order_form set is_dead = ? where order_id = ?"
    let callback=function(err,data){
        if (err) {
            console.log(err);
            res.send({
                code:500,
                msg:'超时失败。。'
            })
            return;
        }
        if (data.affectedRows >= 1) {
            console.log('订单超时成功~')
            res.send({
                code:0,
                msg:'订单超时成功'
            })
            return;
        }else{
            console.log('订单超时失败')
            res.send({
                code:0,
                msg:'订单超时成功'
            })
            return;
        }
    }
    
    dbconfig.sqlConnect(chageSql,[1,order_id],callback);
})


// 处理时间 转换格式为 yyyy-mm-dd
function dealDate(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate() - 1;
    let string = `${year}-${month}-${day}`;
    return string;
};
export default router;