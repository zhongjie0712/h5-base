/*
 * @Author: zhongjie
 * @Date: 2021-08-24 18:19:31
 * @LastEditTime: 2021-09-18 16:19:09
 * @Description: Vue.use 封装
 */

import install from '@/utils/install.js'
const installArr = [install]

import {
  Button,
  Toast,
  Cell,
  Field,
  Form,
  CellGroup,
  Loading,
  Icon,
  Popup,
  Dialog,
  Empty,
  Tab,
  Tabs,
  DatetimePicker,
  Collapse,
  CollapseItem,
  Image as VanImage,
  CountDown,
  List
} from 'vant'
const vantComponentArr = [
  Button,
  Toast,
  Cell,
  Field,
  Form,
  CellGroup,
  Loading,
  Icon,
  Popup,
  Dialog,
  Empty,
  Tab,
  Tabs,
  DatetimePicker,
  Collapse,
  CollapseItem,
  VanImage,
  CountDown,
  List
]

export default [...installArr, ...vantComponentArr]
