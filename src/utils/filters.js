export default {
  /**
   * @description: 手机号脱敏
   * @param {String} phone 13388888888
   * @return {String} 133****8888
   */
  filterEncryPhone: phone => {
    if (phone) {
      phone = phone.toString()
      return phone.slice(0, 3) + '****' + phone.slice(-4)
    }
    return null
  },

  /**
   * @description: 银行卡脱敏
   * @param {String}
   * @return {String}
   */
  filterBankCard: value => {
    if (value) {
      value = value.trim()
      let last = value.substr(value.length - 4)
      let first = value.substr(0, 6)
      return first + '*******' + last
    }
    return value
  },
  /**
   * @description: 身份证号码
   * @param {String}
   * @return {String}
   */
  filterIdNo: value => {
    if (value) {
      value = value.trim()
      let last = value.substr(value.length - 4)
      let first = value.substr(0, 6)
      return first + '*******' + last
    }
    return value
  }
}
