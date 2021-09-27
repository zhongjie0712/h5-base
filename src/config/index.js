// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)

module.exports = config

console.log('全局参数配置：', config)
console.log('当前运行环境：', process.env.VUE_APP_ENV)
console.log('当前打包模式：', process.env.NODE_ENV)
