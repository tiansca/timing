var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memoSchema = new Schema({
    name:String,
    type:String, // url or shell
    url:String,
    path:String,
    cron: String,
    username:String,
    userid: String,
    offset: { // 延时执行，随机在偏移区间里执行
        type: Number,
        default: 0 // 分钟
    },
    status:{
        type:Boolean,
        default:true
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = mongoose.model('timing', memoSchema);
