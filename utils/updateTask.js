// var schedule = require('node-schedule')
var Timing = require('../model/timing');
var deleteTask = require('./deleteTask')
var addTask = require('./addTask')
var mongoose = require('mongoose')
const updateTask = function (task) {
  console.log('update', task)
  return new Promise((resolve, reject) => {
    if (!task.id) return reject('缺少id')
    Timing.findOne({"_id":task.id},async function (err, data) {
      if (err) {
        return reject('查找任务失败')
      } else {
        // 删除task
        const newTask = {...data._doc, id: mongoose.Types.ObjectId(data._id).toString()}
        try {
          await deleteTask(newTask)
        } catch (e) {
          reject(e)
        }
        // 判断task状态，若为true,删除后重新添加
        try {
          if (newTask.status) {
            console.log(typeof(newTask.id))
            console.log(newTask)
            await addTask(newTask)
          }
        } catch (e) {
          reject(e)
        }
        resolve()
      }
    })
  })
}
module.exports = updateTask
