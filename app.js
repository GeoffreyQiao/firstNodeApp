var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//路由器加载
var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');

//实例化项目
var app = express();

// 定义Jade模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//定义日志级别
app.use(logger('dev'));

//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//定义cookie解析器
app.use(cookieParser());

//定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//把路径和定义好的路由匹配在一起
app.use('/', routes);
app.use('/users', users);
app.use('/products', products);

// 定义404错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// 开发环节下错误处理
// 反馈错误信息及错误内容
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环节下错误处理
// 并只给用户反馈错误信息,隐藏具体错误内容
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
