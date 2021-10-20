// var schedule = require('node-schedule')
var Timing = require('../model/timing');
// var addTask = require('./addTask')
var updateTask = require('./updateTask')
var mongoose = require('mongoose')
const initTask = function () {
  console.log('init')
  return new Promise((resolve, reject) => {
    Timing.find({},async function (err, data) {
      if (err) {
        reject('查找失败')
      } else {
        for (let a = 0; a < data.length; a++) {
          const newTask = {...data[a]._doc, id: mongoose.Types.ObjectId(data[a]._id).toString()}
          try {
            await updateTask(newTask)
          } catch (e) {
            reject(e)
          }
        }
        resolve()
      }
    })
  })
}
module.exports = initTask
