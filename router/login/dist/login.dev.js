"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbconfig = _interopRequireDefault(require("../../utils/dbconfig.js"));

var _jsonwebToken = _interopRequireDefault(require("jsonwebToken"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _async = require("nanoid/async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dirname = 'http://localhost:5115'; // const __dirname = 'http://124.222.90.62:5115';

var router = _express["default"].Router(); // 登录账号


router.post('/loginUser', function (req, res, next) {
  var sql = "select * from user where user_name = ?";
  var sqlArr = [];
  var reqData = req.body;
  var secretKey = 'mnnu';
  sqlArr.push(reqData.username);
  console.log('@user', req.user);

  var callBack = function callBack(err, data) {
    if (err) {
      console.log('链接出错');
      console.log(err);
    } else {
      console.log('链接未出错'); // 判断 是否存在该用户名的账号

      if (data.length !== 0) {
        var msg = {
          status: true,
          msg: '密码正确',
          token: null
        }; // 说明查找到了
        // 比对密码是否正确

        if (reqData.password === data[0].user_password) {
          // 参数1 用户的信息对象
          // 参数2 加密的密钥
          // 参数3 配置对象，可以配合当前token有效期
          var token = _jsonwebToken["default"].sign({
            username: data[0].user_name,
            userId: data[0].id
          }, secretKey, {
            expiresIn: '10h'
          });

          msg.token = token;
          res.send(msg);
          return;
        } else if (reqData.password !== data[0].user_password) {
          msg.msg = '密码错误';
          msg.status = false;
          res.send(msg);
          return;
        } else {
          msg.msg = '该账号已被封禁';
          msg.status = false;
          res.send(msg);
          return;
        }
      } else {
        var createId = function createId() {
          return regeneratorRuntime.async(function createId$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap((0, _async.nanoid)());

                case 2:
                  id = _context.sent;
                  return _context.abrupt("return", id);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          });
        };

        // 否则表示没该用户 对其进行注册 id 用户名 密码 状态
        var isql = "insert into user(id,user_name,user_password,status,img,phone) values(?,?,?,?,?,?)";
        var isqlArr = [];
        var id = null;
        var status = 1;
        var img = _dirname + '/public/images/defalut_avatar.jpg';
        console.log(img);

        var iscallBack = function iscallBack(err, data) {
          if (err) {
            console.log('插入语句链接出错啦');
            return;
          }

          if (data.affectedRows === 1) {
            console.log("data.username", reqData.username);
            console.log("id", id); // 注册成功！
            // 往 user_msg表中初始化数据

            var iMsgSql = "insert into user_msg(id,money,integrate,preferential_number,area,areaId) values(?,?,?,?,?,?)";
            var iMsgArr = [id, 0, 0, 0, '未定位', 0];

            var iMsgArrCallback = function iMsgArrCallback(err, data) {
              if (err) {
                console.log('插入语句链接出错啦', err);
                return;
              }

              console.log('初始化user_msg成功');
            };

            _dbconfig["default"].sqlConnect(iMsgSql, iMsgArr, iMsgArrCallback);

            res.send({
              status: true,
              msg: '注册成功！！',
              token: _jsonwebToken["default"].sign({
                username: reqData.username,
                userId: id
              }, secretKey, {
                expiresIn: '10h'
              })
            });
            return;
          }
        };

        createId().then(function (id) {
          isqlArr.push(id);
          isqlArr.push(reqData.username);
          isqlArr.push(reqData.password);
          isqlArr.push(status);
          isqlArr.push(img);
          isqlArr.push('无');

          _dbconfig["default"].sqlConnect(isql, isqlArr, iscallBack);
        });
      }
    }
  };

  _dbconfig["default"].sqlConnect(sql, sqlArr, callBack);
}); // 获取所有 城市信息

router.post('/getCitys', function (req, res, next) {
  var checkSql = "select * from citys where abbr like ?";
  var checkSqlArr = ['A%', 'B%', 'C%', 'D%', 'E%', 'F%', 'G%', 'H%', 'J%', 'K%', 'L%', 'M%', 'N%', 'P%', 'Q%', 'R%', 'S%', 'T%', 'W%', 'X%', 'Y%', 'Z%'];
  var resData = {};
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  console.log(ip);
  getCitys(checkSql, checkSqlArr).then(function (data) {
    resData = data;

    if (JSON.stringify(resData) !== '{}') {
      res.send(resData);
      return;
    } else {
      res.send({
        msg: '失败',
        err: '未知错误'
      });
      return;
    }
  });
}); // 获取用户IP地址 然后进行定位

router.post('/getIp', function (req, res, next) {
  var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  var data = getAddress(); // data.then(datas =>{
  //     console.log('进入响应');
  //     res.send(datas);
  //     return
  // })

  function getAddress() {
    var response, datas, obj;
    return regeneratorRuntime.async(function getAddress$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap((0, _nodeFetch["default"])("https://api.map.baidu.com/location/ip?ak=AuNgnw8TBDiyjBMYroGHphbef4PaTSMw&ip=".concat(ip, "&coor=bd09ll")));

          case 2:
            response = _context2.sent;
            datas = response.json();
            obj = {};
            datas.then(function (data) {
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
                obj.msg = '运行时错误';
                console.log(e);
                res.send(obj);
              }
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  ;
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
}); //获取数据库中所有城市的数据

function getCitys(checkSql, checkSqlArr) {
  var obj, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iterator, abbr;

  return regeneratorRuntime.async(function getCitys$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          obj = {};
          data = null;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 5;
          _iterator = checkSqlArr[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 17;
            break;
          }

          iterator = _step.value;
          abbr = iterator.split('%')[0];
          _context3.next = 12;
          return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkSql, iterator));

        case 12:
          data = _context3.sent;
          obj[abbr] = data;

        case 14:
          _iteratorNormalCompletion = true;
          _context3.next = 7;
          break;

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 23:
          _context3.prev = 23;
          _context3.prev = 24;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 26:
          _context3.prev = 26;

          if (!_didIteratorError) {
            _context3.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context3.finish(26);

        case 30:
          return _context3.finish(23);

        case 31:
          return _context3.abrupt("return", obj);

        case 32:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 19, 23, 31], [24,, 26, 30]]);
} //#region

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


var _default = router;
exports["default"] = _default;