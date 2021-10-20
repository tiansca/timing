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
    status:{
        type:Boolean,
        default:true
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = mongoose.model('timing', memoSchema);
