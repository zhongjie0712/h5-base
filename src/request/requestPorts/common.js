import http from '../index'

/*
 * 请将公共的请求接口写在此处；
 * 其他功能接口请创建相应的js接口文件，进行分包管理；
 *
 * 接口命名规则：小驼峰  http + 接口类型 +api名
 *
 * |  类 型 |     请求类型    |  api接口名称   |
 * |  http  | get    获取数据 |      api      |
 * |  http  | set    更新数据 |      api      |
 * |  http  | login  登录     |      api      |
 * |  http  | test   测试     |      api      |
 */

// 获取短信验证码
export const httpGetSmsCode = params =>
  http.post({ url: '/businessApi/base/getSmsCode', params, option: { loading: false } })
