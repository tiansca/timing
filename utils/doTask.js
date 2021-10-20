const request = require('request')
// const path = require('path')
const shell = require('shelljs')
var sd = require('silly-datetime');
const record = require('./record')
const doTask = function (task){
  let log = '\n=============================\n'
  if (task.type === 'url') {
    // record()
    log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  执行任务：${task.name}，类型：访问链接，链接：${task.url}\n`
    // 访问链接
    request({
      url: task.url,
      method: "GET"
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('成功', body) // 请求成功的处理逻辑
        log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  成功返回值：\n${body}`
        record(log)
      } else {
        // 失败
        console.log('失败', body)
        log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  访问失败：\n${error || body}`
        record(log)
      }
    });
  } else if(task.type === 'shell') {
    // record(`执行任务：${task.name}，类型：执行脚本，路径：${task.path}`)
    log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  执行任务：${task.name}，类型：执行脚本，路径：${task.path}\n`
    // 脚本任务
    shell.exec(task.path, function(code, stdout, stderr) {
      log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  Exit code：${code}\n`
      log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  Program output：${stdout || '无'}\n`
      log += `${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}  Program stderr：${stderr || '无'}`
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      record(log)
    });
  }
}
module.exports = doTask
