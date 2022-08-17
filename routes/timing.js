/**
 * Created by administrator on 2019/11/4.
 */
var express = require('express');
var router = express.Router();
var Timing = require('../model/timing');
var getRecord = require('../utils/getRecord')
var addTask = require('../utils/addTask')
var updateTask = require('../utils/updateTask')
var deleteTask = require('../utils/deleteTask')
var doTask = require('../utils/doTask')
// var bodyParser = require('body-parser')
// const db = require('../config/db')
// var await = require('await');

/* GET users listing. */
router.post('/add',function(req, res, next) {
    var postData = {
        name: req.body.name,
        type: req.body.type || 'url',
        url: req.body.url,
        path: req.body.path,
        cron:req.body.cron,
        username:req.body.username,
        userid:req.body.userid,
        offset: req.body.offset || 0
    }
    Timing.create(postData,async function (err, data) {
        if (err) throw err;
        console.log('新增', data);
        // res.redirect('/userL')
        const aTask = {...data._doc, id: data._id.valueOf()}
        try {
            await addTask(aTask)
            res.send({data: 0, msg: '新增成功'})
        } catch (e) {
            res.send({data: 1, msg: '新增成功,创建任务失败'})
        }

    })
});
router.get('/get',function(req, res, next) {
    Timing.find({},function (err, data) {
        if(err){
            res.send({data:1,msg:'查询失败'})
        }else {
            res.send({code:0,data:data})
        }
    })
});

router.get('/remove',function(req, res, next) {
    if(req.query && req.query.id){
        Timing.findByIdAndRemove(req.query.id,function (err, data) {
            if(err){
                res.send({data:1,msg:'删除失败'})
            }else {
                try {
                    const aTask = {id: req.query.id}
                    deleteTask(aTask)
                } catch (e) {
                    console.log(e)
                }
                res.send({code:0,data:"删除成功"})
            }
        })
    }else {
        res.send({code:-1,msg:"缺少参数"})
    }
});

router.get('/updatestatus',function(req, res, next) {
    if(req.query && req.query.id){
        Timing.findOne({"_id":req.query.id},function (err, data) {
            if(err){
                res.send({code:1,msg:'切换失败'})
            }else {
                var memoStatus = !data.status
                Timing.updateOne({"_id":req.query.id},{"status":memoStatus},function (err, row) {
                    if(err){
                        res.send({code:2,msg:'切换失败'})
                    }else {
                        updateTask({id: req.query.id})
                        res.send({code:0,msg:'切换成功'})
                    }
                })
            }
        })
    }else {
        res.send({code:-1,msg:"缺少参数"})
    }
});

router.post('/update',function(req, res, next) {
        var postData = {
            name: req.body.name,
            type: req.body.type || 'url',
            url: req.body.url,
            path: req.body.path,
            cron:req.body.cron,
            username:req.body.username,
            userid:req.body.userid,
            status: req.body.status,
            _id:req.body._id,
            offset: req.body.offset
        };
        // console.log('****', postData)
        Timing.findOne({"_id":postData._id},function (err, data) {
            if(err){
                res.send({code:1,msg:'编辑失败'})
            }else {
                Timing.updateOne({"_id":postData._id}, postData,function (err, row) {
                    if(err){
                        res.send({code:3,msg:'编辑失败'})
                    }else {
                        updateTask({...postData, id: postData._id})
                        res.send({code:0,msg:'编辑成功'})
                    }
                })
            }
        })
});
router.get('/record',async function (req, res, next) {
    try {
        const data = await getRecord()
        res.send({code:0,data:data})
    } catch (e) {
        res.send({code:-1,msg:e})
    }
});
router.get('/doTask',function(req, res, next) {
    if(req.query && req.query.id){
        Timing.findOne({"_id":req.query.id},function (err, data) {
            if(err){
                res.send({code:1,msg:'查找失败'})
            }else {
                doTask({...data._doc, id: data._id.valueOf()})
                res.send({code: 0, msg: '执行成功'})
            }
        })
    }else {
        res.send({code:-1,msg:"缺少参数"})
    }
});

module.exports = router;
