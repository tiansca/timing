var schedule = require('node-schedule')
var Timing = require('../model/timing');
var doTask = require('./doTask')
const addTask = function (task) {
  console.log('addTask', task)
  return new Promise((resolve, reject) => {
    if (!task.id) return reject('缺少id')
    if (!task.status) return reject('不可用')
    Timing.findOne({"_id":task.id},function (err, data) {
      if(err){
        return reject('查找任务失败')
      }else {
        // 检查task是否存在
        const idArr = global.taskArr.map(item => {
          if (typeof(item.id) === 'object') {
            let id = JSON.stringify(item.id)
            id = id.replace(/"/g, '')
            return id
          }
          return item.id
        })
        if (idArr.includes(task.id)) {
          return reject('任务已经存在')
        }
        // 添加任务
        console.log(task.id)
        console.log(task.cron)
        const scheduleObj = schedule.scheduleJob(`${task.cron}`, function () {
          console.log('定时任务', task);
          if (task.offset && Number(task.offset) > 0) {
            const delay = Math.random() * task.offset * 60 * 1000
            setTimeout(() => {
              doTask(task)
            }, delay)
          } else {
            doTask(task)
          }
        });
        global.taskArr.push({
          id: task.id,
          scheduleObj: scheduleObj
        })
        resolve()
      }
    })
  })
}
module.exports = addTask
