"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbconfig = _interopRequireDefault(require("../../utils/dbconfig.js"));

var _formidable = _interopRequireDefault(require("formidable"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _dirname = _path["default"].resolve();

var imgSrc = 'http://localhost:5115'; // const imgSrc = 'http://124.222.90.62:5115';

var router = _express["default"].Router(); // 获取用户信息


router.post('/getUserMsg', function (req, res, next) {
  // 返回 图像路径？     余额信息
  var checkMsgSql = "select money,integrate,preferential_number,img,phone from user_msg,user where user.id = ? and user.id = user_msg.id";
  var checkMsgSqlArr = [];
  console.log('@userid', req.user.userId);
  checkMsgSqlArr.push(req.user.userId);

  var checkMsgSQLCallback = function checkMsgSQLCallback(err, data) {
    if (err) {
      console.log('出错', err);
      return err;
    }

    var resData = {
      user: _objectSpread({}, data[0])
    };
    console.log('@resData:', resData);
    res.send(resData);
    return;
  };

  _dbconfig["default"].sqlConnect(checkMsgSql, checkMsgSqlArr, checkMsgSQLCallback);
}); // 查看地址

router.post('/getAddress', function (req, res, next) {
  var checkSql = "select recive_area,recive_area_detail,use_phone,recive_name from user_address where id = ?";
  var checkSqlArr = [];

  var callBack = function callBack(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    res.send(data);
    return;
  };

  var id = req.user.userId;
  checkSqlArr.push(id);

  _dbconfig["default"].sqlConnect(checkSql, checkSqlArr, callBack);
}); // 插入新收货地址数据

router.post('/addAddress', function (req, res, next) {
  var isSql = "insert into user_address(id,recive_name,recive_area,recive_area_detail,use_phone) values(?,?,?,?,?)";
  var isSqlArr = [];
  var userId = req.user.userId;
  var reqData = req.body;
  console.log(reqData);
  isSqlArr.push(userId);

  for (var key in reqData) {
    if (Object.hasOwnProperty.call(reqData, key)) {
      var element = reqData[key];
      isSqlArr.push(element);
    }
  }

  var callBack = function callBack(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    if (data.affectedRows === 1) {
      res.send({
        status: 200,
        msg: '数据插入成功啦'
      });
      return;
    } else {
      res.send({
        status: 500,
        msg: '数据插入失败。。。'
      });
      return;
    }
  };

  _dbconfig["default"].sqlConnect(isSql, isSqlArr, callBack);
}); // 删除地址

router.post('/delItem', function (req, res, next) {
  var delSql = "delete from user_address where id = ? and recive_area = ? and recive_area_detail = ? and use_phone =? and recive_name = ?";
  var delSqlArr = [];
  var id = req.user.userId;
  var reqData = req.body;

  if (reqData.length >= 0) {
    delItem(reqData);
  }

  function delItem(reqData) {
    var flag, i, key, element, re;
    return regeneratorRuntime.async(function delItem$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            flag = true;
            i = 0;

          case 2:
            if (!(i < reqData.length)) {
              _context.next = 17;
              break;
            }

            delSqlArr = [id];

            for (key in reqData[i]) {
              element = reqData[i][key];
              delSqlArr.push(element);
            }

            if (!(delSqlArr.length > 1)) {
              _context.next = 14;
              break;
            }

            _context.next = 8;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(delSql, delSqlArr));

          case 8:
            re = _context.sent;

            if (!(re.affectedRows >= 1)) {
              _context.next = 12;
              break;
            }

            _context.next = 14;
            break;

          case 12:
            //影响为0 G！
            flag = false;
            return _context.abrupt("break", 17);

          case 14:
            i++;
            _context.next = 2;
            break;

          case 17:
            if (!flag) {
              _context.next = 22;
              break;
            }

            res.send({
              status: 200,
              msg: '删除成功'
            });
            return _context.abrupt("return");

          case 22:
            res.send({
              status: 500,
              msg: '删除失败了'
            });
            return _context.abrupt("return");

          case 24:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}); // 修改用户名

router.post('/chageUserName', function (req, res, next) {
  // 先查询 是否存在 要修改后的用户名 存在就不让改 避免同名
  var checkSql = "select * from user where user_name = ?";
  var checkSqlArr = [];
  var userName = req.body.userName;
  var id = req.user.userId;
  checkSqlArr.push(userName);

  var checkCallBack = function checkCallBack(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    if (data.length === 0) {
      var updSql = "update user set user_name = ? where id = ?";
      var updArr = [];

      var updCallBack = function updCallBack(err, data) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.affectedRows === 1) {
          res.send({
            status: 200,
            msg: '修改用户名成功~'
          });
          return;
        } else res.send({
          status: 400,
          msg: '未知错误'
        });

        return;
      };

      updArr.push(userName);
      updArr.push(id);

      _dbconfig["default"].sqlConnect(updSql, updArr, updCallBack);
    } else {
      res.send({
        status: 500,
        msg: '已存在同用户名,修改失败'
      });
      return;
    }
  };

  _dbconfig["default"].sqlConnect(checkSql, checkSqlArr, checkCallBack);
}); // 修改头像

router.post('/chageAvatar', function (req, res, next) {
  var dir = _path["default"].join(_dirname, '/public/images');

  var form = (0, _formidable["default"])({
    multiples: false,
    uploadDir: dir,
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    encoding: 'utf-8'
  });
  form.parse(req, function (err, fields, files) {
    var msg = '';

    var extname = _path["default"].extname(files.file.filepath);

    var newFileName = req.user.userId + extname;
    var newPath = dir + '\\' + newFileName;
    var oldPath = files.file.filepath;

    if (err) {
      console.log(err);
      msg = {
        err: 1,
        msg: '文件解析失败了。。'
      };
      return;
    }

    _fs["default"].rename(oldPath, newPath, function (err) {
      if (err) {
        console.log(err);
        throw Error('文件变更名出错。。');
      }

      var updSql = "update user set img = ? where id = ?";
      var id = req.user.userId;
      var src = imgSrc + '/public/images' + '/' + newFileName;

      var callback = function callback(err, data) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.affectedRows === 1) {
          msg = {
            status: 200,
            msg: 'success！',
            src: src
          };
          res.send(msg);
          return;
        } else {
          msg = {
            status: 400,
            msg: '失败。。。！'
          };
          res.send(msg);
          return;
        }
      };

      _dbconfig["default"].sqlConnect(updSql, [src, id], callback);

      return;
    });
  });
}); // 获取红包优惠信息

router.post('/RedPacket', function (req, res, next) {
  var id = req.user.userId;
  var checkSql = "select * from red_packet where user_id = ?";
  var checkSqlArr = [];
  var resData = {
    totalNum: 0,
    deadNum: 0,
    redPacketInfo: []
  };

  var checkCallBack = function checkCallBack(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('@红包数据:', data);

    if (data.length !== 0) {
      // 存在数据时进行处理
      var newArr = [];
      data.forEach(function (item) {
        var beforeTime = item.dead_time;
        var nowTime = new Date();
        var dead_time = item.dead_time;
        var getTime = beforeTime - nowTime;
        item.dead_time = dealDate(dead_time);

        if (getTime > 0) {
          var day = parseInt(getTime / (1000 * 3600 * 24));

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
  };

  checkSqlArr.push(id);

  _dbconfig["default"].sqlConnect(checkSql, checkSqlArr, checkCallBack);
}); // 处理时间 转换格式为 yyyy-mm-dd

function dealDate(time) {
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate() - 1;
  var string = "".concat(year, "-").concat(month, "-").concat(day);
  return string;
}

;
var _default = router;
exports["default"] = _default;