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

var _async = require("nanoid/async");

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
}); //下订单功能

router.post('/orderForm', function (req, response, next) {
  var userId = req.user.userId;
  var merchantId = req.body.shoppingCart.storeId;
  var cartData = req.body.shoppingCart.data;
  var address = req.body.address;
  var is_deal = req.body.is_deal; // console.log('@userId:', userId);
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
    createOrderId().then(function _callee(data) {
      var order_id, total_price, checkShippingFee, shipping_fee, create_date, dead_date, inOrderSql, inOrderArr, res, insOrderAddress, insOrderAddressArr, addressRes, insItem, callback, i, order_item_id, sqlArr, type_name, type_keys, inSql, j, arr;
      return regeneratorRuntime.async(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              order_id = data;
              total_price = 0; // 计算商品总价格

              cartData.forEach(function (item) {
                total_price += item.counts * item.item.price;
              }); //查询商品配送费

              checkShippingFee = "select shipping_fee from merchant where id = ?";
              _context2.next = 6;
              return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkShippingFee, [merchantId]));

            case 6:
              shipping_fee = _context2.sent;
              total_price += shipping_fee[0].shipping_fee; // 创建发期日期

              create_date = Date.now(); // 创建订单截止日期

              dead_date = create_date + 15 * 60 * 1000; // console.log('@order_id:', order_id);
              // console.log(`@total_price:`, total_price);
              // console.log('@create_date:', create_date.toString());
              // 把数据插入order表中

              inOrderSql = "insert into order_form(order_id,user_id,merchant_id,total_price,create_time,dead_time,is_deal,is_dead) values(?,?,?,?,?,?,?,?)";
              inOrderArr = [order_id, userId, merchantId, total_price, create_date.toString(), dead_date.toString(), is_deal, 0];
              _context2.next = 14;
              return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(inOrderSql, inOrderArr));

            case 14:
              res = _context2.sent;

              if (!(res.affectedRows >= 1)) {
                _context2.next = 38;
                break;
              }

              console.log('订单插入成功'); //订单插入成功后 再将 收货信息 插入收货表

              insOrderAddress = "insert into order_address(order_id,order_ship_address,recive_area,recive_area_detail,use_phone,recive_name) values(?,?,?,?,?,?)";
              insOrderAddressArr = [order_id, '暂无', address.recive_area, address.recive_area_detail, address.use_phone, address.recive_name];
              _context2.next = 21;
              return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(insOrderAddress, insOrderAddressArr));

            case 21:
              addressRes = _context2.sent;

              if (addressRes.affectedRows >= 1) {
                console.log('收货人地址插入成功');
              } else {
                console.log('收货人地址插入失败');
              } //将商品 分别插入对应商品表中


              insItem = "insert into order_item(order_id,item_order_id,item_id,is_meal,amounts,type) values(?,?,?,?,?,?)";

              callback = function callback(err, data) {
                if (err) {
                  console.log(err);
                }

                if (data.affectedRows >= 1) {
                  console.log('商品插入成功');
                }
              };

              i = 0;

            case 26:
              if (!(i < cartData.length)) {
                _context2.next = 36;
                break;
              }

              _context2.next = 29;
              return regeneratorRuntime.awrap((0, _async.nanoid)());

            case 29:
              order_item_id = _context2.sent;
              sqlArr = [order_id, order_item_id, cartData[i].item.id, cartData[i].item.is_meal, cartData[i].counts, cartData[i].item.type];

              _dbconfig["default"].sqlConnect(insItem, sqlArr, callback);

              if (cartData[i].item.is_meal === 0) {
                //如果为规格商品 0
                // console.log(cartData[i].item.classify_detail);
                type_name = cartData[i].item.classify_detail.type_name;
                type_keys = cartData[i].item.classify_detail.type_keys; // 插入至 order_item_property

                inSql = "insert into order_item_property(order_id,item_order_id,order_item_property,order_item_property_name,order_item_property_value,type)" + "values(?,?,?,?,?,?)";

                for (j = 0; j < type_keys.length; j++) {
                  arr = [order_id, order_item_id, type_keys[j].type_key, type_keys[j].type_key_name, type_keys[j].type_key_value, type_name];

                  _dbconfig["default"].sqlConnect(inSql, arr, callback);
                }
              }

            case 33:
              i++;
              _context2.next = 26;
              break;

            case 36:
              _context2.next = 40;
              break;

            case 38:
              console.log('订单失败');
              console.log(res);

            case 40:
              response.send({
                code: 0,
                msg: 'ok'
              });

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  } catch (e) {
    console.log('出错:');
    console.log(e);
    response.send({
      code: 500,
      msg: '出错'
    });
  }

  function createOrderId() {
    var id;
    return regeneratorRuntime.async(function createOrderId$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _async.nanoid)());

          case 2:
            id = _context3.sent;
            return _context3.abrupt("return", id);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
}); //获取订单列表功能

router.post('/getOrderList', function (req, res, next) {
  //1.通过 userId 查询 order_form表 ---->取得订单id 时间 商家id 价格等
  //2 在 1 的基础上查找出商家名称
  //3.通过 1 取得 order_id 查询order_address 取得订单地址
  //4.通过 1 取得 order_id 查询 order_item   取得订单商品
  //5.在 4 的基础上 查找订单商品（规格）的属性
  var user_id = req.user.userId;
  var resData = []; //该数据是响应的数据
  // 联合查询语句 同时满足  1 2要求

  var checkOrderSql = 'SELECT order_id,name,merchant_id,total_price,create_time,dead_time,is_deal,is_dead,img,shipping_fee FROM order_form,merchant where user_id = ? and merchant.id = order_form.merchant_id';
  checkData();

  function checkData() {
    var orderForm, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, resObj, addressSql, address, checkShopItem, itemDatas, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _item, priceSql, single_prcie, propertySql, propertyDatas, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, propertyObj;

    return regeneratorRuntime.async(function checkData$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkOrderSql, [user_id]));

          case 2:
            orderForm = _context4.sent;

            if (!(orderForm.length !== 0)) {
              _context4.next = 99;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 7;
            _iterator = orderForm[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context4.next = 82;
              break;
            }

            item = _step.value;
            resObj = _objectSpread({}, item); //获取address

            addressSql = "select * from order_address where order_id = ?";
            _context4.next = 15;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(addressSql, [resObj.order_id]));

          case 15:
            address = _context4.sent;
            resObj.address = address[0]; //查询商品

            checkShopItem = "select item_order_id,item_id,type,is_meal,amounts from order_item where order_id = ?";
            _context4.next = 20;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(checkShopItem, [resObj.order_id]));

          case 20:
            itemDatas = _context4.sent;
            resObj.itemDatas = []; // console.log('@itemDatas:',itemDatas);

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 25;
            _iterator2 = itemDatas[Symbol.iterator]();

          case 27:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context4.next = 64;
              break;
            }

            _item = _step2.value;
            priceSql = "select price,name from commoditys where id = ?";
            _context4.next = 32;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(priceSql, [_item.item_id]));

          case 32:
            single_prcie = _context4.sent;
            _item.single_prcie = single_prcie[0].price;
            _item.name = single_prcie[0].name;

            if (!(_item.is_meal === 0)) {
              _context4.next = 60;
              break;
            }

            //为0说明为规格数据 需要找出其属性值
            propertySql = "select order_item_property,order_item_property_name,order_item_property_value,type from order_item_property where item_order_id = ?";
            _context4.next = 39;
            return regeneratorRuntime.awrap(_dbconfig["default"].SySqlConnect(propertySql, [_item.item_order_id]));

          case 39:
            propertyDatas = _context4.sent;
            _item.classify_detail = []; // console.log('@property:',propertyDatas);

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 44;

            for (_iterator3 = propertyDatas[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              propertyObj = _step3.value;

              _item.classify_detail.push(propertyObj);
            } // console.log('@classify_detail:', item.classify_detail);


            _context4.next = 52;
            break;

          case 48:
            _context4.prev = 48;
            _context4.t0 = _context4["catch"](44);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t0;

          case 52:
            _context4.prev = 52;
            _context4.prev = 53;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 55:
            _context4.prev = 55;

            if (!_didIteratorError3) {
              _context4.next = 58;
              break;
            }

            throw _iteratorError3;

          case 58:
            return _context4.finish(55);

          case 59:
            return _context4.finish(52);

          case 60:
            resObj.itemDatas.push(_item);

          case 61:
            _iteratorNormalCompletion2 = true;
            _context4.next = 27;
            break;

          case 64:
            _context4.next = 70;
            break;

          case 66:
            _context4.prev = 66;
            _context4.t1 = _context4["catch"](25);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t1;

          case 70:
            _context4.prev = 70;
            _context4.prev = 71;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 73:
            _context4.prev = 73;

            if (!_didIteratorError2) {
              _context4.next = 76;
              break;
            }

            throw _iteratorError2;

          case 76:
            return _context4.finish(73);

          case 77:
            return _context4.finish(70);

          case 78:
            resData.push(resObj);

          case 79:
            _iteratorNormalCompletion = true;
            _context4.next = 9;
            break;

          case 82:
            _context4.next = 88;
            break;

          case 84:
            _context4.prev = 84;
            _context4.t2 = _context4["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context4.t2;

          case 88:
            _context4.prev = 88;
            _context4.prev = 89;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 91:
            _context4.prev = 91;

            if (!_didIteratorError) {
              _context4.next = 94;
              break;
            }

            throw _iteratorError;

          case 94:
            return _context4.finish(91);

          case 95:
            return _context4.finish(88);

          case 96:
            res.send({
              code: 0,
              msg: 'ok~',
              data: resData
            });
            _context4.next = 100;
            break;

          case 99:
            res.send({
              code: 0,
              msg: '没有订单数据'
            });

          case 100:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[7, 84, 88, 96], [25, 66, 70, 78], [44, 48, 52, 60], [53,, 55, 59], [71,, 73, 77], [89,, 91, 95]]);
  }
}); //订单支付

router.post('/sureOrder', function (req, res, next) {
  var order_id = req.body.order_id;
  var chageSql = "update order_form set is_deal = ? where order_id = ?";

  var callback = function callback(err, data) {
    if (err) {
      console.log(err);
      res.send({
        code: 500,
        msg: '订单失败。。'
      });
      return;
    }

    if (data.affectedRows >= 1) {
      console.log('订单支付成功~');
      res.send({
        code: 0,
        msg: '订单支付成功'
      });
      return;
    } else {
      console.log('订单支付失败');
      res.send({
        code: 0,
        msg: '订单支付成功'
      });
      return;
    }
  };

  _dbconfig["default"].sqlConnect(chageSql, [1, order_id], callback);
}); //订单超时

router.post('/orderDeadPay', function (req, res, next) {
  var order_id = req.body.order_id;
  var chageSql = "update order_form set is_dead = ? where order_id = ?";

  var callback = function callback(err, data) {
    if (err) {
      console.log(err);
      res.send({
        code: 500,
        msg: '超时失败。。'
      });
      return;
    }

    if (data.affectedRows >= 1) {
      console.log('订单超时成功~');
      res.send({
        code: 0,
        msg: '订单超时成功'
      });
      return;
    } else {
      console.log('订单超时失败');
      res.send({
        code: 0,
        msg: '订单超时成功'
      });
      return;
    }
  };

  _dbconfig["default"].sqlConnect(chageSql, [1, order_id], callback);
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