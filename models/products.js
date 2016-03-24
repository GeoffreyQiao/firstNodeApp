var mongoose = require('mongoose');

var dbCon    = require('../configs/dbCon');
/**
 * @description 建立数据库连接
 */
var db = mongoose.createConnection(dbCon.hostName, dbCon.dbName);
db.on('error', function(err){
  console.log(err);
});

/**
 * @interface {productsSchema}
 */
var productsSchema = new mongoose.Schema({
    P_barcode: String,
    P_brand: String,
    P_name: String,
    P_py: String,
    P_mainUnit: String,
    P_unitChange: Number,
    P_helpUnit: String,
    P_price: Number,
    P_helpBarcode: String,
    P_helpPrice: Number,
    P_price_main: Number,
    P_price_help: Number,
    P_haveYet: Number,
    P_addDate: {
        type: Date,
        default: Date.now()
    }
});

/**
 * @description 创建数据模型
 */
module.exports = db.model('Product', productsSchema);
