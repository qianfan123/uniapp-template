export default class Response<T> {
  // 响应码
  code: number = 0
  // 结果信息
  msg: string = ''
  // 响应数据
  data: Nullable<T> = null
  // 总数
  total: Nullable<number> = null
  //
  more: Nullable<boolean> = null
  //
  success: Nullable<boolean> = null
  // 提示信息
  fields: any
}
