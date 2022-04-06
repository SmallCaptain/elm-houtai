import express from "express";
import dbConfig from '../../utils/dbconfig.js';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import dbconfig from "../../utils/dbconfig.js";

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


// 处理时间 转换格式为 yyyy-mm-dd
function dealDate(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate() - 1;
    let string = `${year}-${month}-${day}`;
    return string;
};
export default router;