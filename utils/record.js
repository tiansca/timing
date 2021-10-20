const fs = require('fs')
const path = require('path')
let file = path.resolve(__dirname, '../log.txt')

const write = function (data) {
  if (typeof(data) === 'object') {
    data.JSON.stringify(data)
  }
  // 异步写入数据到文件
  fs.writeFile(file, `${data}\n`, { flag: 'a' }, err => {
    console.log(err)
  })
}

module.exports = write
