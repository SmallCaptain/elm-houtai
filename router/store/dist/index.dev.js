"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbconfig = _interopRequireDefault(require("../../utils/dbconfig.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // 获取商店店铺


router.post('/getStore', function (req, res, next) {
  var checkSql = "select * from merchant";

  var callBack = function callBack(err, data) {
    var resData = {
      status: 200,
      msg: '获取数据成功'
    };

    if (err) {
      console.log(err);
      return;
    }

    if (data.length !== 0) {
      resData.data = data;
      res.send(resData);
    } else {
      resData.msg = "未知出错！！！！！";
      res.send(resData);
    }
  };

  _dbconfig["default"].sqlConnect(checkSql, [], callBack);
}); // 获取商店物品

router.post('/getStoreItems', function (req, res, next) {
  // 第一次查询 获取商品type字段 后续根据type字段去查询出数据
  var typeSql = "select type from commoditys where merchant_id = ? group by type ";
  var id = req.body.id; // console.log('@id:',id);

  var typeCallBack = function typeCallBack(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    if (data.length !== 0) {
      getItems(data).then(function (data) {
        var resData = data;

        if (resData.length !== 0) {
          res.send(resData);
        } else res.send({
          status: 200,
          msg: '没有数据哦',
          data: []
        });
      });
    } else res.send({
      status: 200,
      msg: '没有数据哦',
      data: []
    });
  };

  _dbconfig["default"].sqlConnect(typeSql, [id], typeCallBack);

  function getItems(typeArray) {
    var dataArray, selSql, classifySql, i, data, j, classifyObj, typeObj, checkKeySql, typeKey, checkValueSql, c, values, obj;
    return regeneratorRuntime.async(function getItems$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataArray = [];
            selSql = "select * from commoditys where type = ? && merchant_id = ?";
            classifySql = "select * from commoditys_classify where type_id = ?";
            i = 0;

          case 4:
            if (!(i < typeArray.length)) {
              _context.next = 43;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(selSql, [typeArray[i].type, id]));

          case 7:
            data = _context.sent;
            j = 0;

          case 9:
            if (!(j < data.length)) {
              _context.next = 39;
              break;
            }

            if (!(data[j].classify_id !== '0')) {
              _context.next = 36;
              break;
            }

            classifyObj = {}; //查出分类 type_name

            _context.next = 14;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(classifySql, [data[j].classify_id]));

          case 14:
            typeObj = _context.sent;
            checkKeySql = "select * from commoditys_key where type_id = ?";
            classifyObj.type_name = typeObj[0].type_name;
            classifyObj.type_keys = []; //根据分类 查出属性 key

            _context.next = 20;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkKeySql, [typeObj[0].type_id]));

          case 20:
            typeKey = _context.sent;
            checkValueSql = "select type_key_value from commoditys_key_choice where type_key = ? and type_id = ?";
            c = 0;

          case 23:
            if (!(c < typeKey.length)) {
              _context.next = 35;
              break;
            }

            _context.next = 26;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkValueSql, [typeKey[c].type_key, typeKey[c].type_id]));

          case 26:
            values = _context.sent;
            obj = {};
            obj.type_key = typeKey[c].type_key;
            obj.type_key_name = typeKey[c].type_key_name;
            obj.type_key_values = values;
            classifyObj.type_keys.push(obj);

          case 32:
            c++;
            _context.next = 23;
            break;

          case 35:
            data[j].classify_detail = classifyObj;

          case 36:
            j++;
            _context.next = 9;
            break;

          case 39:
            dataArray.push(data);

          case 40:
            i++;
            _context.next = 4;
            break;

          case 43:
            return _context.abrupt("return", dataArray);

          case 44:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}); // 模糊查询商店店铺

router.post('/searchStore', function (req, res, next) {
  var keyword = "%".concat(req.body.keyword, "%");
  var checksql = "select * from merchant where name like ?";

  var callBack = function callBack(err, data) {
    if (err) {
      console.log(err);
      res.send('null');
      return;
    }

    res.send(data);
    return;
  };

  _dbconfig["default"].sqlConnect(checksql, [keyword], callBack);
}); // 查询分类列表数据

router.post('/getClassify', function (req, res, next) {
  //从 type_class表中 取得相关tag数据
  checkTypeClass();

  function checkTypeClass() {
    var tagData, sql, resData, tagPromise;
    return regeneratorRuntime.async(function checkTypeClass$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sql = "select * from type_class";
            _context3.next = 3;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(sql, []));

          case 3:
            tagData = _context3.sent;

            if (!(tagData instanceof Array)) {
              _context3.next = 12;
              break;
            }

            //数组 说明没出错 tag数据 从商家中 搜索出对应数据
            resData = [];
            _context3.next = 8;
            return regeneratorRuntime.awrap(new Promise(function _callee(resolve, reject) {
              var i, checkMerchant, sqlArr, item, data;
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      i = 0;

                    case 1:
                      if (!(i < tagData.length)) {
                        _context2.next = 12;
                        break;
                      }

                      checkMerchant = "select type_name as name,count(*) as amount,type from merchant where type_class = ? group by type_name";
                      sqlArr = [tagData[i].name];
                      item = {};
                      _context2.next = 7;
                      return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkMerchant, sqlArr));

                    case 7:
                      data = _context2.sent;

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

                    case 9:
                      i++;
                      _context2.next = 1;
                      break;

                    case 12:
                      resolve(resData);

                    case 13:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }));

          case 8:
            tagPromise = _context3.sent;
            res.send(tagPromise);
            _context3.next = 15;
            break;

          case 12:
            //出错了
            console.log(tagData);
            res.send({
              status: 500,
              msg: '出错'
            });
            return _context3.abrupt("return");

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
}); //根据分类列表查询商家

router.post('/getMerchantByClassify', function (req, res, next) {
  //req 请求参数为 type
  var type = req.body.type;
  var sql = "select * from merchant where type = ?";

  var callback = function callback(err, data) {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        msg: '请求出错！'
      });
      return;
    }

    if (data.length !== 0) {
      res.send({
        status: 200,
        data: data
      });
    } else {
      res.send({
        status: 500,
        msg: 'NOT_DATA'
      });
    }
  };

  _dbconfig["default"].sqlConnect(sql, [type], callback);
}); //排序查询商家

router.post('/searchMerchantBySort', function (req, res, next) {
  //type是排序种类 详情看excel表
  var type = req.body.type; //classify 表示种类 比如 简餐 烧烤 小吃 奶茶

  var classify = req.body.classify;
  console.log('@classify', classify);
  var sql = '';

  var callback = function callback(err, data) {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        msg: '查询出错'
      });
      return;
    }

    if (data.length !== 0) {
      res.send({
        status: 200,
        data: data
      });
    } else {
      res.send({
        status: 500,
        msg: '空数据。。'
      });
    }

    return;
  };

  if (type === 'autoSort') {
    //智能排序。。。 呃。。？ 全部搜索吧
    sql = classify !== '' ? 'select * from merchant where type = ?' : 'select * from merchant';
  } else if (type === 'shortDistance') {
    //距离最近 即公里数最小 升序
    sql = classify !== '' ? 'select * from merchant where type= ? order by instance asc' : 'select * from merchant order by instance asc';
  } else if (type === 'topSelling') {
    //销量最高
    sql = classify !== '' ? 'select * from merchant where type= ? order by sales desc' : 'select * from merchant order by sales desc';
  } else if (type === 'lowestStartPrice') {
    //起送价最低
    sql = classify !== '' ? 'select * from merchant where type= ? order by de_conditions asc' : 'select * from merchant order by de_conditions asc';
  } else if (type === 'fastDelivery') {
    //配送速度最快 配送时间越小 越有可能，，
    sql = classify !== '' ? 'select * from merchant where type= ? order by shipping_time asc' : 'select * from merchant order by shipping_time asc';
  } else if (type === 'highestScore') {
    //评分最高
    sql = classify !== '' ? 'select * from merchant where type= ? order by star desc' : 'select * from merchant  order by star desc';
  }

  if (classify !== '') {
    _dbconfig["default"].sqlConnect(sql, [classify], callback);
  } else {
    _dbconfig["default"].sqlConnect(sql, [], callback);
  }
}); //获取特定商家信息

router.post('/getMerchantById', function (req, res, next) {
  var merchant_id = req.body.storeId;
  var sql = "select * from merchant where id = ?";

  var callback = function callback(err, data) {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        msg: '出错',
        data: []
      });
      return;
    }

    if (data.length !== 0) {
      res.send({
        status: 200,
        data: data,
        msg: '查询成功'
      });
      return;
    } else {
      res.send({
        status: 500,
        msg: '没有数据',
        data: []
      });
    }
  };

  _dbconfig["default"].sqlConnect(sql, [merchant_id], callback);
});
var _default = router;
exports["default"] = _default;