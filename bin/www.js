#!/usr/bin/env node

/**
 * 依赖模块加载
 */
var app = require('../app');
var debug = require('debug')('firstNodeApp:server');
var http = require('http');

/**
 * 定义启动端口
 */
var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
 * 创建http服务器实例
 */
var server = http.createServer(app);

/**
 * 在指定端口监听网络
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * 端口标准化
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * HTTP服务器Error异常事件监听处理
 */
function onError(error) {
  if (error.syscall !== 'listen'){
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * HTTP事件绑定处理函数
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
