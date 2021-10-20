var schedule = require('node-schedule')
var Timing = require('../model/timing');
const deleteTask = function (task) {
  console.log('delete', task)
  return new Promise((resolve, reject) => {
    if (!task.id) return reject('缺少id')
      // 检查task是否存在
      // 删除任务
      for (let i = global.taskArr.length - 1; i >= 0; i--) {
        let aGlobalId = global.taskArr[i].id || ''
        if (typeof(aGlobalId) === 'object') {
          aGlobalId = JSON.stringify(global.taskArr[i].id) || ''
          aGlobalId = aGlobalId.replace(/"/g, '')
        }
        if (!aGlobalId) {
          continue
        }
        console.log(typeof(aGlobalId))
        console.log(typeof(task.id))
        if (aGlobalId === task.id) {
          console.log('取消')
          schedule.cancelJob(global.taskArr[i].scheduleObj)
          global.taskArr.splice(i, 1);
        }
      }
      resolve()
  })
}
module.exports = deleteTask
