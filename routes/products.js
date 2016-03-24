var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var ProductModel = require('../models/products');

var addProduct = function(product, callback){
    var data = new ProductModel(product);
    data.save(function(err){
        if(err){
            throw err;
        }
        console.log("新增商品成功!");
        callback && callback();
    })
};

/**
 * @description 获取商品列表,并根据参数设定返回全部结果或按页返回结果
 * @param pageOptions [type:object]
 * @param callback
 */
var getProducts;
getProducts = function(pageOptions, callback){

  /**
   * @description 获取所有商品的数量,并执行callback
   */
  ProductModel.count({}, function(err, num){
    var totalPage = 0;

    /**
     * @description 如果商品数量小于设定的页面显示商品数量,则获取所有商品并执行callback;否则,按照pageOptions中的参数进行查询,并执行callback
     */
    if(num < pageOptions.pageSize){
      ProductModel.find({}, function(err, product){
        if(err){
          console.log(err);
          throw err;
        }
        callback && callback(product, totalPage);
      });
    }else{
      totalPage = Math.ceil(num / pageOptions.pageSize);
      ProductModel
        .find()
        .skip(pageOptions.pageSize * ( pageOptions.pageNo - 1))
        .limit(pageOptions.pageSize)
        .sort({"_id" : -1})
        .exec(function(err, product){
          if(err){
            console.log(err);
            throw err;
          }
          callback && callback(product, totalPage);
        });
    }
  });
};

/**
 * @description PageOptions页面设置
 */
var PageOptions = (function(){
  /**
   * @description
   * @param pageSize
   * @param pageNo
   * @constructor
   */
  function PageOption(pageSize, pageNo){
    if(pageSize){
      this.pageSize = pageSize;
    }else{
      this.pageSize = 30;
    }

    if(pageNo){
      this.pageNo = pageNo;
    }else{
      this.pageNo = 1;
    }

    this.startItem = 0;

    /**
     * @description PageOption类的construct构造函数
     * @private
     */
    this._getStartItems = function(){

      this.startItem = this.pageSize * (this.pageNo - 1);
    };
    this._getStartItems();
  }
  return PageOption;
})();

/**
 * @description 定义路径"APP:/products"下带page查询参数和未带查询参数两个不同情况下,分别的页面渲染
 */
router.get('/', function(req, res, next) {
  var pageNo = req.query['page'];
  if(pageNo){
    var pageOptions = new PageOptions(7, pageNo);

    getProducts(pageOptions, function(product, totalPage){
      res.render({
        title: "Geo 商品管理",
        products : product,
        currentPage : pageNo,
        totalPage : totalPage
      }, "products");
    });
  }else{
    res.render('productsView');
  }
});

/**
 * @description 定义GET方法获取新增商品编辑页面
 */
router.get('/add', function(req, res, next) {
    res.render('editProduct');
});

router.post('/addProduct', function(req, res, next) {
  addProduct(req.body, function(){
        res.json({
            redirect: "http://127.0.0.1/products?page=1",
            status: "success"
        })
    });
});
module.exports = router;
